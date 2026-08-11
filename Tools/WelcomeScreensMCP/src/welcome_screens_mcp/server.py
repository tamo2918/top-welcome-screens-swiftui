"""Local read-only MCP server for native SwiftUI welcome-screen implementation context."""

from __future__ import annotations

import json
from enum import Enum
from pathlib import Path
from typing import Annotated, Any

from mcp.server import MCPServer
from mcp.server.mcpserver.exceptions import ResourceNotFoundError, ToolError
from mcp.types import Annotations, ToolAnnotations
from pydantic import BaseModel, ConfigDict, Field

from .catalog import (
    CatalogLookupError,
    ScreenSpec,
    load_catalog,
    read_repository_text,
)

SERVER_NAME = "welcome_screens_mcp"
SERVER_VERSION = "1.0.0"
MAX_RENDERED_CHARACTERS = 25_000


class ResponseFormat(str, Enum):
    MARKDOWN = "markdown"
    JSON = "json"


class ContextTopic(str, Enum):
    OVERVIEW = "overview"
    MOTION = "motion"
    ACTIONS = "actions"
    ASSETS = "assets"
    SOURCE = "source"
    ALL = "all"


class ResultModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


class ScreenSummary(ResultModel):
    id: str
    display_name: str
    swift_ui_view: str
    categories: list[str]
    animated: bool
    duration_milliseconds: int | None
    action_count: int
    resource_uri: str


class SearchScreensResult(ResultModel):
    total: int
    count: int
    offset: int
    items: list[ScreenSummary]
    has_more: bool
    next_offset: int | None
    rendered: str


class ScreenContextResult(ResultModel):
    screen_id: str
    topic: str
    resource_uris: list[str]
    data: dict[str, Any]
    rendered: str


class IntegrationPlanResult(ResultModel):
    screen_id: str
    source_file: str
    shared_files: list[str]
    asset_files: list[str]
    font_files: list[str]
    semantic_actions: list[str]
    resource_uris: list[str]
    host_contract: list[str]
    legal_requirements: list[str]
    rendered: str


class TargetProfile(BaseModel):
    """Caller-supplied summary of a target SwiftUI app; no target files are read."""

    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    deployment_target: str = Field(
        description="Target app's minimum iOS version, for example '16.4' or '17.0'.",
        pattern=r"^[0-9]+\.[0-9]+$",
    )
    copied_file_names: list[str] = Field(
        default_factory=list,
        description="Basenames already copied into the target, for example ReferenceCanvas.swift.",
        max_length=100,
    )
    registered_font_file_names: list[str] = Field(
        default_factory=list,
        description="Font filenames already registered by the target, for example Inter_400Regular.ttf.",
        max_length=50,
    )
    assets_copied: bool = Field(
        default=False,
        description="Whether the selected screen asset directory is present.",
    )
    routes_all_actions: bool = Field(
        default=False,
        description="Whether every semantic action is routed by the host app.",
    )
    adds_external_safe_area_padding: bool = Field(
        default=False,
        description="Whether the host wraps the replica in additional safe-area padding.",
    )
    shows_navigation_bar: bool = Field(
        default=False,
        description="Whether a visible navigation bar surrounds the replica.",
    )


class IntegrationValidationResult(ResultModel):
    screen_id: str
    compatible_deployment_target: bool
    missing_source_files: list[str]
    missing_font_files: list[str]
    blockers: list[str]
    warnings: list[str]
    ready: bool
    rendered: str


READ_ONLY_ANNOTATIONS = ToolAnnotations(
    read_only_hint=True,
    destructive_hint=False,
    idempotent_hint=True,
    open_world_hint=False,
)

ASSISTANT_RESOURCE_ANNOTATIONS = Annotations(audience=["assistant"], priority=0.9)

