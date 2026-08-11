"""Catalog schema, filesystem, and Swift source-of-truth consistency tests."""

from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

from jsonschema import Draft202012Validator
from welcome_screens_mcp.catalog import load_catalog, repository_root

FONT_CONSTANT_TO_FILE = {
    "interRegular": "Inter_400Regular.ttf",
    "interMedium": "Inter_500Medium.ttf",
    "interSemiBold": "Inter_600SemiBold.ttf",
    "interBold": "Inter_700Bold.ttf",
    "interExtraBold": "Inter_800ExtraBold.ttf",
    "nunitoRegular": "Nunito_400Regular.ttf",
    "nunitoSemiBold": "Nunito_600SemiBold.ttf",
    "nunitoBold": "Nunito_700Bold.ttf",
    "nunitoExtraBold": "Nunito_800ExtraBold.ttf",
    "nunitoBlack": "Nunito_900Black.ttf",
}


class CatalogConsistencyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.root = repository_root()
        cls.catalog = load_catalog()

    def test_json_schema_accepts_catalog(self) -> None:
        schema = json.loads(
            (self.root / "Catalog/welcome-screens.schema.json").read_text(
                encoding="utf-8"
            )
        )
        data = json.loads(
            (self.root / "Catalog/welcome-screens.json").read_text(encoding="utf-8")
        )
        Draft202012Validator(schema).validate(data)

    def test_catalog_matches_swift_screen_registry_and_durations(self) -> None:
        source = (
            self.root / "WelcomeScreenGallery/Domain/WelcomeScreenID.swift"
        ).read_text(encoding="utf-8")
        cases = re.findall(
            r"^\s*case\s+(\w+)(?:\s*=\s*\"([^\"]+)\")?", source, flags=re.MULTILINE
        )
        swift_case_to_id = {
            case_name: raw_value or case_name for case_name, raw_value in cases
        }
        manifest_ids = {screen.id for screen in self.catalog.screens}
        self.assertEqual(set(swift_case_to_id.values()), manifest_ids)

        duration_entries = re.findall(
            r"case\s+\.(\w+):\s+([0-9_]+|nil)",
            source,
        )
        swift_durations = {
            swift_case_to_id[case_name]: None
            if value == "nil"
            else int(value.replace("_", ""))
            for case_name, value in duration_entries
        }
        manifest_durations = {
            screen.id: screen.duration_milliseconds for screen in self.catalog.screens
        }
        self.assertEqual(swift_durations, manifest_durations)

    def test_catalog_matches_swift_semantic_actions(self) -> None:
        source = (
            self.root / "WelcomeScreenGallery/Domain/WelcomeAction.swift"
        ).read_text(encoding="utf-8")
        swift_actions = set(re.findall(r'=\s*"([a-z0-9-]+\.[a-z0-9-]+)"', source))
        catalog_actions = {
            action.id for screen in self.catalog.screens for action in screen.actions
        }
        self.assertEqual(swift_actions, catalog_actions)
        self.assertEqual(
            len(catalog_actions), self.catalog.project.semantic_action_count
        )

    def test_every_screen_asset_directory_matches_catalog(self) -> None:
        for screen in self.catalog.screens:
            actual = {
                path.relative_to(self.root).as_posix()
                for path in (self.root / f"assets/welcome/{screen.id}").glob("*.png")
            }
            self.assertEqual(actual, set(screen.assets), screen.id)

    def test_font_manifest_matches_each_swift_view(self) -> None:
        for screen in self.catalog.screens:
            source = (self.root / screen.source_path).read_text(encoding="utf-8")
            constants = set(re.findall(r"ReplicaFont\.(\w+)", source)) - {"fixed"}
            expected = {FONT_CONSTANT_TO_FILE[name] for name in constants}
            actual = {Path(path).name for path in screen.font_files}
            self.assertEqual(actual, expected, screen.id)

    def test_all_catalog_paths_are_relative_existing_files(self) -> None:
        paths = {
            self.catalog.project.motion_spec_path,
            self.catalog.project.integration_guide_path,
            self.catalog.project.legal_notice_path,
            self.catalog.project.asset_provenance_path,
            *(item.path for item in self.catalog.shared_files),
            *(screen.source_path for screen in self.catalog.screens),
            *(path for screen in self.catalog.screens for path in screen.assets),
            *(path for screen in self.catalog.screens for path in screen.font_files),
        }
        for relative_path in paths:
            path = Path(relative_path)
            self.assertFalse(path.is_absolute(), relative_path)
            self.assertNotIn("..", path.parts, relative_path)
            self.assertTrue((self.root / path).is_file(), relative_path)


if __name__ == "__main__":
    unittest.main()
