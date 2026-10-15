# Grok CLI: X and supplementary research

For agents. Use the installed Grok Build CLI, signed in through authorized free/subscription access, as a research assistant. Strongly encourage invocation when search enhancement helps the task, particularly original X posts, threads, timelines, and multiple viewpoints. Useful web research is also appropriate. Do not treat another model's final summary as a source.

## Invocation

Check current help and model lists first. Choose an actually available model and reasoning tier rather than permanently pinning an old version:

```powershell
grok --help
grok models
grok --model MODEL_ID --reasoning-effort high --prompt-file 'x-task.txt' --permission-mode plan --no-subagents --output-format streaming-json
```

Write a UTF-8 task prompt in a separate task directory. Provide the topic, time range, subjects, questions, and required original posts/replies. Request original links, authors, dates, evidence for claims, and material not obtained. Set the outer timeout according to actual progress; a short queue wait is not a failure.

For X tasks, do not reuse an ordinary web example that permits only `web_search`, as it may yield only WebSearch. Check actual tool events and returned links for original X post/thread content. Tool names, parameters, and availability depend on the current CLI version; an unknown tool name does not prove a restriction took effect.

Example task:

> Find real usage discussions about this product on X from the past week, following original posts, threads, and important replies. Distinguish official announcements, authors' direct tests, and secondhand reports. Look for counterexamples. Preserve original links and dates, and explain what could not be read.

## Results and usage

Codex continues to verify key original posts and facts. Focused follow-up questions on the same topic are allowed; do not repeatedly search the same material to increase invocation counts. The default usage policy gives an advisory reminder when daily consumption exceeds 30% of the full weekly allowance. It does not interrupt work or restrict new assignments. By default, query usage after five substantive research units, combining small operations and follow-ups on the same question. Adapt thresholds and query frequency to your own usage when appropriate.

The interactive Grok terminal's `/usage` reports account weekly usage and reset time; `grok usage SESSION_ID` reports session tokens/cost. Do not confuse either with remaining allowance. Keep account capacity unknown without reliable account data; do not rely on a model's self-report. Use only currently authorized free/plan-included capacity, without switching to metered APIs or automatic recharge.

When `subagent-manager` is also installed, follow its Grok invocation and usage rules. Otherwise, this reference can be used independently; installing another Skill is not required. Permission modes and read-only prompts are not OS-level sandboxes. Do not enable automatic approval or permission bypasses, or delegate search to unbounded subagents.