mcp = MCPServer(
    name=SERVER_NAME,
    title="Top Welcome Screens for SwiftUI",
    description="Read-only implementation context for ten native SwiftUI welcome-screen studies.",
    instructions=(
        "Use welcome_search_screens to discover a study, then call welcome_get_screen_context "
        "or welcome_get_integration_plan. Read welcome://screens/{screen_id}/source only for the "
        "selected study. Never reproduce third-party branding in a shipping product; consult the "
        "legal and provenance resources. All exposed tools are local, read-only, and idempotent."
    ),
    version=SERVER_VERSION,
)


def _screen_for_tool(screen_id: str) -> ScreenSpec:
    try:
        return load_catalog().require_screen(screen_id)
    except CatalogLookupError as error:
        raise ToolError(str(error)) from error


def _screen_for_resource(screen_id: str) -> ScreenSpec:
    try:
        return load_catalog().require_screen(screen_id)
    except CatalogLookupError as error:
        raise ResourceNotFoundError(str(error)) from error


def _dump(value: Any) -> Any:
    if isinstance(value, BaseModel):
        return value.model_dump(mode="json", by_alias=True)
    if isinstance(value, list):
        return [_dump(item) for item in value]
    if isinstance(value, dict):
        return {key: _dump(item) for key, item in value.items()}
    return value


def _render_json(value: Any) -> str:
    return json.dumps(_dump(value), indent=2, ensure_ascii=False)


def _bounded(value: str) -> str:
    if len(value) <= MAX_RENDERED_CHARACTERS:
        return value
    return (
        value[:MAX_RENDERED_CHARACTERS]
        + "\n\n[Output truncated. Request a narrower topic or read the linked resource URI.]"
    )


def _summary(screen: ScreenSpec) -> ScreenSummary:
    return ScreenSummary(
        id=screen.id,
        display_name=screen.display_name,
        swift_ui_view=screen.swift_ui_view,
        categories=list(screen.categories),
        animated=screen.animated,
        duration_milliseconds=screen.duration_milliseconds,
        action_count=len(screen.actions),
        resource_uri=f"welcome://screens/{screen.id}/spec",
    )


def _version_tuple(value: str) -> tuple[int, int]:
    major, minor = value.split(".", maxsplit=1)
    return int(major), int(minor)


@mcp.resource(
    "welcome://catalog",
    name="welcome-screen-catalog",
    title="Welcome Screen Catalog",
    description="Canonical machine-readable registry of every SwiftUI study.",
    mime_type="application/json",
    annotations=ASSISTANT_RESOURCE_ANNOTATIONS,
)
def catalog_resource() -> str:
    return read_repository_text("Catalog/welcome-screens.json")


@mcp.resource(
    "welcome://catalog/schema",
    name="welcome-screen-catalog-schema",
    title="Welcome Screen Catalog Schema",
    description="JSON Schema used to validate the canonical catalog.",
    mime_type="application/schema+json",
    annotations=ASSISTANT_RESOURCE_ANNOTATIONS,
)
def catalog_schema_resource() -> str:
    return read_repository_text("Catalog/welcome-screens.schema.json")


@mcp.resource(
    "welcome://integration-guide",
    name="swiftui-integration-guide",
    title="SwiftUI Integration Guide",
    description="File ownership, host contracts, deterministic QA, and the AI-agent integration rules.",
    mime_type="text/markdown",
    annotations=ASSISTANT_RESOURCE_ANNOTATIONS,
)
def integration_guide_resource() -> str:
    return read_repository_text(load_catalog().project.integration_guide_path)


@mcp.resource(
    "welcome://legal-notice",
    name="legal-notice",
    title="Educational Use and Intellectual Property Notice",
    description="Mandatory restrictions for third-party brands and public or commercial use.",
    mime_type="text/markdown",
    annotations=ASSISTANT_RESOURCE_ANNOTATIONS,
)
def legal_notice_resource() -> str:
    return read_repository_text(load_catalog().project.legal_notice_path)


@mcp.resource(
    "welcome://asset-provenance",
    name="asset-provenance",
    title="Asset Provenance",
    description="Auditable origin and usage notes for distributable raster assets.",
    mime_type="text/markdown",
    annotations=ASSISTANT_RESOURCE_ANNOTATIONS,
)
def asset_provenance_resource() -> str:
    return read_repository_text(load_catalog().project.asset_provenance_path)


