# agent-search-booster

**English** | [简体中文](README.zh-CN.md)

Agent Search Booster is a Skill that gives AI agents the power to search across the web, scrape hard-to-reach pages, and read original content. It brings search engines, real browsers, platform readers, and document tools into one workflow. You describe what you need; the agent chooses the tools and retrieves the material.

- **Full pages, not snippets.** Go beyond search snippets to articles, forum posts, comments, and video transcripts, and handle dynamic and verification pages with a real browser.
- **Search far beyond a single engine.** Combine web search, platform search, X discussions, GitHub, and technical documentation to uncover sources and perspectives ordinary search can miss.
- **Right tool first, fallback when it fails.** Systematic rules send each task to the right MCP, browser, or CLI tool, and switch to a suitable alternative when one route fails.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/search-booster-overview-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/search-booster-overview.png">
  <img src="assets/search-booster-overview.png" alt="AI Agent connects through search, platform, web-text, code-documentation, and document tools to representative sources." width="1600">
</picture>

Built mainly for Codex. This README is available in English and Chinese; the Skill and its invocation guides are in English. The agent replies in your preferred language.

## Using it

1. Copy the entire `skills/agent-search-booster/` folder into `~/.agents/skills/` or your project's `.agents/skills/`, comparing any customized rules before replacing it. See the [official Skill guide](https://learn.chatgpt.com/docs/build-skills).
2. Install or connect the tools you need from the checklist below; MCP connection code and key settings are in the [setup notes](skills/agent-search-booster/references/setup.md). You can ask the agent to check which tools are ready.
3. Invoke the Skill with your goal:

```text
Use $agent-search-booster to find real user experiences with XXX.
Read original posts, page text, and important comments where possible.
Add sources from other platforms as useful, then summarize the findings.
```

## How the agent chooses a route

- **Finding sources:** combines search engines, platform search, X, and GitHub according to the question and what is still missing.
- **Hard-to-read pages:** switches early to a real browser through OpenCLI for pages that need sign-in, load dynamically, or show verification, including university and lab sites.
- **Papers:** hands literature search and official PDF downloads to dedicated Skills; reading a PDF you already have is a separate step.
- **Gaps:** reports what it actually retrieved and what is still missing, and tells an untried route apart from a real failure.

## Tool checklist

The complete set of tools this Skill coordinates, for checking what is ready. Reuse connections you already have; the agent picks tools for each task rather than calling them all.

### MCP & APIs

| Tool | Type | Purpose | Notes |
|---|---|---|---|
| [Exa](https://exa.ai/docs/get-started/exa-mcp) | Remote MCP / plugin | Search across sources; retrieve selected pages | Existing plugin or direct MCP; one is enough |
| [Tavily](https://github.com/tavily-ai/tavily-mcp) | Remote MCP | Web search, filtering, and content extraction | OAuth or service credentials |
| [Firecrawl](https://docs.firecrawl.dev/mcp-server) | Remote MCP | Scrape, parse, and extract web content | Usage-limited |
| [Context7](https://github.com/upstash/context7) | Remote MCP | Library and SDK documentation | HTTP/OAuth here; local transport also available |
| [Jina Reader](https://jina.ai/reader) | HTTP reader service | Turn web pages into readable text | Supplemental route |
| [Jina MCP](https://github.com/jina-ai/MCP) | Remote MCP | Reader and related tools through MCP | Alternative to the HTTP reader |

### CLI & Browser

| Tool | Type | Purpose | Notes |
|---|---|---|---|
| [OpenCLI](https://github.com/jackwener/OpenCLI) | Local CLI | Browser reading for sites and platforms: dynamic and verification pages, posts, comments, transcripts | Needs Chrome, Browser Bridge, and your signed-in sessions |
| [Browser Bridge](https://chromewebstore.google.com/detail/opencli/ildkmabpimmkaediidaifkhjpohdnifk) | Chrome extension | Connect OpenCLI to the browser | Install alongside OpenCLI |
| [GitHub CLI](https://cli.github.com/) | Local CLI | Repositories, code, issues, PRs, and releases | Command: `gh` |
| [Grok Build](https://docs.x.ai/build/overview) | CLI / auxiliary agent | X posts, threads, and related web sources | Command: `grok`; sign-in and allowance required |
| [Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Local CLI / channel management | Manage and check supporting content channels | Supplemental; underlying tools do the retrieval |

### Document CLIs

| Tool | Type | Purpose | Notes |
|---|---|---|---|
| [Trafilatura](https://github.com/adbar/trafilatura) | Local CLI | Extract article text from HTML or URLs | Best for directly accessible articles |
| [MarkItDown](https://github.com/microsoft/markitdown) | Local CLI | Convert Office, CSV, PDF, and other files to Markdown | Install format extras as needed |
| [Docling](https://github.com/docling-project/docling) | Local CLI / local models | PDF layouts, tables, scans, and OCR | Needs its local models |

### Self-hosted Services

| Tool | Type | Purpose | Notes |
|---|---|---|---|
| [FreshRSS](https://github.com/FreshRSS/FreshRSS) | Self-hosted RSS service | Updates from subscribed sources | Enable API access if used |
| [SearXNG](https://github.com/searxng/searxng) | Self-hosted search service | Aggregated public search-engine results | Usually Docker; enable JSON output |

### Runtime & Setup

| Tool | Type | Purpose | Notes |
|---|---|---|---|
| [Chrome](https://www.google.com/chrome/) | Browser | Host Browser Bridge and your site sessions | Your own browser profile |
| [Node.js](https://nodejs.org/) | CLI runtime | Run npm-installed tools such as OpenCLI | Match each tool's version requirements |
| [Python](https://www.python.org/) | CLI runtime | Run extraction and document tools | Keep dependencies isolated |
| [uv](https://docs.astral.sh/uv/) | Environment / tool management CLI | Install and run Python tools in isolated environments | Supporting tool only |
| [Docker Desktop](https://docs.docker.com/desktop/) | Container runtime | Run containerized services such as SearXNG | Docker Engine must be running |

### Collaboration

| Tool | Type | Purpose | Notes |
|---|---|---|---|
| [AGY / Gemini](https://www.antigravity.google/docs/cli/overview) | CLI / auxiliary agent | Video and related frame analysis | Used under Subagent-Manager's specialist rules |
| [Subagent-Manager](https://github.com/LiX-Works/Subagent-Manager) | Companion Skill | Delegated models, handoffs, and Grok usage | Optional; search works without it |

## Agent invocation guides

| File | What it contains |
|---|---|
| [Skill entry](skills/agent-search-booster/SKILL.md) | Task routing, tool roles, retrieval, and delivery |
| [Web and MCP](skills/agent-search-booster/references/web-tools.md) | Search, page reading, Context7, and GitHub |
| [Platform readers](skills/agent-search-booster/references/platforms.md) | OpenCLI, browser connections, posts, comments, and transcripts |
| [Grok](skills/agent-search-booster/references/grok.md) | X posts, threads, and deeper queries |
| [Local documents and services](skills/agent-search-booster/references/local-tools.md) | Document conversion, OCR, RSS, and SearXNG |
| [Tool catalog](skills/agent-search-booster/references/tool-catalog.md) and [setup notes](skills/agent-search-booster/references/setup.md) | Dependency checks, MCP code, and connection checks |

Tools, services, and accounts are set up separately and used within your authorized allowances; the agent reports anything it could not reach. Released under the [MIT license](LICENSE).
