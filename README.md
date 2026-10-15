# agent-search-booster

**English** | [简体中文](README.zh-CN.md)

**A Skill that gives AI agents the power to search across the web, scrape hard-to-reach pages, and read original content—from articles and documentation to posts, comments, and video transcripts.**

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/search-booster-overview-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/search-booster-overview.png">
  <img src="assets/search-booster-overview.png" alt="AI Agent connects through search, platform, web-text, code-documentation, and document tools to representative sources." width="1600">
</picture>

- **Broader search coverage:** reach original posts, discussions, specialist sources, and documentation that ordinary search can miss.
- **More complete content:** continue from links and snippets into page text, comment replies, transcripts, and file content.

The agent checks the routes relevant to the task, uses the tools it needs, and reports what it obtained and what remains missing. You provide the objective; you do not need to choose a tool or remember its commands for every step.

Built for Codex. This README is available in English and Chinese; the Skill and its invocation guides are in English. The agent replies in your preferred language.

## Using it

1. Copy the entire `skills/agent-search-booster/` folder into your personal `~/.agents/skills/` directory or the project's `.agents/skills/` directory. Compare existing customizations before replacing it. See the [official Skill guide](https://learn.chatgpt.com/docs/build-skills).
2. Check the table below for installed, connected, and authenticated tools. Follow the original links for missing components; MCP connection code and essential settings are in [setup notes](skills/agent-search-booster/references/setup.md). You can first ask the agent to check which connections are ready.
3. Invoke the Skill directly. You do not need to choose a tool or remember commands for each task:

```text
Use $agent-search-booster to find real user experiences with XXX.
Read original posts, page text, and important comments where possible.
Add sources from other platforms as useful, then summarize the findings.
```

Once the tools are ready, you provide the objective and scope. The detailed invocation guides are for the agent to read as needed.

## How the agent chooses a route

- **Search and discovery:** combine sources according to the question and the material still needed.
- **Pages and platforms:** consider OpenCLI or browser reading early for interactive, signed-in, dynamically loaded, or verification pages, including ordinary university and laboratory sites. Authorized access and the site's behavior determine what can be read.
- **Specialist tasks:** hand academic discovery and official article PDF downloads to the corresponding installed Skills. Reading or converting a PDF already obtained is a separate step.
- **Retrieval gaps:** distinguish a route not tried, a missing dependency, and an actual reading failure; check the material returned and report its coverage.

## Tool checklist

This is the complete component list integrated by this setup, for checking readiness. Reuse existing connections; notes identify supplemental routes and supporting components. The agent selects tools for each task, rather than calling all of them every time.

### Web and MCP

