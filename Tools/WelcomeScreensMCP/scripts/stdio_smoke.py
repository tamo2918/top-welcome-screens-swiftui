"""Launch the MCP server as a subprocess and verify its stdio protocol surface."""

from __future__ import annotations

import asyncio
import os
import sys
from pathlib import Path

from mcp import StdioServerParameters
from mcp.client import Client
from mcp.client.stdio import stdio_client


async def smoke_test() -> None:
    root = Path(__file__).resolve().parents[3]
    environment = dict(os.environ)
    environment["WELCOME_SCREENS_REPO_ROOT"] = str(root)
    parameters = StdioServerParameters(
        command=sys.executable,
        args=["-m", "welcome_screens_mcp.server"],
        cwd=root,
        env=environment,
    )
    async with Client(
        stdio_client(parameters),
        raise_exceptions=True,
        read_timeout_seconds=10,
    ) as client:
        tools = await client.list_tools()
        resources = await client.list_resources()
        prompts = await client.list_prompts()
        search = await client.call_tool(
            "welcome_search_screens",
            {"query": "hard-cut", "limit": 10, "offset": 0, "response_format": "json"},
        )
        source = await client.read_resource("welcome://screens/duolingo/source")

        assert client.protocol_version == "2026-07-28"
        assert len(tools.tools) == 4
        assert len(resources.resources) == 5
        assert len(prompts.prompts) == 3
        assert search.structured_content["total"] == 4
        assert "struct DuolingoWelcome: View" in source.contents[0].text

        print(
            "stdio MCP smoke test: OK "
            f"(protocol={client.protocol_version}, tools={len(tools.tools)}, "
            f"resources={len(resources.resources)}, prompts={len(prompts.prompts)})"
        )


if __name__ == "__main__":
    asyncio.run(smoke_test())
