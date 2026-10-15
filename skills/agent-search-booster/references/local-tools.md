# Local text, documents, aggregated search, and RSS

For agents. Identify the input type, then run the corresponding installed tool. Write outputs in the current task directory and preserve originals. Distinguish upstream CLIs from personal wrappers; this repository does not require the author's `docling-local`, `freshrss-local`, or `searxng-local` commands.

## Documents and page text

```powershell
trafilatura -u 'https://example.org/article' --markdown
markitdown 'input.docx' -o 'output.md'
docling --help
docling convert 'input.pdf' --pipeline standard --to md --output 'converted'
```

| Tool | Preferred use | Acceptance checks |
|---|---|---|
| Trafilatura | Text from accessible article HTML | Check title, main paragraphs, and date against the original page |
| MarkItDown | Office, CSV, and ordinary text-PDF conversion | Check for lost text, fields, and tables; do not infer visual structure from Markdown alone |
| Docling | Layout, tables, scans, and OCR | Check complex formulas/tables against original pages; prepare local models in advance and avoid implicit paid/cloud models |

Older Docling versions may use an entry point without `convert`; choose syntax from current help. For local OCR, select currently supported engines and languages. Do not silently enable a cloud API when models/dependencies are missing. Academic PDF acquisition and source requirements remain governed by the dedicated workflow.

## SearXNG

The user enables JSON output on their own instance and provides its URL. Reuse the deployed service instead of creating a container for every question. This example uses a placeholder domain:

```powershell
$searchBase = 'https://SEARXNG_INSTANCE'
$query = [Uri]::EscapeDataString('topic')
Invoke-RestMethod "$searchBase/search?q=$query&format=json"
```

Check actual sources and `engine`/`engines` in `results`; request parameters alone do not prove an engine returned results. Handle zero aggregated results, CAPTCHAs, and rate limits according to actual responses. Continue with Exa/Tavily or other connected routes when useful.

## FreshRSS

The user first deploys the service, creates subscriptions, and prepares an authorized reading entry point. Read subscribed feeds through the browser, instance exports, or API, and follow links back to original articles. Use the instance's actual API enablement and authentication method; do not guess endpoints or extract authentication configuration from its database.

When the Google Reader-compatible API is enabled and the user has supplied and authorized API credentials, follow the [official API documentation](https://github.com/FreshRSS/FreshRSS/blob/edge/docs/en/developers/06_GoogleReader_API.md). This example uses only environment variables supplied in advance by the user and does not print the login response or authentication token:

```powershell
$rssBase = $env:FRESHRSS_BASE_URL.TrimEnd('/')
$rssApi = "$rssBase/api/greader.php"
$loginResult = Invoke-WebRequest -Method Post -Uri "$rssApi/accounts/ClientLogin" -Body @{
    Email = $env:FRESHRSS_USER
    Passwd = $env:FRESHRSS_API_PASSWORD
}
$authLine = ($loginResult.Content -split '\r?\n') | Where-Object { $_.StartsWith('Auth=') } | Select-Object -First 1
if (!$authLine) { throw 'FreshRSS API login did not return an auth token.' }
$rssHeaders = @{ Authorization = "GoogleLogin auth=$($authLine.Substring(5))" }
$subscriptions = Invoke-RestMethod -Uri "$rssApi/reader/api/0/subscription/list?output=json" -Headers $rssHeaders
$articles = Invoke-RestMethod -Uri "$rssApi/reader/api/0/stream/contents/reading-list" -Headers $rssHeaders
$articles.items | Select-Object id,title,published,alternate,summary
```

The API password is configured separately from the web-login password. When credentials are absent or the API is disabled, use authorized browser reading instead of reading the account database yourself. Follow API pagination/continuation and record coverage. When an RSS summary is incomplete, follow `alternate` back to the original article.

RSS tracks updates from subscribed sources; it does not replace web-wide search. Refreshing subscriptions does not mean every article's full text has been read. Deployment, background refresh, and subscription changes are separate operations governed by the current task and authorization. Do not add scheduled tasks by default.

## Missing tools

When commands, models, or instances are missing, read the [tool catalog](tool-catalog.md) and [essential setup](setup.md). Identify whether the missing component is a program, connection, or authentication. Prefer existing services. Do not change system Python, reinstall indefinitely, or interrupt Docker/browser processes used by other tasks.