@mcp.resource(
    "welcome://screens/{screen_id}/spec",
    name="welcome-screen-spec",
    title="Welcome Screen Specification",
    description="Structured metadata for one exact screen ID.",
    mime_type="application/json",
    annotations=ASSISTANT_RESOURCE_ANNOTATIONS,
)
def screen_spec_resource(screen_id: str) -> str:
    return _render_json(_screen_for_resource(screen_id))


@mcp.resource(
    "welcome://screens/{screen_id}/motion",
    name="welcome-screen-motion",
    title="Welcome Screen Motion",
    description="Duration, measured events, interaction gates, and still-only policy for one study.",
    mime_type="application/json",
    annotations=ASSISTANT_RESOURCE_ANNOTATIONS,
)
def screen_motion_resource(screen_id: str) -> str:
    screen = _screen_for_resource(screen_id)
    return _render_json(
        {
            "screenId": screen.id,
            "animated": screen.animated,
            "durationMilliseconds": screen.duration_milliseconds,
            "events": screen.motion,
            "interactionGates": screen.actions,
            "sourceDocument": load_catalog().project.motion_spec_path,
        }
    )


@mcp.resource(
    "welcome://screens/{screen_id}/actions",
    name="welcome-screen-actions",
    title="Welcome Screen Actions",
    description="Typed semantic actions and their interaction availability for one study.",
    mime_type="application/json",
    annotations=ASSISTANT_RESOURCE_ANNOTATIONS,
)
def screen_actions_resource(screen_id: str) -> str:
    screen = _screen_for_resource(screen_id)
    return _render_json({"screenId": screen.id, "actions": screen.actions})


@mcp.resource(
    "welcome://screens/{screen_id}/assets",
    name="welcome-screen-assets",
    title="Welcome Screen Assets and Fonts",
    description="Whitelisted image and font files required by one study.",
    mime_type="application/json",
    annotations=ASSISTANT_RESOURCE_ANNOTATIONS,
)
def screen_assets_resource(screen_id: str) -> str:
    screen = _screen_for_resource(screen_id)
    return _render_json(
        {
            "screenId": screen.id,
            "assets": screen.assets,
            "fontFiles": screen.font_files,
            "provenanceResource": "welcome://asset-provenance",
        }
    )


@mcp.resource(
    "welcome://screens/{screen_id}/source",
    name="welcome-screen-source",
    title="Welcome Screen Swift Source",
    description="The isolated native SwiftUI source file for one selected study.",
    mime_type="text/x-swift",
    annotations=ASSISTANT_RESOURCE_ANNOTATIONS,
)
def screen_source_resource(screen_id: str) -> str:
    return read_repository_text(_screen_for_resource(screen_id).source_path)