| Tool | Type | Original link | Purpose | Notes |
|---|---|---|---|---|
| Exa | Remote MCP / plugin | [Project / docs](https://exa.ai/docs/get-started/exa-mcp) | Search across sources; retrieve selected pages | Use the existing plugin or direct MCP connection; no duplicate required |
| Tavily | Remote MCP | [Project / docs](https://github.com/tavily-ai/tavily-mcp) | Web search, filtering, and content extraction | OAuth or service credentials; account limits apply |
| Firecrawl | Remote MCP | [Project / docs](https://docs.firecrawl.dev/mcp-server) | Scrape, parse, and extract web content | Usage-limited; use an authorized connection |
| Context7 | Remote MCP | [Project / docs](https://github.com/upstash/context7) | Retrieve library and SDK documentation | HTTP/OAuth in this setup; local transport is also available |
| Jina Reader | HTTP reader service | [Project / docs](https://jina.ai/reader) | Turn accessible web pages into readable text | Supplemental route; HTTP and MCP are separate connections |
| Jina MCP | Remote MCP | [Project / docs](https://github.com/jina-ai/MCP) | Expose Reader and related tools through MCP | Alternative connection; verify authentication for each tool |

### Platforms and CLIs

| Tool | Type | Original link | Purpose | Notes |
|---|---|---|---|---|
| OpenCLI | Local CLI | [Project / docs](https://github.com/jackwener/OpenCLI) | Browser reading for ordinary sites and platforms; dynamic and verification pages, posts, comments, transcripts | Generic web/browser routes need Chrome, Bridge, and any required authorized session; access is not guaranteed |
| Browser Bridge | Chrome extension | [Project / docs](https://chromewebstore.google.com/detail/opencli/ildkmabpimmkaediidaifkhjpohdnifk) | Connect OpenCLI to the browser | Install and enable alongside OpenCLI |
| GitHub CLI | Local CLI | [Project / docs](https://cli.github.com/) | Read repositories, code, issues, PRs, and releases | Command: gh; authentication scope depends on the task |
| Grok Build | CLI / auxiliary agent | [Project / docs](https://docs.x.ai/build/overview) | Research X posts, threads, and related web sources | Command: grok; sign-in and account allowance required |
| Agent-Reach | Local CLI / channel management | [Project / docs](https://github.com/Panniantong/Agent-Reach) | Manage and check supporting content channels | Supplemental component; underlying tools perform retrieval |

### Local documents and services

| Tool | Type | Original link | Purpose | Notes |
|---|---|---|---|---|
| Trafilatura | Local CLI | [Project / docs](https://github.com/adbar/trafilatura) | Extract article text from HTML or URLs | Best for directly accessible article pages |
| MarkItDown | Local CLI | [Project / docs](https://github.com/microsoft/markitdown) | Convert Office, CSV, PDF, and other files to Markdown | Install format dependencies; this setup uses the CLI |
| Docling | Local CLI / local models | [Project / docs](https://github.com/docling-project/docling) | Read PDF layouts, tables, scans, and OCR | Models must be available; check complex output against originals |
| FreshRSS | Self-hosted RSS service | [Project / docs](https://github.com/FreshRSS/FreshRSS) | Read updates from subscribed sources | Deploy and subscribe first; enable API access if used |
| SearXNG | Self-hosted search service | [Project / docs](https://github.com/searxng/searxng) | Aggregate public search-engine results | Often deployed with Docker; JSON output must be enabled |

### Runtime and configuration support

| Tool | Type | Original link | Purpose | Notes |
|---|---|---|---|---|
| Chrome | Browser | [Project / docs](https://www.google.com/chrome/) | Host Bridge and existing site sessions | Use the user's authorized browser profile |
| Node.js | CLI runtime | [Project / docs](https://nodejs.org/) | Run npm-installed tools such as OpenCLI | Match each tool's runtime requirements |
| Python | CLI runtime | [Project / docs](https://www.python.org/) | Run local extraction and document tools | Isolate dependencies from existing projects |
| uv | Environment / tool management CLI | [Project / docs](https://docs.astral.sh/uv/) | Install and run Python tools in isolated environments | Supports tools; does not itself retrieve content |
| Docker Desktop | Container runtime | [Project / docs](https://docs.docker.com/desktop/) | Run containerized services such as SearXNG | The Docker Engine must be running |
| CC Switch | Local configuration manager | [Project / docs](https://github.com/farion1231/cc-switch) | Manage client configurations, including MCP | An existing configuration method can be retained |

### Optional collaboration

| Tool | Type | Original link | Purpose | Notes |
|---|---|---|---|---|
| AGY / Gemini | CLI / auxiliary agent | [Project / docs](https://www.antigravity.google/docs/cli/overview) | Video and related frame analysis | Follow subagent-manager's specialist rules; other roles require an explicit user request |
| subagent-manager | Companion Skill | [Project / docs](https://github.com/LiX-Works/subagent-manager) | Manage delegated models, handoffs, and Grok usage | Optional coordination rules; search can run independently |

## Agent invocation guides

| File | What it contains |
|---|---|
| [Skill entry](skills/agent-search-booster/SKILL.md) | Task routing, tool roles, retrieval, and delivery |
| [Web and MCP](skills/agent-search-booster/references/web-tools.md) | Search, page reading, Context7, and GitHub |
| [Platform readers](skills/agent-search-booster/references/platforms.md) | OpenCLI, browser connections, posts, comments, and transcripts |
| [Grok](skills/agent-search-booster/references/grok.md) | X posts, threads, and deeper queries |
| [Local documents and services](skills/agent-search-booster/references/local-tools.md) | Document conversion, OCR, RSS, and SearXNG |
| [Tool catalog](skills/agent-search-booster/references/tool-catalog.md) and [setup notes](skills/agent-search-booster/references/setup.md) | Dependency checks, MCP code, and connection checks |

The Skill unifies invocation methods; external programs, services, and accounts must still be available. Access, authentication, and pagination affect what can be retrieved, and the agent reports gaps. Use only authorized free or subscription-included allowances.

Released under the [MIT license](LICENSE). Published versions are listed in [Releases](https://github.com/LiX-Works/agent-search-booster/releases).
