# Batch analysis and subagent handoffs

Once materials have been obtained and the work is suitable for independent delivery, configured subagents may handle reading, extraction, or review. Delegation supports this search workflow; the lead agent still coordinates content acquisition and browser sessions.

- When `subagent-manager` is available, read its rules and use parameter combinations permitted by the current session. Intentional `all` inheritance omits incompatible model/effort overrides. Provide the goal, necessary materials, Skill/reference paths to read, content to obtain, operational scope, and stop/acceptance criteria. Return specific missing tools instead of calling unattempted routes unavailable.
- For ordinary batch text work, choose native agents appropriate to the task first. AGY/Gemini handles video and related frame analysis; other responsibilities require an explicit user request. It does not automatically share Codex's MCPs, Skills, or credentials. Judge its installation separately from this search Skill's usability.
- Delegate only when useful, not to increase invocation counts. Do not let multiple agents manipulate one browser session at the same time.
- The lead agent checks original text and sources. Model agreement does not replace verification, and an auxiliary agent missing material must not claim to have searched it.
- External CLIs use only authorized free/subscription access, with an explicit working directory and permissions. Do not reuse private sessions across projects or automatically install or log into another agent to fill a gap in the current task.

When `subagent-manager` or AGY is missing, the lead agent or available native agents can handle the work. This Skill's search-tool combination can still run.

## AGY headless entry point

For video/related-frame work, or other Gemini responsibilities explicitly requested by the user, first read the currently available `subagent-manager` video rules. After installation, login, and invocation authorization are in place, check the models and help and explicitly specify the combination. Run in a separate directory. Provide an accessible path to the obtained media, observation goals, required timestamps/literal values, and coverage and uncertainty requirements:

```powershell
agy --help
agy models
agy --model MODEL_ID --effort high --mode plan --sandbox --disable-slash-commands --output-format json -p 'Analyze the specified video and related frames. Return actual coverage, timestamps, literal text/values, observations versus inferences, uncertainties, and gaps. Do not modify files.'
```

Select `MODEL_ID` from models actually available now; it is not a literal model name to execute. Hand off long material through client-supported stdin/stream-json or a previously validated wrapper to avoid Windows command-line length and escaping issues. JSON output is not a full tool audit. `plan`/`sandbox` and a read-only prompt do not by themselves prove write access is disabled. Check the working directory and actual behavior; do not automatically approve out-of-scope operations.

See the current official [AGY headless documentation](https://www.antigravity.google/docs/cli/headless/). Comprehensive copy editing is a separate responsibility and is not automatically delegated by an ordinary material-analysis task.
