"""Validated access to the repository-owned welcome-screen catalog."""

from __future__ import annotations

import json
import os
from functools import lru_cache
from pathlib import Path
from typing import Literal, Self

from pydantic import BaseModel, ConfigDict, Field, model_validator


def _to_camel(value: str) -> str:
    first, *rest = value.split("_")
    return first + "".join(part.capitalize() for part in rest)


class CatalogModel(BaseModel):
    """Strict base model for the camel-cased JSON catalog."""

    model_config = ConfigDict(
        alias_generator=_to_camel,
        populate_by_name=True,
        extra="forbid",
    )


class ReferenceCanvasSpec(CatalogModel):
    width: int = Field(gt=0)
    height: int = Field(gt=0)


class ProjectSpec(CatalogModel):
    name: str
    platform: Literal["iOS"]
    ui_framework: Literal["SwiftUI"]
    minimum_deployment_target: str
    reference_canvas: ReferenceCanvasSpec
    screen_count: int = Field(gt=0)
    semantic_action_count: int = Field(gt=0)
    motion_spec_path: str
    integration_guide_path: str
    legal_notice_path: str
    asset_provenance_path: str


class SharedFileSpec(CatalogModel):
    path: str
    role: str
    required_when: Literal["always", "animated", "recommended", "gallery-only"]


class ActionSpec(CatalogModel):
    id: str
    label: str
    available_from_milliseconds: int = Field(ge=0)
    available_until_milliseconds: int | None = Field(default=None, gt=0)

    @model_validator(mode="after")
    def validate_gate(self) -> Self:
        if (
            self.available_until_milliseconds is not None
            and self.available_until_milliseconds <= self.available_from_milliseconds
        ):
            raise ValueError(
                "availableUntilMilliseconds must be after availableFromMilliseconds"
            )
        return self


class MotionEventSpec(CatalogModel):
    start_milliseconds: int = Field(ge=0)
    end_milliseconds: int | None = Field(default=None, gt=0)
    effect: str
    description: str

    @model_validator(mode="after")
    def validate_range(self) -> Self:
        if (
            self.end_milliseconds is not None
            and self.end_milliseconds <= self.start_milliseconds
        ):
            raise ValueError("endMilliseconds must be after startMilliseconds")
        return self


class ScreenSpec(CatalogModel):
    id: str
    display_name: str
    swift_ui_view: str = Field(alias="swiftUIView")
    source_path: str
    categories: list[
        Literal["splash", "loading", "welcome", "onboarding", "authentication"]
    ]
    animated: bool
    duration_milliseconds: int | None = Field(default=None, gt=0)
    assets: list[str]
    font_files: list[str]
    actions: list[ActionSpec]
    motion: list[MotionEventSpec]
    notes: str

    @model_validator(mode="after")
    def validate_motion_contract(self) -> Self:
        if self.animated != (self.duration_milliseconds is not None):
            raise ValueError("animated must match the presence of durationMilliseconds")
        if not self.animated and self.motion:
            raise ValueError("still-only screens cannot declare motion events")
        if self.duration_milliseconds is not None:
            for event in self.motion:
                boundary = event.end_milliseconds or event.start_milliseconds
                if boundary > self.duration_milliseconds:
                    raise ValueError(f"motion event exceeds duration for {self.id}")
            for action in self.actions:
                boundary = (
                    action.available_until_milliseconds
                    or action.available_from_milliseconds
                )
                if boundary > self.duration_milliseconds:
                    raise ValueError(f"action gate exceeds duration for {self.id}")
        return self


class WelcomeCatalog(CatalogModel):
    schema_uri: str = Field(alias="$schema")
    catalog_version: int = Field(gt=0)
    project: ProjectSpec
    shared_files: list[SharedFileSpec]
    screens: list[ScreenSpec]

    @model_validator(mode="after")
    def validate_counts_and_uniqueness(self) -> Self:
        screen_ids = [screen.id for screen in self.screens]
        action_ids = [action.id for screen in self.screens for action in screen.actions]
        if len(screen_ids) != len(set(screen_ids)):
            raise ValueError("screen IDs must be unique")
        if len(action_ids) != len(set(action_ids)):
            raise ValueError("semantic action IDs must be unique")
        if self.project.screen_count != len(screen_ids):
            raise ValueError("project.screenCount does not match screens")
        if self.project.semantic_action_count != len(action_ids):
            raise ValueError("project.semanticActionCount does not match actions")
        return self

    def require_screen(self, screen_id: str) -> ScreenSpec:
        """Return one exact screen or raise an actionable lookup error."""
        for screen in self.screens:
            if screen.id == screen_id:
                return screen
        valid = ", ".join(screen.id for screen in self.screens)
        raise CatalogLookupError(f"Unknown screen ID '{screen_id}'. Valid IDs: {valid}")


class CatalogLookupError(ValueError):
    """Raised when a requested catalog entity does not exist."""


def _looks_like_repository_root(path: Path) -> bool:
    return (
        (path / "Catalog/welcome-screens.json").is_file()
        and (path / "WelcomeScreenGallery.xcodeproj").is_dir()
        and (path / "WelcomeScreenGallery/Features/Screens").is_dir()
    )


@lru_cache(maxsize=1)
def repository_root() -> Path:
    """Resolve and validate the repository root without trusting client input."""
    configured = os.environ.get("WELCOME_SCREENS_REPO_ROOT")
    candidates: list[Path] = []
    if configured:
        candidates.append(Path(configured).expanduser().resolve())
    candidates.extend(Path(__file__).resolve().parents)
    candidates.extend(Path.cwd().resolve().parents)
    candidates.insert(0, Path.cwd().resolve())

    for candidate in candidates:
        if _looks_like_repository_root(candidate):
            return candidate

    raise RuntimeError(
        "Could not locate the Top Welcome Screens repository. Install this package in editable "
        "mode from Tools/WelcomeScreensMCP or set WELCOME_SCREENS_REPO_ROOT to the repository root."
    )


def repository_file(relative_path: str) -> Path:
    """Resolve a catalog-owned path while rejecting traversal outside the repository."""
    root = repository_root()
    candidate = (root / relative_path).resolve()
    try:
        candidate.relative_to(root)
    except ValueError as error:
        raise ValueError(f"Path escapes repository root: {relative_path}") from error
    if not candidate.is_file():
        raise FileNotFoundError(f"Catalog path does not exist: {relative_path}")
    return candidate


def read_repository_text(relative_path: str) -> str:
    """Read one validated UTF-8 text file owned by the catalog."""
    return repository_file(relative_path).read_text(encoding="utf-8")


@lru_cache(maxsize=1)
def load_catalog() -> WelcomeCatalog:
    """Load and validate the canonical catalog once per MCP process."""
    raw = json.loads(read_repository_text("Catalog/welcome-screens.json"))
    catalog = WelcomeCatalog.model_validate(raw)

    owned_paths = {
        catalog.project.motion_spec_path,
        catalog.project.integration_guide_path,
        catalog.project.legal_notice_path,
        catalog.project.asset_provenance_path,
        *(item.path for item in catalog.shared_files),
        *(screen.source_path for screen in catalog.screens),
        *(path for screen in catalog.screens for path in screen.assets),
        *(path for screen in catalog.screens for path in screen.font_files),
    }
    for relative_path in owned_paths:
        repository_file(relative_path)
    return catalog