@mcp.tool(
    name="welcome_search_screens",
    title="Search Welcome Screens",
    description=(
        "Search and paginate the ten native SwiftUI studies by ID, name, category, action, or motion effect. "
        "This tool reads only the local canonical catalog and never modifies files. max_duration_milliseconds "
        "excludes still-only studies because they have no measured duration."
    ),
    annotations=READ_ONLY_ANNOTATIONS,
    structured_output=True,
)
def welcome_search_screens(
    query: Annotated[
        str | None,
        Field(
            default=None,
            max_length=120,
            description="Optional case-insensitive free-text filter.",
        ),
    ] = None,
    animated: Annotated[
        bool | None,
        Field(
            default=None,
            description="Filter to animated (true) or still-only (false) studies.",
        ),
    ] = None,
    max_duration_milliseconds: Annotated[
        int | None,
        Field(
            default=None,
            gt=0,
            description="Maximum measured motion duration in milliseconds.",
        ),
    ] = None,
    limit: Annotated[
        int, Field(ge=1, le=10, description="Maximum results to return.")
    ] = 10,
    offset: Annotated[
        int, Field(ge=0, description="Number of matching results to skip.")
    ] = 0,
    response_format: Annotated[
        ResponseFormat,
        Field(
            description="Human-readable markdown or machine-readable JSON in the rendered field."
        ),
    ] = ResponseFormat.MARKDOWN,
) -> SearchScreensResult:
    catalog = load_catalog()
    normalized_query = (query or "").casefold().strip()
    matches: list[ScreenSpec] = []
    for screen in catalog.screens:
        if animated is not None and screen.animated is not animated:
            continue
        if max_duration_milliseconds is not None and (
            screen.duration_milliseconds is None
            or screen.duration_milliseconds > max_duration_milliseconds
        ):
            continue
        searchable = " ".join(
            [
                screen.id,
                screen.display_name,
                screen.swift_ui_view,
                *screen.categories,
                *(action.id for action in screen.actions),
                *(event.effect for event in screen.motion),
                screen.notes,
            ]
        ).casefold()
        if normalized_query and normalized_query not in searchable:
            continue
        matches.append(screen)

    page = matches[offset : offset + limit]
    summaries = [_summary(screen) for screen in page]
    has_more = offset + len(page) < len(matches)
    data = {
        "total": len(matches),
        "count": len(page),
        "offset": offset,
        "items": summaries,
        "has_more": has_more,
        "next_offset": offset + len(page) if has_more else None,
    }
    if response_format is ResponseFormat.JSON:
        rendered = _render_json(data)
    else:
        lines = [f"# Welcome screen results ({len(matches)})", ""]
        for item in summaries:
            duration = (
                f"{item.duration_milliseconds} ms"
                if item.duration_milliseconds is not None
                else "still only"
            )
            lines.append(
                f"- **{item.display_name}** (`{item.id}`): {duration}; "
                f"{item.action_count} actions; `{item.resource_uri}`"
            )
        if has_more:
            lines.extend(
                ["", f"More results are available from offset {data['next_offset']}."]
            )
        rendered = "\n".join(lines)
    return SearchScreensResult(**data, rendered=_bounded(rendered))


@mcp.tool(
    name="welcome_get_screen_context",
    title="Get Welcome Screen Context",
    description=(
        "Return focused implementation context for one exact screen ID. Use topic=source only when source code "
        "is required; topic=all returns metadata and resource links without dumping unrelated files."
    ),
    annotations=READ_ONLY_ANNOTATIONS,
    structured_output=True,
)
def welcome_get_screen_context(
    screen_id: Annotated[
        str,
        Field(
            pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$",
            description="Exact catalog screen ID.",
        ),
    ],
    topic: Annotated[
        ContextTopic, Field(description="Context subset to return.")
    ] = ContextTopic.OVERVIEW,
    response_format: Annotated[
        ResponseFormat,
        Field(
            description="Human-readable markdown or machine-readable JSON in the rendered field."
        ),
    ] = ResponseFormat.MARKDOWN,
) -> ScreenContextResult:
    screen = _screen_for_tool(screen_id)
    base_uris = [
        f"welcome://screens/{screen.id}/spec",
        f"welcome://screens/{screen.id}/motion",
        f"welcome://screens/{screen.id}/actions",
        f"welcome://screens/{screen.id}/assets",
        f"welcome://screens/{screen.id}/source",
    ]
    if topic is ContextTopic.OVERVIEW:
        data: dict[str, Any] = _summary(screen).model_dump(mode="json")
    elif topic is ContextTopic.MOTION:
        data = {
            "animated": screen.animated,
            "durationMilliseconds": screen.duration_milliseconds,
            "events": _dump(screen.motion),
            "interactionGates": _dump(screen.actions),
        }
    elif topic is ContextTopic.ACTIONS:
        data = {"actions": _dump(screen.actions)}
    elif topic is ContextTopic.ASSETS:
        data = {"assets": screen.assets, "fontFiles": screen.font_files}
    elif topic is ContextTopic.SOURCE:
        data = {
            "sourcePath": screen.source_path,
            "source": read_repository_text(screen.source_path),
        }
    else:
        data = screen.model_dump(mode="json", by_alias=True)

    if response_format is ResponseFormat.JSON:
        rendered = _render_json(data)
    else:
        lines = [
            f"# {screen.display_name} (`{screen.id}`)",
            "",
            f"Topic: `{topic.value}`",
            "",
        ]
        if topic is ContextTopic.SOURCE:
            lines.extend(
                [
                    f"Source: `{screen.source_path}`",
                    "",
                    "```swift",
                    data["source"],
                    "```",
                ]
            )
        else:
            lines.extend(["```json", _render_json(data), "```"])
        lines.extend(["", "Resources:", *(f"- `{uri}`" for uri in base_uris)])
        rendered = "\n".join(lines)
    return ScreenContextResult(
        screen_id=screen.id,
        topic=topic.value,
        resource_uris=base_uris,
        data=data,
        rendered=_bounded(rendered),
    )


