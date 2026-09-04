const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Move "TAP TO VIEW CERTIFICATE" into .project-image for certs, and add mixBlendMode
const oldRender = `                  c.innerHTML = \`<div class="project-image" style="background:\${p.grad}; position:relative; overflow:hidden;">
                      \${p.img ? \`<div style="position:absolute;inset:0;background:url(\${p.img}) center/cover no-repeat; filter:blur(40px); opacity:0.25; transform:scale(1.2);"></div>
                                 <img src="\${p.img}" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); max-height:75%; max-width:75%; border-radius:\${p.imgRadius || '24px'}; filter:\${p.imgFilter || 'none'}; box-shadow:0 15px 35px rgba(0,0,0,0.6); image-rendering: high-quality;" />\` : ''}
                  </div>
                      <div class="project-info">
                      <h3>\${p.title}</h3><p>\${p.desc}</p>
                      <div class="project-tech">\${p.tech ? p.tech.map(t=>\`<span>\${t}</span>\`).join('') : ''}</div>
                      \${p.pdf ? \`<div style="font-family:'JetBrains Mono', monospace; font-size:11px; color:rgba(255,255,255,0.5); margin-top:16px; letter-spacing:1px; text-transform:uppercase; display:flex; align-items:center; gap:6px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> TAP TO VIEW CERTIFICATE</div>\` : ''}
                      </div>\`;`;

const newRender = `                  c.innerHTML = \`<div class="project-image" style="background:\${p.grad}; position:relative; overflow:hidden;">
                      \${p.img ? \`<div style="position:absolute;inset:0;background:url(\${p.img}) center/cover no-repeat; filter:blur(40px); opacity:0.25; transform:scale(1.2);"></div>
                                 <img src="\${p.img}" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); max-height:75%; max-width:75%; border-radius:\${p.imgRadius || '24px'}; filter:\${p.imgFilter || 'none'}; mix-blend-mode:\${p.mixBlendMode || 'normal'}; box-shadow:0 15px 35px rgba(0,0,0,0.6); image-rendering: high-quality;" />\` : ''}
                      \${p.pdf ? \`<div style="position:absolute; bottom:12px; left:16px; font-family:'JetBrains Mono', monospace; font-size:10px; color:rgba(255,255,255,0.8); letter-spacing:1px; text-transform:uppercase; display:flex; align-items:center; gap:6px; z-index:10;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> TAP TO VIEW</div>\` : ''}
                  </div>
                      <div class="project-info">
                      <h3>\${p.title}</h3><p>\${p.desc}</p>
                      <div class="project-tech">\${p.tech ? p.tech.map(t=>\`<span>\${t}</span>\`).join('') : ''}</div>
                      </div>\`;`;

if (html.includes(oldRender)) {
    html = html.replace(oldRender, newRender);
} else {
    console.log("Could not find cert render block to replace. Here is what's near there:");
}

// 2. Add mixBlendMode to GT Cert
const oldCert = `grad:'linear-gradient(135deg,#8C4799,#B069BE)',
                tech:['Six Sigma', 'Process Improvement', 'Data Analysis']`;
                
const newCert = `grad:'linear-gradient(135deg,#8C4799,#B069BE)',
                mixBlendMode: 'multiply',
                tech:['Six Sigma', 'Process Improvement', 'Data Analysis']`;

if (html.includes(oldCert)) {
    html = html.replace(oldCert, newCert);
}

fs.writeFileSync('index.html', html);
console.log("Certs inner update applied!");
