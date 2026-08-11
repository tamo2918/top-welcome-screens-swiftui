# Welcome Screens MCP

A local, read-only MCP server that gives coding agents focused access to the native SwiftUI screen catalog, motion contracts, semantic actions, selected source files, assets, fonts, integration plans, and legal constraints.

The server is development tooling only. It is not linked into the iOS target and adds no runtime dependency to `WelcomeScreenGallery`.

## Requirements

- Python 3.10 or newer
- The repository checkout containing `Catalog/welcome-screens.json`
- MCP Python SDK 2.0.0, pinned by this package

## Install

From the repository root:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -e Tools/WelcomeScreensMCP
```

The editable install lets the server locate the repository from its own module path. Setting `WELCOME_SCREENS_REPO_ROOT` explicitly is recommended for MCP hosts that launch subprocesses from another working directory.

## Configure an MCP client

Replace both absolute paths before adding this configuration to an MCP-compatible host:

```json
{
  "mcpServers": {
    "welcome-screens": {
      "command": "/absolute/path/to/top-welcome-screens-swiftui/.venv/bin/python",
      "args": ["-m", "welcome_screens_mcp.server"],
      "env": {
        "WELCOME_SCREENS_REPO_ROOT": "/absolute/path/to/top-welcome-screens-swiftui"
      }
    }
  }
}
```

The server uses `stdio`, writes no protocol-unrelated content to standard output, and needs no network connection or credential.

## Tools

| Tool | Purpose |
| --- | --- |
| `welcome_search_screens` | Search and paginate by ID, name, category, action, or motion effect. |
| `welcome_get_screen_context` | Return one focused topic: overview, motion, actions, assets, source, or all metadata. |
| `welcome_get_integration_plan` | Return the exact source, shared files, assets, fonts, actions, host contract, and legal steps for one screen. |
| `welcome_validate_integration` | Compare a caller-supplied target profile with the selected screen's integration contract. |

Every tool is annotated as read-only, non-destructive, idempotent, and closed-world. `welcome_validate_integration` accepts metadata supplied by the caller; it does not open arbitrary target-project paths.

## Resources

Direct resources:

- `welcome://catalog`
- `welcome://catalog/schema`
- `welcome://integration-guide`
- `welcome://legal-notice`
- `welcome://asset-provenance`

Parameterized resources:

- `welcome://screens/{screen_id}/spec`
- `welcome://screens/{screen_id}/motion`
- `welcome://screens/{screen_id}/actions`
- `welcome://screens/{screen_id}/assets`
- `welcome://screens/{screen_id}/source`

Only paths already listed in the validated catalog can be read. Resource template parameters are exact catalog screen IDs, and path traversal is rejected by both the SDK and the repository resolver.

## Prompts

- `welcome_integrate_screen`: copy one study into an existing SwiftUI app.
- `welcome_audit_motion`: audit exact timings, hard cuts, gates, replay, final state, and Reduce Motion.
- `welcome_create_original_variant`: keep native engineering patterns while replacing third-party identity.

## Example workflows

### Find an authentication study

1. Call `welcome_search_screens` with `query="continue-with-apple"`.
2. Read the selected `welcome://screens/{screen_id}/actions` resource.
3. Call `welcome_get_integration_plan` for that exact ID.

### Integrate SCRL

1. Get the `welcome_integrate_screen` prompt with `screen_id="scrl"`.
2. Read `welcome://screens/scrl/motion` and `welcome://screens/scrl/source`.
3. Copy only the plan's whitelisted files, then run deterministic and animated Simulator QA.

### Audit a target profile

1. Let the coding agent inspect its target app without giving this MCP server filesystem access.
2. Pass the discovered filenames, registered fonts, target version, asset state, and action-routing state to `welcome_validate_integration`.
3. Resolve every blocker and warning before visual QA.

## Validate

Run catalog and in-memory protocol tests:

```bash
.venv/bin/python -m unittest discover \
  -s Tools/WelcomeScreensMCP/tests \
  -v
```

Run a real `stdio` subprocess smoke test:

```bash
.venv/bin/python Tools/WelcomeScreensMCP/scripts/stdio_smoke.py
```

Optionally inspect the server interactively with the official MCP Inspector. This uses an external Node-based developer tool but adds no JavaScript or TypeScript to this repository:

```bash
npx -y @modelcontextprotocol/inspector \
  .venv/bin/python \
  -m welcome_screens_mcp.server
```

The stable, read-only evaluation questions are in `evaluations/welcome-screens.xml`.

## Security and maintenance

- No write or delete tools are exposed.
- No arbitrary path, shell command, URL fetch, authentication token, or external API is accepted.
- The canonical JSON is validated against JSON Schema and Pydantic models.
- Tests compare catalog IDs, durations, actions, fonts, and assets against the current Swift source and repository files.
- Update `Catalog/welcome-screens.json` whenever a screen, action, duration, font, or asset changes.
- MCP protocol 2026-07-28 is served by SDK 2.0.0 while retaining the SDK's legacy-client compatibility.
