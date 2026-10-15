---
name: agent-search-booster
description: Coordinate MCP, OpenCLI/browser, and CLI tools when ordinary search misses sources, pages return only snippets or 403/verification screens, content requires login or dynamic loading, or tasks involve forum posts and comments, video transcripts, X discussions, code documentation, or local materials. Route academic discovery and official article PDF downloads to their dedicated Skills. Use for incomplete web retrieval, interactive pages, platform content, and multi-source search.
---

# Agent Search Booster

The user provides the task; this Skill coordinates search and content retrieval tools. Broaden the sources ordinary search can reach and obtain fuller page text, posts, comments, and documents for analysis. Check the required entry points, connections, and logins for the task. Users may prepare dependencies in advance, but do not require them to confirm every component before starting. Take responsibility for tool selection and execution instead of handing every step back to the user.

Use the user's language for replies and progress updates, and follow the requested language for deliverables. English Skill instructions do not require English conversation.

## Assess the task before choosing tools

Use the following order to identify responsibilities and gaps; do not invoke tools one by one in catalog order. Route specialist tasks to dedicated Skills first. A single research task may combine several routes. Choose the appropriate route from the task even when the user has not named a Skill.

### 1. Identify specialist tasks first

| Task | Read and use first | This Skill's supporting role |
|---|---|---|
| Academic article discovery, DOI/metadata, citation verification | `nature-academic-search` or `paper-lookup` | Add official sites, author information, and community discussions; do not substitute ordinary search for scholarly identity checks |
| Downloading or saving official article PDFs | `download-official-pdfs` | Hand off verified DOIs, official article pages, or citations; the downloader's browser workflow handles publisher access challenges |
| OpenAI models or Codex/ChatGPT features and configuration | The currently available `openai-docs` | Follow that Skill to check local evidence and official sources |

**Obtaining an article PDF and reading a local PDF are separate tasks.** When the user asks to find and download papers, complete discovery, identity checks, and the download handoff within the same task; do not require them to name the downloader or repeat the request. Read the downloader and execute its applicable workflow before assessing the download outcome. A single HTTP 403, empty body, or login page does not prove the paper cannot be downloaded. Inputs may include verified DOIs, titles/citations, official article pages, and the destination directory. Use the downloader's status and final-file acceptance criteria; do not duplicate its scripts or source rules here. A discovery-only request does not authorize expanding into batch downloads.

Distinguish a missing Skill from missing runtime dependencies. If the relevant Skill is absent, state what is missing and which stage it affects, then continue independent work. If the Skill exists but its runtime is missing, read its preparation/recovery instructions, act within current authorization, and recheck, such as the downloader's Runtime/bootstrap workflow. Do not treat a recoverable environment gap as a final failure. Do not silently substitute a generic downloader or another source and present it as an official PDF.

### 2. Move to a real browser early when needed

**OpenCLI / Browser Bridge and the currently available browser are core reading routes, not merely add-ons for social platforms.** When a page is known to require an authenticated session, JavaScript loading, expansion, or pagination, or ordinary reading returns only verification/login screens, an empty shell, or clearly incomplete text, first read [browser and platform reading](references/platforms.md). Use a platform adapter, generic `opencli web read`, or a browser session as appropriate. Generic entry points may also help with university and laboratory sites without dedicated adapters; there is no need to exhaust every HTTP fetch tool first.

This route uses a normal browser and authorized sessions. It does not guarantee resolution of every CAPTCHA or access restriction. Article PDF downloads still use the dedicated downloader above. Handle 429 responses according to actual rate-limit feedback; do not force retries through continuous refreshes or account switching.

### 3. Choose other tools by material and evidence needs

| Need | Main entry points | Read as needed |
|---|---|---|
| Ordinary pages, facts, news, and missing sources | Built-in search, Exa/Tavily, and SearXNG when suitable | [Web and MCP tools](references/web-tools.md) |
| An accessible URL with incomplete snippets or a need for full text | Original page, Exa fetch, Trafilatura; add Firecrawl/Jina when useful | Web and MCP tools; [local materials](references/local-tools.md) |
| Libraries, SDKs, code, and version behavior | Official documentation, Context7, original GitHub repositories / authorized `gh` | Web and MCP tools |
| Platform posts, comments, and video transcripts | OpenCLI adapters or the currently available browser | Browser and platform reading |
| Original X posts, threads, useful timely research, and independent checks | Strongly encourage Grok for deeper research and counterexamples; do not wait for other searches to fail | [Grok routing](references/grok.md) |
| Already obtained PDFs, Office files, scans; subscription updates | MarkItDown, Docling; FreshRSS | Local materials; not a substitute for article downloads |
| Batch reading and independent research subquestions | Delegate only when it helps delivery | [Collaboration](references/collaboration.md) |

Priorities depend on the task. Read the primary material that affects the conclusion first, then add other sources by value. Official sites and papers support facts; forums and X add practical experience, disputes, and leads. Do not substitute one source's role for another. Do not impose fixed source ratios or run every tool for every question. Load only the references for the current route. Read the [tool catalog](references/tool-catalog.md) and [essential setup](references/setup.md) during initial preparation or when a component is missing. Historical snapshots are not proof of current health; browser and CLI availability depends on the user's actual environment.

## Change routes after failure and check actual coverage

- Distinguish an unexposed MCP, missing CLI, disconnected browser, site login requirement, and target-page reading failure. **An unexposed remote MCP does not mean local OpenCLI, `gh`, or browsers are unavailable.** Check current tool discovery and the PATH/help of task-relevant CLIs. Do not perform a full environment audit, reinstall tools, or change global configuration for an ordinary task.
- Before reporting a consequential reading gap as blocked, try the relevant dedicated Skill or an alternative suited to the obstacle. Separate unattempted routes, missing dependencies, and actual invocation failures. Skip low-value pages with an explanation when appropriate. Conclude according to actual permission denial, persistent verification, rate limits, or interrupted login; do not loop through forced retries.
- Use text extraction for incomplete ordinary snippets, a real browser for dynamic/verification pages, and the downloader for official PDFs. Do not repeat identical HTTP requests against the same obstacle or treat an HTTP 200 login page as success.
- For batches or important gaps, keep a short record: `target/URL | route | attempted/not attempted/missing dependency | material obtained and coverage | remaining obstacle`. Distinguish search hits, snippets, full text, comments/transcripts, and verified PDFs. Short answers do not require a complete table.
- Delegation handoffs identify the Skill/reference paths to read, materials to obtain, and stop conditions. Subagents use only capabilities actually available in their session. Return specific missing components instead of describing unattempted routes as unavailable.

## Delivery and operational scope

Answer the user's question with necessary sources and unresolved points. See [operating rules](references/operating-rules.md) for original-source checks, timeliness, and operational boundaries; do not repeat them as a warning checklist in every response. Installation and configuration do not prove successful retrieval. Auxiliary models and agreement among models do not replace sources.

This Skill provides coordinated invocation guidance. MCPs, CLIs, accounts, and browser connections must still be available in the runtime environment. Use the [experience notes](references/experience.md) to record transferable successes, failures, and fallback routes during authorized work. Do not automatically turn one outcome into a permanent rule.