@mcp.tool(
    name="welcome_get_integration_plan",
    title="Build SwiftUI Integration Plan",
    description=(
        "Build the exact read-only copy plan for one screen: isolated Swift source, transitive shared files, "
        "assets, fonts, typed actions, host constraints, legal requirements, and MCP resource links."
    ),
    annotations=READ_ONLY_ANNOTATIONS,
    structured_output=True,
)
def welcome_get_integration_plan(
    screen_id: Annotated[
        str,
        Field(
            pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$",
            description="Exact catalog screen ID.",
        ),
    ],
    include_gallery_files: Annotated[
        bool,
        Field(
            description="Include registry and gallery switch files; normally false for single-screen integration."
        ),
    ] = False,
    response_format: Annotated[
        ResponseFormat,
        Field(
            description="Human-readable markdown or machine-readable JSON in the rendered field."
        ),
    ] = ResponseFormat.MARKDOWN,
) -> IntegrationPlanResult:
    catalog = load_catalog()
    screen = _screen_for_tool(screen_id)
    shared_files = [
        item.path
        for item in catalog.shared_files
        if item.required_when in {"always", "recommended"}
        or (item.required_when == "animated" and screen.animated)
        or (item.required_when == "gallery-only" and include_gallery_files)
    ]
    resource_uris = [
        f"welcome://screens/{screen.id}/spec",
        f"welcome://screens/{screen.id}/motion",
        f"welcome://screens/{screen.id}/source",
        "welcome://integration-guide",
        "welcome://legal-notice",
        "welcome://asset-provenance",
    ]
    host_contract = [
        f"Keep the host deployment target at iOS {catalog.project.minimum_deployment_target} or newer.",
        "Mount the view full-screen without external safe-area padding or a visible navigation bar.",
        "Route every WelcomeAction into host navigation; replica views must not own product routing.",
        "Preserve the 640×1385 ReferenceCanvas geometry and exact measured millisecond boundaries.",
        "Preserve autoplay=false, replayKey, Reduce Motion, and interaction-gating behavior.",
        "Register only the listed font files in UIAppFonts and include the listed asset paths.",
        "Build, run Swift Testing, and verify animated and deterministic final states on an iPhone simulator.",
    ]
    legal_requirements = [
        "Treat the study as an educational technical reference.",
        "Replace every third-party name, logo, mascot, phrase, image, and brand color before public or commercial use.",
        "Review welcome://legal-notice and welcome://asset-provenance before distribution.",
    ]
    data = {
        "screen_id": screen.id,
        "source_file": screen.source_path,
        "shared_files": shared_files,
        "asset_files": screen.assets,
        "font_files": screen.font_files,
        "semantic_actions": [action.id for action in screen.actions],
        "resource_uris": resource_uris,
        "host_contract": host_contract,
        "legal_requirements": legal_requirements,
    }
    if response_format is ResponseFormat.JSON:
        rendered = _render_json(data)
    else:
        lines = [
            f"# Integration plan: {screen.display_name}",
            "",
            f"Source: `{screen.source_path}`",
            "",
            "## Shared Swift files",
            *(f"- `{path}`" for path in shared_files),
            "",
            "## Assets",
            *(f"- `{path}`" for path in screen.assets),
            "",
            "## Fonts",
            *(f"- `{path}`" for path in screen.font_files),
            "",
            "## Semantic actions",
            *(f"- `{action.id}`" for action in screen.actions),
            "",
            "## Host contract",
            *(f"- {item}" for item in host_contract),
            "",
            "## Legal requirements",
            *(f"- {item}" for item in legal_requirements),
        ]
        rendered = "\n".join(lines)
    return IntegrationPlanResult(**data, rendered=_bounded(rendered))


