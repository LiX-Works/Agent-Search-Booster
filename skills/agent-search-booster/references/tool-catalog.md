# Tool combination and dependency checklist

This catalog is organized by connection type, not invocation priority. Use the corresponding Skill first for specialist tasks. Prioritize OpenCLI and browsers for dynamic/login/verification pages. Route official article PDF acquisition to `download-official-pdfs`; local conversion tools process files already obtained.

Use this checklist to see whether the components integrated by this Skill are ready. Agents check the routes needed for the task. Users may prepare the full set in advance, but individual confirmation of every component is not a prerequisite for starting. The agent owns tool selection. Categories reflect the connection methods used here; projects may offer other modes. Do not install duplicate alternatives, supplements, or collaboration components, or treat a historical connection as proof of current availability.

### Web and MCP

| Tool | Type | Original link | Role | Notes |
|---|---|---|---|---|
| Exa | Remote MCP / plugin | [Project / docs](https://exa.ai/docs/get-started/exa-mcp) | Additional search sources, semantic search, and specific-page reading | Reuse a plugin or standalone MCP; no duplicate connection to the same service is needed |
| Tavily | Remote MCP | [Project / docs](https://github.com/tavily-ai/tavily-mcp) | Web search, time/domain filters, and text extraction | OAuth or service credentials; allowance depends on the account |
| Firecrawl | Remote MCP | [Project / docs](https://docs.firecrawl.dev/mcp-server) | Page scraping, parsing, and structured extraction | Allowance-sensitive; use authorized access |
| Context7 | Remote MCP | [Project / docs](https://github.com/upstash/context7) | Library and SDK documentation | HTTP/OAuth here; local operation is also available |
| Jina Reader | HTTP text service | [Project / docs](https://jina.ai/reader) | Convert accessible pages into readable text | Supplementary route; assess public HTTP and MCP separately |
| Jina MCP | Remote MCP | [Project / docs](https://github.com/jina-ai/MCP) | MCP access to Reader and related tools | Alternative connection; check per-tool authentication; not a historical default dependency |

### Platforms and CLI

| Tool | Type | Original link | Role | Notes |
|---|---|---|---|---|
| OpenCLI | Local CLI | [Project / docs](https://github.com/jackwener/OpenCLI) | Real-browser reading of ordinary sites and platforms; dynamic/login/verification pages, posts, comments, and transcripts | Generic web/browser entry points; requires Chrome, Bridge, and necessary authorized sessions; does not guarantee removal of access restrictions |
| Browser Bridge | Chrome extension | [Project / docs](https://chromewebstore.google.com/detail/opencli/ildkmabpimmkaediidaifkhjpohdnifk) | Connect OpenCLI to the browser | Install and enable it for OpenCLI |
| GitHub CLI | Local CLI | [Project / docs](https://cli.github.com/) | Read repositories, code, Issues, PRs, and release materials | Command: `gh`; authentication scope depends on task and account |
| Grok Build | CLI / auxiliary agent | [Project / docs](https://docs.x.ai/build/overview) | Original X posts, threads, and supplementary web research | Command: `grok`; check login and account allowance |
| Agent-Reach | Local CLI / channel management | [Project / docs](https://github.com/Panniantong/Agent-Reach) | Help connect and check content channels | Supplementary component; actual reading depends on channel tools |

### Local materials and services

| Tool | Type | Original link | Role | Notes |
|---|---|---|---|---|
| Trafilatura | Local CLI | [Project / docs](https://github.com/adbar/trafilatura) | Extract article text from HTML or URLs | For directly accessible article pages |
| MarkItDown | Local CLI | [Project / docs](https://github.com/microsoft/markitdown) | Convert Office, CSV, PDFs, and other files to Markdown | Prepare format dependencies; MCP also exists, but this workflow uses the CLI |
| Docling | Local CLI / local models | [Project / docs](https://github.com/docling-project/docling) | PDF layout, tables, scans, and OCR | Prepare models; check complex content against original pages |
| FreshRSS | Self-hosted RSS service | [Project / docs](https://github.com/FreshRSS/FreshRSS) | Read updates from subscribed sources | Deploy and subscribe first; enable API reading separately |
| SearXNG | Self-hosted search service | [Project / docs](https://github.com/searxng/searxng) | Aggregate public search engines | Often deployed with Docker; enable JSON output |

### Runtime and configuration support

| Tool | Type | Original link | Role | Notes |
|---|---|---|---|---|
| Chrome | Browser | [Project / docs](https://www.google.com/chrome/) | Host Bridge and existing site sessions | Use the browser profile actually authorized by the user |
| Node.js | CLI runtime | [Project / docs](https://nodejs.org/) | Run npm-installed tools such as OpenCLI | Follow each tool's version requirements |
| Python | CLI runtime | [Project / docs](https://www.python.org/) | Run local extraction and document tools | Isolate dependencies to avoid breaking existing projects |
| uv | Environment / tool-management CLI | [Project / docs](https://docs.astral.sh/uv/) | Isolated installation and execution of Python tools | Management tool; does not directly provide search content |
| Docker Desktop | Container runtime | [Project / docs](https://docs.docker.com/desktop/) | Run local services such as SearXNG containers | Docker Engine must be running when containers are used |
| CC Switch | Local configuration manager | [Project / docs](https://github.com/farion1231/cc-switch) | Centralize MCP and other client configuration | Preserve the existing configuration method; not a search service |

### Collaboration

| Tool | Type | Original link | Role | Notes |
|---|---|---|---|---|
| AGY / Gemini | CLI / auxiliary agent | [Project / docs](https://www.antigravity.google/docs/cli/overview) | Video and related frame analysis | Follow `subagent-manager` specialist rules or explicit user requests; ordinary batch text is not a default responsibility |
| subagent-manager | Companion Skill | [Project / docs](https://github.com/LiX-Works/subagent-manager) | Manage subagent models, handoffs, and Grok allowance | Collaboration rules can connect with this workflow without changing the main search entry point |

## Agent checks

- MCP/plugin: Check current discovery for required search/fetch/scrape/query tools. When authorized, make a minimal task-relevant real call. Configuration files and login markers do not replace returned results.
- CLI: Use `Get-Command`/`command -v` and the corresponding `--help` to check the entry point, version, and parameters. If missing, point to the original links rather than reinstalling for the check.
- Browser: Check Bridge and the user's authorized profile, using OpenCLI `doctor` when necessary. Record bridge connectivity, site login, and target-content retrieval separately.
- Local services: Use the user's own instance URL and check reachability and reading interfaces. Do not assume the author's ports, Docker container names, or wrapper commands.
- During initial preparation, report available/missing/login needed/not validated and the capability impact. For ordinary tasks, check only needed routes. Do not ask the user to select tools for every search.
- Complete dependencies can be prepared one by one. Existing routes can still run before the entire set is ready, but do not claim every capability is enabled.

See [essential setup](setup.md) for MCP snippets and runtime connection conditions. Original links were checked against official or original-project materials on 2026-09-30; recheck when upstream sources change.
