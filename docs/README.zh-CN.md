# agent-search-booster

[English](README.md) | **简体中文**

Agent Search Booster 是一个大幅增强 AI Agent 网络搜索、网页抓取与资料读取能力的 Skill。它把搜索引擎、真实浏览器、平台读取和文档工具整合成一套工作流。你只需说明想找什么、想读什么，Agent 就会选择工具，搜索来源并取得内容。

- **读完整网页，不止摘要。** 从搜索摘要深入到文章正文、论坛原帖、评论和视频字幕；遇到动态加载、验证页面，用真实浏览器读取。
- **远超单一搜索引擎的覆盖。** 结合网页搜索、平台站内搜索、X 讨论、GitHub 和技术文档，找到普通搜索容易遗漏的来源与观点。
- **先选对工具，失败自动换路。** 系统的规则把每项任务交给合适的 MCP、浏览器或 CLI 工具，一条路线失败就切换合适的替代入口。

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/search-booster-overview-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/search-booster-overview.png">
  <img src="assets/search-booster-overview.png" alt="AI Agent 通过搜索、平台读取、网页正文、代码文档及本地文档工具连接不同来源。" width="1600">
</picture>

目前主要面向 Codex。首页提供中英双语，Skill 及调用说明使用英文；Agent 仍按你的语言偏好回复。

## 怎么用