@mcp.tool(
    name="welcome_validate_integration",
    title="Validate a SwiftUI Integration Profile",
    description=(
        "Compare a caller-supplied target-app profile with one screen's integration contract. The tool never "
        "opens the target project and accepts only filenames and booleans supplied by the caller."
    ),
    annotations=READ_ONLY_ANNOTATIONS,
    structured_output=True,
)
def welcome_validate_integration(
    screen_id: Annotated[
        str,
        Field(
            pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$",
            description="Exact catalog screen ID.",
        ),
    ],
    profile: Annotated[
        TargetProfile, Field(description="Read-only summary of the target SwiftUI app.")
    ],
    response_format: Annotated[
        ResponseFormat,
        Field(
            description="Human-readable markdown or machine-readable JSON in the rendered field."
        ),
    ] = ResponseFormat.MARKDOWN,
) -> IntegrationValidationResult:
    catalog = load_catalog()
    screen = _screen_for_tool(screen_id)
    required_shared = [
        Path(item.path).name
        for item in catalog.shared_files
        if item.required_when in {"always", "recommended"}
        or (item.required_when == "animated" and screen.animated)
    ]
    required_sources = [Path(screen.source_path).name, *required_shared]
    copied = set(profile.copied_file_names)
    registered_fonts = set(profile.registered_font_file_names)
    missing_sources = [name for name in required_sources if name not in copied]
    missing_fonts = [
        Path(path).name
        for path in screen.font_files
        if Path(path).name not in registered_fonts
    ]
    compatible_target = _version_tuple(profile.deployment_target) >= _version_tuple(
        catalog.project.minimum_deployment_target
    )
    blockers: list[str] = []
    warnings: list[str] = []
    if not compatible_target:
        blockers.append(
            f"Deployment target {profile.deployment_target} is below the reference target "
            f"{catalog.project.minimum_deployment_target}."
        )
    if missing_sources:
        blockers.append("Required Swift source files are missing.")
    if missing_fonts:
        blockers.append("Required fonts are not registered.")
    if screen.assets and not profile.assets_copied:
        blockers.append("The selected screen assets have not been copied.")
    if not profile.routes_all_actions:
        blockers.append("Not every semantic WelcomeAction is routed by the host app.")
    if profile.adds_external_safe_area_padding:
        warnings.append(
            "Remove external safe-area padding; ReferenceCanvas already owns calibrated placement."
        )
    if profile.shows_navigation_bar:
        warnings.append(
            "Hide the surrounding navigation bar while the replica is visible."
        )
    warnings.extend(
        [
            "Confirm autoplay=false and Reduce Motion render the exact completed state.",
            "Replace third-party branding before public or commercial use.",
        ]
    )
    ready = (
        not blockers
        and not profile.adds_external_safe_area_padding
        and not profile.shows_navigation_bar
    )
    data = {
        "screen_id": screen.id,
        "compatible_deployment_target": compatible_target,
        "missing_source_files": missing_sources,
        "missing_font_files": missing_fonts,
        "blockers": blockers,
        "warnings": warnings,
        "ready": ready,
    }
    if response_format is ResponseFormat.JSON:
        rendered = _render_json(data)
    else:
        lines = [
            f"# Integration validation: {screen.display_name}",
            "",
            f"Ready: **{'yes' if ready else 'no'}**",
            "",
            "## Blockers",
            *(f"- {item}" for item in blockers),
            "",
            "## Warnings",
            *(f"- {item}" for item in warnings),
        ]
        if not blockers:
            lines.insert(lines.index("## Warnings"), "- None")
        rendered = "\n".join(lines)
    return IntegrationValidationResult(**data, rendered=_bounded(rendered))


