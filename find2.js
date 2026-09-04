const fs = require('fs');
const transcript = fs.readFileSync('C:\\Users\\royli\\.gemini\\antigravity\\brain\\6bef2259-fe06-4d1b-8d63-99cd898e51e7\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const lines = transcript.split('\n');

for (let line of lines) {
    if (!line.trim()) continue;
    try {
        const step = JSON.parse(line);
        if (step.type === 'PLANNER_RESPONSE') {
            const toolCalls = step.tool_calls || [];
            for (let tc of toolCalls) {
                if (tc.name === 'write_to_file' && tc.args.TargetFile && tc.args.TargetFile.includes('index.html')) {
                    fs.writeFileSync('original_index.html', tc.args.CodeContent);
                    console.log('Found write_to_file at step', step.step_index);
                    process.exit(0);
                }
            }
        }
    } catch(e) {}
}
console.log('Not found');
