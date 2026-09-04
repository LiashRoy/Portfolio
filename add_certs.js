const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// Replace the faulty exit animation with the correct slide-left + fade
const oldExit = `} else if (s > PHASES.FADE_Q_OUT.start) {
                    const fo = f_out(s, PHASES.FADE_Q_OUT);
                    qo=1-fo; qt=\`scale(\${1-fo*.03})\`;
                  }
                show(sections.quote, qo, qt);`;

const newExit = `} else if (s > PHASES.FADE_Q_OUT.start) {
                    // Keep section fully visible; slide the TEXT BLOCK left and fade it
                    const fo = f_out(s, PHASES.FADE_Q_OUT);
                    const qb = document.getElementById('quote-block');
                    if (qb) {
                        qb.style.transform = \`translateX(\${-fo * 160}px)\`;
                        qb.style.opacity = String(1 - fo);
                    }
                  }
                show(sections.quote, qo, qt);`;

if (html.includes(oldExit)) {
    html = html.replace(oldExit, newExit);
    fs.writeFileSync('index.html', html);
    console.log('Done - slide-left exit applied');
} else {
    console.log('Pattern not found - dumping context:');
    const idx = html.indexOf('FADE_Q_OUT.start');
    console.log(html.substring(idx - 100, idx + 300));
}
