"""In-memory MCP protocol tests using the official Python SDK client."""

from __future__ import annotations

import unittest

from mcp.client import Client
from welcome_screens_mcp.catalog import load_catalog
from welcome_screens_mcp.server import mcp


class MCPServerProtocolTests(unittest.IsolatedAsyncioTestCase):
    async def test_capability_discovery_is_complete_and_read_only(self) -> None:
        async with Client(mcp, raise_exceptions=True) as client:
            tools = await client.list_tools()
            self.assertEqual(
                {tool.name for tool in tools.tools},
                {
                    "welcome_search_screens",
                    "welcome_get_screen_context",
                    "welcome_get_integration_plan",
                    "welcome_validate_integration",
                },
            )
            for tool in tools.tools:
                self.assertTrue(tool.annotations.read_only_hint)
                self.assertFalse(tool.annotations.destructive_hint)
                self.assertTrue(tool.annotations.idempotent_hint)
                self.assertFalse(tool.annotations.open_world_hint)

            resources = await client.list_resources()
            self.assertEqual(
                {str(resource.uri) for resource in resources.resources},
                {
                    "welcome://catalog",
                    "welcome://catalog/schema",
                    "welcome://integration-guide",
                    "welcome://legal-notice",
                    "welcome://asset-provenance",
                },
            )
            templates = await client.list_resource_templates()
            self.assertEqual(len(templates.resource_templates), 5)
            prompts = await client.list_prompts()
            self.assertEqual(
                {prompt.name for prompt in prompts.prompts},
                {
                    "welcome_integrate_screen",
                    "welcome_audit_motion",
                    "welcome_create_original_variant",
                },
            )

    async def test_search_returns_structured_paginated_results(self) -> None:
        async with Client(mcp, raise_exceptions=True) as client:
            result = await client.call_tool(
                "welcome_search_screens",
                {
                    "query": "continue-with-apple",
                    "limit": 2,
                    "offset": 0,
                    "response_format": "json",
                },
            )
            self.assertFalse(result.is_error)
            self.assertIsNotNone(result.structured_content)
            self.assertEqual(result.structured_content["total"], 3)
            self.assertEqual(result.structured_content["count"], 2)
            self.assertTrue(result.structured_content["has_more"])
            self.assertEqual(result.structured_content["next_offset"], 2)

    async def test_source_resource_is_scoped_to_selected_screen(self) -> None:
        async with Client(mcp, raise_exceptions=True) as client:
            result = await client.read_resource("welcome://screens/scrl/source")
            self.assertEqual(len(result.contents), 1)
            self.assertIn("struct ScrlWelcome: View", result.contents[0].text)
            self.assertNotIn("struct HallowWelcome: View", result.contents[0].text)

    async def test_integration_plan_contains_only_transitive_files_by_default(
        self,
    ) -> None:
        async with Client(mcp, raise_exceptions=True) as client:
            result = await client.call_tool(
                "welcome_get_integration_plan",
                {"screen_id": "perplexity", "response_format": "json"},
            )
            content = result.structured_content
            self.assertFalse(result.is_error)
            self.assertNotIn(
                "WelcomeScreenGallery/Shared/MotionTimeline.swift",
                content["shared_files"],
            )
            self.assertNotIn(
                "WelcomeScreenGallery/Features/WelcomeScreen.swift",
                content["shared_files"],
            )
            self.assertEqual(len(content["semantic_actions"]), 7)

    async def test_complete_target_profile_validates_as_ready(self) -> None:
        catalog = load_catalog()
        screen = catalog.require_screen("duolingo")
        shared = [
            item.path.rsplit("/", maxsplit=1)[-1]
            for item in catalog.shared_files
            if item.required_when in {"always", "recommended", "animated"}
        ]
        async with Client(mcp, raise_exceptions=True) as client:
            result = await client.call_tool(
                "welcome_validate_integration",
                {
                    "screen_id": "duolingo",
                    "profile": {
                        "deployment_target": "17.0",
                        "copied_file_names": [
                            screen.source_path.rsplit("/", maxsplit=1)[-1],
                            *shared,
                        ],
                        "registered_font_file_names": [
                            path.rsplit("/", maxsplit=1)[-1]
                            for path in screen.font_files
                        ],
                        "assets_copied": True,
                        "routes_all_actions": True,
                        "adds_external_safe_area_padding": False,
                        "shows_navigation_bar": False,
                    },
                    "response_format": "json",
                },
            )
            self.assertFalse(result.is_error)
            self.assertTrue(result.structured_content["ready"])
            self.assertEqual(result.structured_content["blockers"], [])

    async def test_prompt_contains_selected_resource_uris(self) -> None:
        async with Client(mcp, raise_exceptions=True) as client:
            result = await client.get_prompt(
                "welcome_integrate_screen",
                {"screen_id": "yazio", "target_summary": "a production SwiftUI app"},
            )
            self.assertEqual(len(result.messages), 1)
            self.assertIn(
                "welcome://screens/yazio/source", result.messages[0].content.text
            )
            self.assertIn("production SwiftUI app", result.messages[0].content.text)


if __name__ == "__main__":
    unittest.main()
