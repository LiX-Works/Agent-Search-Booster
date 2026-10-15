# Web, page text, code, and MCP tools

For agents. See [essential setup](setup.md) for connection parameters and the [tool catalog](tool-catalog.md) for the full component list.

## Identify the gap first

- Use an available academic Skill first for discovery/citation checks. Read `download-official-pdfs` before obtaining official article PDFs. Text extraction does not replace its download, source, or file-acceptance workflow. State missing dependencies explicitly.
- Accessible original page with incomplete snippets: use the original page, Exa fetch, or text extraction. Login/verification screens, JavaScript shells, dynamic lists, expansion/pagination: move early to [OpenCLI and browsers](platforms.md), without exhausting all HTTP tools first.
- For 403 responses, distinguish authentication/permission denial from access challenges. Normal browser reading does not guarantee removal of permission restrictions. Handle 429 responses according to rate-limit feedback instead of continuous forced retries.
- An unexposed remote MCP does not mean local CLIs or browsers are unavailable. Check current discovery, PATH, and help for the task. Distinguish unattempted routes, missing dependencies, and actual failures, and whether the obtained material is a snippet, full text, comments, or something else.

## Search and text retrieval

| Entry point | Use | When to continue |
|---|---|---|
| Built-in search | Discover leads using topics, key terms, languages, times, or domains | Add Exa/Tavily when sources are insufficient; read original pages when only snippets are available |
| Exa MCP/plugin | Use search tools from the current schema; fetch tools read specific URLs | Check for excerpts, word limits, and truncation; continue with original pages/text tools when insufficient |
| Tavily MCP | Use search for additional sources and time/domain filters; extract selected URLs | Check currently exposed search/extract tools and use sufficient depth for the task |
| SearXNG | Query the deployed instance's `/search` JSON API | Inspect actual `engine`/`engines`; aggregated results still require original-source reading |
| OpenCLI / browser | Read original pages through platform adapters, generic web read, or browser sessions; handle dynamic/login/verification pages and expansion/pagination | Not limited to platform sites; page obstacles determine priority, and connection success does not prove target-text retrieval |
| Trafilatura | Extract text and necessary metadata from accessible HTML | Suitable for articles; if text requires dynamic loading, switch to a browser or Firecrawl |
| Firecrawl MCP | Start with a single-page scrape; check the extract schema for structured extraction | Do not start a site-wide crawl for one article; check returned dates, missing pages, and truncation |
| Jina Reader | Read accessible URLs through Reader as a supplementary text route | Switch routes after HTTP failure or incomplete content; assess MCP and public HTTP separately |

Continue each search round according to material gaps, rather than mechanically allowing other tools only after built-in search fails. Share sources within the same topic. Distinguish finding from reading through a real search result and a text-reading result. Tool presence or connection success is not task-level validation.

Local HTML extraction example (check local help first):

```powershell
trafilatura -u 'https://example.org/article' --markdown
```

The public Jina Reader URL structure is `https://r.jina.ai/https://example.org/article`. Use it only when reachable through the current connection. A successful public example does not establish key requirements, paid modes, or MCP identity.

## Libraries and Context7

1. Obtain the library name and exact version from the task. Use an existing valid library ID according to the schema; otherwise call `resolve-library-id` first.
2. Then call `query-docs` or its current equivalent for specific APIs, parameters, and version behavior, rather than an empty request to find documentation.
3. Locate returned examples in official documentation/repositories. Do not mix old and latest versions. For code questions, include the code, error, and version in the query context.

## GitHub CLI

Read public repository pages, code, issues, PRs, and Releases as needed for the task. Use authorized `gh` directly when authentication scope, precise pagination, or structured results are needed, while controlling actual request volume.

```powershell
gh repo view OWNER/REPO --json name,description,url,defaultBranchRef
gh issue view 123 --repo OWNER/REPO --comments
gh release view --repo OWNER/REPO
```

Distinguish reading from account writes. Check pagination and invisible content when reading issue/PR comments. Do not treat an unknown repository name found during ordinary search as a confirmed project. For login problems, check the command and authentication state first; do not output tokens or independently change authentication storage.

## Recovery order

- MCP not exposed: Check current discovery or connection state first; local configuration does not prove it loaded in this session. Independent local CLI and browser routes can still be checked.
- 401/403: Distinguish authentication, access scope, and the target site. Handle required login according to existing authorization.
- 429: Distinguish rate limits from allowance limits. Do not automatically switch to metered access or rotate accounts.
- Empty body: Compare the original page with the tool's returned status; check dynamic loading, login screens, and excerpt limits, then select the next retrieval route.
- Network or TLS: Use a narrowly scoped connection check; do not change system proxies or security verification merely to debug.