def _valid_prompt_screen(screen_id: str) -> ScreenSpec | None:
    try:
        return load_catalog().require_screen(screen_id)
    except CatalogLookupError:
        return None


@mcp.prompt(
    name="welcome_integrate_screen",
    title="Integrate a Welcome Screen",
    description="Prepare a coding agent to copy one study into an existing native SwiftUI app.",
)
def welcome_integrate_screen(
    screen_id: str, target_summary: str = "an existing native SwiftUI iOS app"
) -> str:
    screen = _valid_prompt_screen(screen_id)
    if screen is None:
        valid = ", ".join(item.id for item in load_catalog().screens)
        return f"Choose one valid screen ID before integration: {valid}."
    return f"""Integrate only `{screen.id}` (`{screen.swift_ui_view}`) into {target_summary}.

First call `welcome_get_integration_plan` with `screen_id={screen.id}`. Then read:
- `welcome://screens/{screen.id}/spec`
- `welcome://screens/{screen.id}/motion`
- `welcome://screens/{screen.id}/source`
- `welcome://integration-guide`
- `welcome://legal-notice`

Preserve the target app's navigation, lifecycle, signing, and architecture. Copy only transitive Swift files,
selected assets, and required fonts. Keep the 640×1385 reference geometry, exact motion boundaries, hard cuts,
interaction gates, replay, autoplay=false, and Reduce Motion. Route every semantic action through the host.
Build and test on an iPhone simulator, then summarize every changed file. Replace third-party branding before release."""


@mcp.prompt(
    name="welcome_audit_motion",
    title="Audit Welcome Screen Motion",
    description="Prepare a coding agent to compare a SwiftUI study against its measured timeline contract.",
)
def welcome_audit_motion(screen_id: str) -> str:
    screen = _valid_prompt_screen(screen_id)
    if screen is None:
        valid = ", ".join(item.id for item in load_catalog().screens)
        return f"Choose one valid screen ID before auditing motion: {valid}."
    if not screen.animated:
        return (
            f"Audit `{screen.id}` as a still-only study. Confirm that no unsupported entrance animation was added, "
            f"using `welcome://screens/{screen.id}/spec` and `welcome://screens/{screen.id}/source`."
        )
    return f"""Audit `{screen.id}` for pixel and motion fidelity.

Read `welcome://screens/{screen.id}/motion`, `welcome://screens/{screen.id}/source`, and
`welcome://integration-guide`. Verify every millisecond boundary, easing function, hard cut, interaction gate,
final state, replay, and Reduce Motion behavior. Capture start, intermediate, and final states on an iPhone
simulator. Report deviations with exact source locations; do not replace calibrated motion with generic effects."""


@mcp.prompt(
    name="welcome_create_original_variant",
    title="Create an Original Branded Variant",
    description="Prepare a coding agent to retain technical behavior while replacing third-party identity.",
)
def welcome_create_original_variant(screen_id: str, original_brand_name: str) -> str:
    screen = _valid_prompt_screen(screen_id)
    if screen is None:
        valid = ", ".join(item.id for item in load_catalog().screens)
        return f"Choose one valid screen ID before creating a variant: {valid}."
    return f"""Use `{screen.id}` only as a technical reference for an original `{original_brand_name}` welcome flow.

Read `welcome://screens/{screen.id}/spec`, `welcome://screens/{screen.id}/motion`,
`welcome://legal-notice`, and `welcome://asset-provenance`. Replace every third-party name, logo, mascot,
phrase, image, statistic, brand color, typography choice, and recognizable trade dress. Create a meaningfully
different composition and motion language while retaining useful native SwiftUI engineering patterns such as
deterministic timelines, Reduce Motion, accessibility, typed actions, and host-injected navigation."""


def main() -> None:
    """Start the repository-local server over stdio."""
    load_catalog()
    mcp.run()


if __name__ == "__main__":
    main()
