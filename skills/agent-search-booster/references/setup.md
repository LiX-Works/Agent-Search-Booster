# Essential setup and connection checks

Read during initial tool preparation or when an agent finds a missing component. Tool download links are in the [catalog](tool-catalog.md). This reference retains MCP snippets and connection conditions affecting invocation rather than rewriting each project's installation tutorial.

## Remote MCP: Codex configuration

Add MCP servers directly in Codex's MCP settings or edit `~/.codex/config.toml`. If a plugin or MCP for the same service already exists, check whether its tools are available before creating another connection. Add the key-free OAuth examples below to your existing configuration:

```toml
[mcp_servers.exa]
url = "https://mcp.exa.ai/mcp?login"
auth = "oauth"

[mcp_servers.tavily]
url = "https://mcp.tavily.com/mcp"
auth = "oauth"

[mcp_servers.context7]
url = "https://mcp.context7.com/mcp/oauth"
auth = "oauth"

[mcp_servers.firecrawl]
url = "https://mcp.firecrawl.dev/v2/mcp-oauth"
auth = "oauth"
```

See the [official Codex MCP guide](https://learn.chatgpt.com/docs/extend/mcp) for configuration locations and supported fields. Authenticate connections that require it using the configured name:

```powershell
codex mcp login exa
codex mcp login tavily
codex mcp login context7
codex mcp login firecrawl
```

Free, plan-included, or other capacity depends on the signed-in account. This reference does not enable metered API usage, purchases, or top-ups; OAuth does not guarantee unlimited capacity. When the official Exa plugin already supplies the needed tools, reuse it without creating a standalone MCP.

Jina MCP is an alternative to Reader's public HTTP entry point. Its configuration structure is below; confirm the selected tool's authentication requirements before enabling it when needed:

```toml
[mcp_servers.jina]
url = "https://mcp.jina.ai/v1"
enabled = false
```

## Local MCP and credentials

The main MCPs in this checklist use remote HTTP. Projects such as Context7 also offer local stdio operation. It is another connection method for the same service, not a requirement to install another copy:

```toml
[mcp_servers.context7_local]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
```

stdio requires a local runtime; HTTP requires a service address. Follow the original project's official API-key, authentication, and version requirements. Do not mistake a remote MCP for a local program.

If a service explicitly requires Bearer credentials, reference an environment variable rather than putting real keys in public snippets:

```toml
[mcp_servers.service_example]
url = "https://MCP_SERVER_URL"
bearer_token_env_var = "SERVICE_TOKEN"
```

This is a configuration-structure example, not new authorization for metered APIs. Credentials stay in the user's environment; the Skill and reports do not save real values.

## Prerequisites affecting invocation

| Component | Necessary setting or check |
|---|---|
| OpenCLI | Command available; Chrome running and Browser Bridge enabled; authorized session for the target site |
| GitHub CLI | `gh` available; tasks requiring authentication use the original client login with task-appropriate permissions |
| Grok Build | `grok` available; signed in through free/subscription access; available models and allowance checked |
| Local document tools | Commands and format dependencies installed; required Docling local models/OCR available |
| FreshRSS | Instance and subscriptions prepared; when using its read API, enable it on the instance and configure user API authentication |
| SearXNG | Instance reachable; JSON output enabled when using the `/search` JSON API |
| Docker | Engine running before using container-deployed services |
| Network proxy | None needed when direct access works; otherwise use your own process/client configuration instead of copying the author's fixed ports |

Preserve existing SearXNG settings and include the required formats in `search.formats`:

```yaml
search:
  formats:
    - html
    - json
```

Use the user's instance URL without assuming a particular local port. See [local services](local-tools.md) for reading FreshRSS and SearXNG instances.

## Connection problems

First distinguish not installed, not loaded, not logged in, and target-content reading failure. Recover only the affected route based on actual errors; do not reconfigure working components. For an OAuth `redirect_uri` mismatch with Context7 or similar services, check current Codex help and service registration requirements, then use the officially supported DCR method:

```powershell
codex mcp login context7 --oauth-client-registration dcr
```

Record a capability as connected only after a real request succeeds. These are configuration templates and prerequisites, not runtime guarantees for a user's account or every site.

## Upstream configuration sources

[Exa MCP](https://exa.ai/docs/get-started/exa-mcp) · [Tavily MCP](https://github.com/tavily-ai/tavily-mcp) · [Context7](https://context7.com/docs/resources/all-clients) · [Firecrawl MCP](https://docs.firecrawl.dev/mcp-server) · [Jina MCP](https://github.com/jina-ai/MCP) · [SearXNG API](https://docs.searxng.org/dev/search_api.html) · [FreshRSS read API](https://github.com/FreshRSS/FreshRSS/blob/edge/docs/en/developers/06_GoogleReader_API.md)