1. 将 `skills/agent-search-booster/` 整个文件夹放入个人 `~/.agents/skills/` 或项目 `.agents/skills/`；已有同名目录先比较个人改动。[官方 Skill 说明](https://learn.chatgpt.com/docs/build-skills)
2. 按下方清单安装或接通需要的工具；MCP 连接代码和必要设置见[配置要点](skills/agent-search-booster/references/setup.md)。可以先让 Agent 检查哪些工具已经可用。
3. 说明目标，直接调用 Skill：

```text
使用 $agent-search-booster，查找 XXX 的实际使用体验。
尽量取得原帖、正文和重要评论，必要时跨平台补充来源，再整理结论。
```

## Agent 如何选择路线

- **找来源**：按问题和尚缺的材料，组合搜索引擎、平台站内搜索、X 和 GitHub。
- **难读的页面**：需要登录、动态加载或出现验证的页面，尽早通过 OpenCLI 转入真实浏览器读取，高校和实验室网站也适用。
- **论文**：文献检索和官方 PDF 下载交给专用 Skill；已有 PDF 的阅读另行处理。
- **缺口**：说明实际取得了什么、还缺什么，并区分没尝试过的路线和真正的读取失败。

## 工具组合对照表

本方案调度的完整工具清单，用来检查哪些已经配齐。已有入口直接复用；Agent 按任务选用，不会每次调用全部工具。

### MCP 与 API

| 工具 | 类型 | 作用 | 备注 |
|---|---|---|---|
| [Exa](https://exa.ai/docs/get-started/exa-mcp) | 远程 MCP / 插件 | 补充搜索来源、语义检索、读取指定网页 | 已有插件或独立 MCP 均可，接一个即可 |
| [Tavily](https://github.com/tavily-ai/tavily-mcp) | 远程 MCP | 网页搜索、时间/域名过滤、正文抽取 | OAuth 或服务凭据 |
| [Firecrawl](https://docs.firecrawl.dev/mcp-server) | 远程 MCP | 网页抓取、解析和结构化抽取 | 有用量限制 |
| [Context7](https://github.com/upstash/context7) | 远程 MCP | 查询软件库和 SDK 文档 | 本方案用 HTTP/OAuth；也可本地运行 |
| [Jina Reader](https://jina.ai/reader) | HTTP 正文服务 | 将网页转换为可读正文 | 补充入口 |
| [Jina MCP](https://github.com/jina-ai/MCP) | 远程 MCP | 通过 MCP 提供 Reader 等工具 | HTTP 正文服务的备选接入 |

### CLI 与浏览器

| 工具 | 类型 | 作用 | 备注 |
|---|---|---|---|
| [OpenCLI](https://github.com/jackwener/OpenCLI) | 本地 CLI | 普通网站与平台的浏览器读取：动态/验证页面、帖子、评论、字幕 | 需要 Chrome、Browser Bridge 和你已登录的会话 |
| [Browser Bridge](https://chromewebstore.google.com/detail/opencli/ildkmabpimmkaediidaifkhjpohdnifk) | Chrome 扩展 | 连接 OpenCLI 与浏览器 | 与 OpenCLI 配套安装 |
| [GitHub CLI](https://cli.github.com/) | 本地 CLI | 读取仓库、代码、Issue、PR 与发布资料 | 命令 `gh` |
| [Grok Build](https://docs.x.ai/build/overview) | CLI / 辅助 Agent | X 原帖、讨论串与补充网页研究 | 命令 `grok`；需登录和账户额度 |
| [Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 本地 CLI / 渠道管理 | 辅助接通和检查各内容渠道 | 补充组件；实际读取由各渠道工具完成 |

### 文档 CLI

| 工具 | 类型 | 作用 | 备注 |
|---|---|---|---|
| [Trafilatura](https://github.com/adbar/trafilatura) | 本地 CLI | 从 HTML 或 URL 提取文章正文 | 适合可直接访问的文章页 |
| [MarkItDown](https://github.com/microsoft/markitdown) | 本地 CLI | Office、CSV、PDF 等转 Markdown | 按格式安装依赖 |
| [Docling](https://github.com/docling-project/docling) | 本地 CLI / 本地模型 | PDF 版面、表格、扫描件与 OCR | 需准备本地模型 |

### 自托管服务

| 工具 | 类型 | 作用 | 备注 |
|---|---|---|---|
| [FreshRSS](https://github.com/FreshRSS/FreshRSS) | 自托管 RSS 服务 | 集中读取已订阅来源的更新 | 如需 API 读取需单独启用 |
| [SearXNG](https://github.com/searxng/searxng) | 自托管搜索服务 | 聚合公开搜索引擎结果 | 常用 Docker 部署；需启用 JSON 输出 |

### 运行与配置

| 工具 | 类型 | 作用 | 备注 |
|---|---|---|---|
| [Chrome](https://www.google.com/chrome/) | 浏览器 | 承载 Browser Bridge 和已有站点登录态 | 使用你自己的浏览器配置 |
| [Node.js](https://nodejs.org/) | CLI 运行环境 | 运行 npm 安装的 OpenCLI 等工具 | 版本按对应工具要求 |
| [Python](https://www.python.org/) | CLI 运行环境 | 运行本地抽取与文档工具 | 建议隔离依赖 |
| [uv](https://docs.astral.sh/uv/) | 环境 / 工具管理 CLI | 隔离安装和运行 Python 工具 | 只负责管理工具 |
| [Docker Desktop](https://docs.docker.com/desktop/) | 容器运行环境 | 运行本地 SearXNG 等容器服务 | Docker Engine 需在运行 |

### 协作工具

| 工具 | 类型 | 作用 | 备注 |
|---|---|---|---|
| [AGY / Gemini](https://www.antigravity.google/docs/cli/overview) | CLI / 辅助 Agent | 视频与相关帧分析 | 按 Subagent-Manager 的专项规则使用 |
| [Subagent-Manager](https://github.com/LiX-Works/Subagent-Manager) | 配套 Skill | 管理子代理模型、交接和 Grok 额度 | 可选；不装也能正常搜索 |

## Agent 调用说明

| 文件 | 提供什么 |
|---|---|
| [Skill 入口](skills/agent-search-booster/SKILL.md) | 任务识别、工具分工、内容获取和交付 |
| [网页与 MCP](skills/agent-search-booster/references/web-tools.md) | 搜索补充、正文读取、Context7 和 GitHub 调用 |
| [平台读取](skills/agent-search-booster/references/platforms.md) | OpenCLI、浏览器桥、帖子、评论与字幕 |
| [Grok](skills/agent-search-booster/references/grok.md) | X 原帖、线程和深入查询 |
| [本地材料与服务](skills/agent-search-booster/references/local-tools.md) | 文档转换、OCR、RSS 与 SearXNG |
| [工具清单](skills/agent-search-booster/references/tool-catalog.md)与[配置要点](skills/agent-search-booster/references/setup.md) | 安装对照、MCP 代码与接通检查 |

工具、服务和账户需要单独准备，并在已授权的额度内使用；Agent 会说明没能取得的部分。采用 [MIT 许可证](LICENSE)。
