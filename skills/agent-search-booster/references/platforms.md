# Browser reading, platform text, and comments

For agents. OpenCLI turns site operations into CLI calls; Browser Bridge connects the browser and existing platform sessions. Direct browser use can cover page content unavailable through adapters. Platform-adapter coverage changes with versions, so check the relevant help first.

## Core reading route

Consider a real browser early for dynamic loading, authorized login sessions, verification screens, expansion, or pagination. There is no need to exhaust every ordinary scraper first. OpenCLI also provides generic web entry points for sites such as universities and laboratories without platform adapters. Ordinary web/text tools suffice when a public static page has already been read completely. Remote MCP exposure does not determine local OpenCLI availability.

Check the corresponding local help first. Use these commands when supported by the current version:

```powershell
opencli web read --help
opencli web read --url 'https://example.org/page' --stdout true --download-images false --window background
opencli browser faculty-research open 'https://example.org/page' --window background
opencli browser faculty-research state
opencli browser faculty-research extract --chunk-size 12000
```

Reuse the same named session across multiple steps and coordinate ownership. Continue chunked extraction using the returned `next_start_char` with `extract --start ...` until it is `null`; this does not prove that page pagination or collapsed content has been fully read. Use action identifiers returned by the actual page instead of guessing buttons.

OpenCLI uses normal Chrome and existing sessions. **It does not guarantee resolution of every CAPTCHA, login, or permission restriction.** Wait for normal verification or have the user complete required actions when necessary. Do not extract cookies as a supposed recovery method. After navigation, login, or extraction succeeds, still verify target text, entries, pagination, and truncation. Official article PDFs remain the responsibility of `download-official-pdfs`; page Markdown or a screenshot is not a valid PDF download.

References: [upstream README](https://github.com/jackwener/OpenCLI), [browser invocation guide](https://github.com/jackwener/OpenCLI/blob/main/skills/opencli-browser/SKILL.md). If the local generic entry point is absent, use the currently available browser and state the missing component; do not claim all browser routes have failed.

## Discovery and connection

```powershell
opencli list
opencli doctor
opencli xiaohongshu --help -f yaml
opencli reddit read --help
opencli youtube transcript --help
```

`doctor` checks bridge connectivity only; it does not prove platform login or full-text retrieval. Use the extension and browser profile actually installed by the user, without assuming the author's Chrome profile name, installation path, or account. When browser launch is needed, reuse the user's authorized profile and avoid disrupting existing windows or other agents' tasks.

## Obtain material by scenario

| Scenario | Method | Continue reading |
|---|---|---|
| Xiaohongshu notes | Use the page link returned by `search`, then read text with `note` | `comments` and relevant child replies; interpret image/video content separately as needed |
| Reddit | Select a post with `search`, then `read` | Adjust `limit`/`depth`/`replies`/`max-length` and `more` expansion; check truncation |
| YouTube | Find the target with `search`, then `transcript` | Language tracks and time ranges; use the corresponding `comments` subcommand for comments |
| Zhihu, WeChat Official Accounts, V2EX, and similar sites | Use available site-search/detail commands or an authorized browser | Text, pagination, and relevant replies; title lists do not replace content |
| X | Follow original posts/threads with Grok CLI; supplement checks in the browser | Authors, dates, context, important replies, and quotes; see [Grok](grok.md) |

Invocation examples (parameters follow current help; these are not fixed result counts):

```powershell
opencli xiaohongshu search 'topic' --limit 5 --window background -f json
opencli reddit search 'topic' --limit 5 --window background -f json
opencli reddit read 'POST_ID_OR_URL' --limit 50 --depth 3 --replies 10 --max-length 5000 --expand-more true --window background -f json
opencli youtube transcript 'VIDEO_URL' --lang en --mode raw --window background -f json
```

Xiaohongshu `note`/`comments` may require the original link with its page signature. Invoke only with authorized links supplied by existing tools/browser sessions. Do not save signatures, tokens, or account details in public reports; output normalized source links. If authorization for necessary credential access is missing, explain the scope and ask first.

## Full content and coverage

For "all comments," check root comments, child replies, pagination endpoints, and returned truncation. Platform totals may include deleted, collapsed, or invisible items. A large `limit` alone does not justify claiming complete coverage. Report what was actually read and why material is missing.

When an existing transcript is empty, first check tracks, languages, and adapter errors; confirm through another normal entry point when needed. Decide on additional transcription/ASR according to the specific task's value and authorization. Do not apply one video project's rules to every platform.

## Connection errors

- `Extension not connected`: Check extension enablement, the target browser profile, and the bridge. Repeating website login is not the only recovery method.
- `Navigation rejected`: Check page and bridge state, retry within bounds, or use another browser. Do not copy the author's old-version patches as universal fixes.
- HTML instead of structured results, or a login page: Confirm the target material has not yet been obtained, restore the authorized session, or choose a normally accessible route.
- Do not let multiple agents manipulate one browser session without coordination; do not close unrelated user tabs.

Agent-Reach supports and manages connected channels; it is not an alias for OpenCLI. Read the relevant help before use. A full `doctor`/`setup` may inspect authentication or install additional programs, so check behavior and current authorization first. This reference does not make credential extraction, ASR, or new paid APIs the default behavior of Agent-Reach.
