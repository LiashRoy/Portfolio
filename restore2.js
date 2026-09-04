const fs = require('fs');
const transcript = fs.readFileSync('C:\\Users\\royli\\.gemini\\antigravity\\brain\\6bef2259-fe06-4d1b-8d63-99cd898e51e7\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const lines = transcript.split('\n');
let content = '';
const targetFile = 'C:\\Users\\royli\\.gemini\\antigravity\\scratch\\portfolio-link-page\\index.html';
let stepIndex = 0;

for (let line of lines) {
    if (!line.trim()) continue;
    try {
        const step = JSON.parse(line);
        stepIndex = step.step_index;
        // Stop before the first tool call of THIS specific session
        // Let's stop around step 1823 (which was my run_command check css)
        // Actually, the catastrophic replace was step 1891+ maybe?
        // Let's just stop at step 1650 (end of previous session)!
        if (stepIndex > 1650) break;

        if (step.type === 'PLANNER_RESPONSE') {
            const toolCalls = step.tool_calls || [];
            for (let tc of toolCalls) {
                if (tc.name === 'write_to_file' && tc.args.TargetFile === targetFile) {
                    content = tc.args.CodeContent;
                } else if (tc.name === 'replace_file_content' && tc.args.TargetFile === targetFile) {
                    const args = tc.args;
                    const fileLines = content.split('\n');
                    const start = args.StartLine - 1;
                    const end = args.EndLine;
                    const newLines = args.ReplacementContent.split('\n');
                    
                    const before = fileLines.slice(0, start);
                    const after = fileLines.slice(end);
                    content = before.concat(newLines, after).join('\n');
                }
            }
        }
    } catch(e) {}
}

fs.writeFileSync('index.html', content);
console.log('Restored to index.html at step ' + stepIndex);
