
    (() => {
        'use strict';

        // =============== NEON CANVAS BACKGROUND ===============
        const canvas = document.getElementById('wave-canvas');
        const ctx = canvas.getContext('2d');
        let width, height, time = 0;
        
        function resizeCanvas() { 
            width = canvas.width = window.innerWidth; 
            height = canvas.height = window.innerHeight; 
        }
        window.addEventListener('resize', resizeCanvas); 
        resizeCanvas();
        
        function drawBackground() {
            // Fill with pure deep space black
            ctx.fillStyle = '#030305';
            ctx.fillRect(0, 0, width, height);
            
            time += 0.003;
            
            // Extra brightness at the top, but never completely fades out
            const extraGlow = window.bgFadeOpacity !== undefined ? window.bgFadeOpacity : 1;
            const baseOpacity = 0.65; // Significantly brighter on other pages
            const totalFade = baseOpacity + (extraGlow * 0.35); // Max 1.0 at top, min 0.65 everywhere else
            
            // Draw Neon Laser Waves
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                for (let x = 0; x <= width; x += 30) {
                    // Complex sine waves
                    const y = height * 0.45 
                            + Math.sin(x * 0.002 + time + i * 0.5) * 120 
                            + Math.cos(x * 0.005 - time) * 40 * i;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                // Glow effect
                ctx.strokeStyle = `rgba(0, 242, 254, ${totalFade * (0.05 + i * 0.03)})`;
                ctx.lineWidth = 1 + i * 0.5;
                ctx.stroke();
            }

            // Add starry floating particles in the background (always faintly visible)
            const particleAlpha = Math.max(0.18, extraGlow * 0.4);
            ctx.fillStyle = `rgba(0, 242, 254, ${particleAlpha})`;
            for(let i = 0; i < 40; i++) {
                const px = (Math.sin(i * 99 + time * 0.5) * 0.5 + 0.5) * width;
                const py = (Math.cos(i * 33 - time * 0.3) * 0.5 + 0.5) * height;
                const pz = Math.sin(i * 12 + time) * 2 + 2; // radius
                ctx.beginPath();
                ctx.arc(px, py, pz, 0, Math.PI * 2);
                ctx.fill();
            }
            
            requestAnimationFrame(drawBackground);
        }
        drawBackground();

        // =============== MOUSE GLOW ===============
        const viewport = document.getElementById('viewport');
        document.addEventListener('mousemove', e => {
            viewport.style.setProperty('--mx', e.clientX + 'px');
            viewport.style.setProperty('--my', e.clientY + 'px');
        });

        // =============== CONFIGURATION ===============
        const PHASES = {
            LAPTOP:      { start: 0,    end: 1800 },
            FADE_1:      { start: 2000, end: 3200 },
            PROJECTS:    { start: 3800, end: 7200 },
            FADE_CERT:   { start: 7800, end: 8400 },
            CERTS:       { start: 9000, end: 12400 },
            FADE_GH:     { start: 13000, end: 13600 },
            GITHUB:      { start: 14200, end: 16200 },
            FADE_2:      { start: 16600, end: 17200 },
            EDU_SPIRAL:  { start: 17400, end: 19400 },
            FADE_EDU:    { start: 19800, end: 20400 },
            EDU_SUMMARY: { start: 20800, end: 22400 },
            FADE_3:      { start: 22600, end: 23200 },
            CONTACT:     { start: 23200, end: 23800 },
        };
        const TOTAL = 23800;
        // Dynamically set the scroll height so no matter how many sections we add, scrolling always works!
        document.querySelector('.scroll-spacer').style.height = `calc(${TOTAL}px + 100vh)`;
        const NUM_PROJECTS = 5;
        const PROJECTS = [
            { 
              title:'SUMMER INTERNSHIP AT GRAYQUEST',   
              desc:'Completed a <b>summer internship at GrayQuest</b>, working on <b>credit risk analysis and NPA reduction</b> through data-driven risk scoring, an early warning system, and policy recommendations.',
              pdf:'./pdfs/grayquest_presentation.pdf',
              report_pdf: './pdfs/grayquest_report.pdf',
              live_url: 'https://grayquest-risk-demo.vercel.app/',
              live_btn_text: 'VIEW MY PROJECT',
              img: './images/grayquest.png',
              tech:[] 
            },
            { 
              title:'CredFlow Digital Lending & Real-Time Credit Decisioning',   
              desc:'Developed <b>CredFlow</b>, an end-to-end digital lending platform that automates <b>KYC, credit assessment, risk-based decisioning, loan calculations, and lender-side monitoring</b> through a real-time Business Rule Engine.',
              pdf:'./pdfs/credflow.pdf',
              live_url: 'https://whitequest-credflow.vercel.app/',
              img: './images/credflow.png',
              imgRadius: '50%', // Perfect circle to completely trim all black screenshot artifacts
              imgFilter: 'contrast(1.1) saturate(1.1) drop-shadow(0px 10px 20px rgba(0,0,0,0.5))', // Improve perceived quality
              tech:[] 
            },
            { title:'Project Gamma',   desc:'Cross-platform mobile app with offline-first architecture.',
              pdf:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
              tech:['Flutter','Firebase','Dart','GCP'], grad:'linear-gradient(135deg,#4facfe,#00f2fe)' },
            { title:'Project Delta',   desc:'DevOps automation toolkit for CI/CD pipeline management.',
              pdf:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
              tech:['Go','Kubernetes','Terraform','AWS'], grad:'linear-gradient(135deg,#43e97b,#38f9d7)' },
            { title:'Project Epsilon', desc:'Interactive data-visualisation dashboard with drill-down analytics.',
              pdf:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
              tech:['D3.js','Vue.js','PostgreSQL','GraphQL'], grad:'linear-gradient(135deg,#fa709a,#fee140)' },
        ];

        const EDUCATION = [
            { badge: 'Secondary Education', inst: "St. Augustine's Day School", grad: 'linear-gradient(135deg, #11998e, #38ef7d)' },
            { badge: 'Higher Secondary Education', inst: 'Bholanada National Vidyalaya', grad: 'linear-gradient(135deg, #f2994a, #f2c94c)' },
            { badge: 'BTech in Biotechnology', inst: 'Techno India University, Kolkata', grad: 'linear-gradient(135deg, #8E2DE2, #4A00E0)' },
            { badge: 'PGDM', inst: 'Great Lakes Institute Of Management, Gurgaon', grad: 'linear-gradient(135deg, #00C9FF, #92FE9D)' }
        ];

        // =============== DOM ===============
        const $ = id => document.getElementById(id);
        const scrollHint    = $('scroll-hint');
        const laptopLid     = $('laptop-lid');
        const screenOverlay = $('screen-overlay');
        const kbGlow        = $('kb-glow');
        const laptopShadow  = $('laptop-shadow');
        const sections = {
            laptop:     $('sec-laptop'),
            projects:   $('sec-projects'),
            certs:      $('sec-certs'),
            github:     $('sec-github'),
            eduSpiral:  $('sec-edu-spiral'),
            eduSummary: $('sec-edu-summary'),
            contact:    $('sec-contact'),
        };
        const modalOverlay = $('modal-overlay');

        const cachedNodes = {
            basePlate: document.querySelector('.laptop-base-plate'),
            lidFront: document.querySelector('.lid-front'),
            cameraLens: document.querySelector('.camera-lens'),
            screenDisplay: document.querySelector('.lid-screen-display')
        };

        // =============== BUILD LAPTOP 3D EDGES ===============
        (function() {
            const base = document.querySelector('.laptop-base-plate');
            for(let i=1; i<=4; i++) {
                const l = document.createElement('div');
                l.className = 'base-layer';
                l.style.transform = `translateZ(-${i}px)`;
                base.insertBefore(l, base.firstChild);
            }
            const lid = document.querySelector('.laptop-lid');
            for(let i=1; i<=4; i++) {
                const l = document.createElement('div');
                l.className = 'lid-layer';
                l.style.transform = `translateZ(-${i}px)`;
                lid.insertBefore(l, lid.firstChild);
            }
        })();

        // =============== BUILD KEYBOARD ===============
        (function() {
            const area = $('keyboard-keys');
            const rows = [
                ['`','1','2','3','4','5','6','7','8','9','0','-','=','del'],
                ['tab','Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],
                ['caps','A','S','D','F','G','H','J','K','L',';','\'','enter'],
                ['shift','Z','X','C','V','B','N','M',',','.','/','shift'],
                ['ctrl','opt','cmd',' ','cmd','opt','fn'] // Space row
            ];
            rows.forEach(rowKeys => {
                const row = document.createElement('div');
                row.className = 'key-row';
                rowKeys.forEach(keyChar => {
                    const key = document.createElement('div');
                    key.className = 'key';
                    if (keyChar === ' ') key.classList.add('space');
                    if (['enter', 'shift', 'caps', 'tab', 'del'].includes(keyChar)) key.style.flex = "1.5";
                    if (keyChar === ' ') key.style.flex = "5.5";
                    key.innerHTML = `<span>${keyChar}</span>`;
                    row.appendChild(key);
                });
                area.appendChild(row);
            });
        })();

        // =============== RENDER SECTIONS ===============
        let projectCards = [];
        let indicators = [];
        (function() {
            const vp = $('projects-viewport');
            const ind = $('project-indicators');
            PROJECTS.forEach((p, i) => {
                const c = document.createElement('div');
                c.className = 'project-card';
                c.innerHTML = `<div class="project-image" style="background:${p.grad}; position:relative; overflow:hidden;">
                    ${p.img ? `<div style="position:absolute;inset:0;background:url(${p.img}) center/cover no-repeat; filter:blur(40px); opacity:0.25; transform:scale(1.2);"></div>
                               <img src="${p.img}" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); max-height:75%; max-width:75%; border-radius:${p.imgRadius || '24px'}; filter:${p.imgFilter || 'none'}; box-shadow:0 15px 35px rgba(0,0,0,0.6); image-rendering: high-quality;" />` : ''}
                </div>
                    <div class="project-info">
                    <h3>${p.title}</h3><p>${p.desc}</p>
                    <div class="project-tech">${p.tech ? p.tech.map(t=>`<span>${t}</span>`).join('') : ''}</div>
                    ${(p.report_pdf || p.presentation_pdf || p.live_url) ? `
                    <div class="project-buttons" style="display:flex; gap:12px; margin-top:16px;">
                        ${p.live_url ? `<a href="${p.live_url}" target="_blank" onclick="event.stopPropagation()" class="project-btn project-btn-primary">${p.live_btn_text || 'VISIT THE SITE'}</a>` : ''}
                        ${p.presentation_pdf ? `<button onclick="openModalWithPdf(event, '${p.title} - Presentation', '${p.presentation_pdf}')" class="project-btn project-btn-outline">VIEW PRESENTATION</button>` : ''}
                        ${p.report_pdf ? `<button onclick="openModalWithPdf(event, '${p.title} - Full Report', '${p.report_pdf}')" class="project-btn project-btn-outline">VIEW FULL REPORT</button>` : ''}
                    </div>
                    ` : ''}
                    </div>`;
                c.addEventListener('click', () => openModal(i));
                vp.appendChild(c); projectCards.push(c);
                const dot = document.createElement('span');
                dot.className = 'indicator' + (i===0?' active':'');
                ind.appendChild(dot); indicators.push(dot);
            });
        })();

        const eduCards = [];
        (function() {
            const vp = $('edu-spiral-viewport');
            const slist = $('edu-summary-list');
            EDUCATION.forEach((e, i) => {
                // Build 3D Spiral Card
                const c = document.createElement('div');
                c.className = 'edu-spiral-card';
                c.innerHTML = `<div class="edu-badge">${e.badge}</div><div class="edu-inst">${e.inst}</div>`;
                vp.appendChild(c); eduCards.push(c);
            });
            
            // Build Starry Path Dots
            const pathDots = [];
            for (let i = 0; i < 60; i++) {
                const dot = document.createElement('div');
                dot.className = 'edu-path-dot';
                vp.appendChild(dot);
                pathDots.push(dot);
            }
            cachedNodes.pathDots = pathDots;
            // Build Summary List (Reverse order per user request: PGDM down to Class 10)
            [...EDUCATION].reverse().forEach((e) => {
                const item = document.createElement('div');
                item.className = 'edu-summary-item';
                item.innerHTML = `<div class="edu-summary-title">${e.badge}</div><div class="edu-summary-inst">${e.inst}</div>`;
                slist.appendChild(item);
            });
            
            cachedNodes.eduWords = document.querySelectorAll('.edu-word');
            cachedNodes.eduItems = document.querySelectorAll('.edu-summary-item');
        })();

        
        const CERTIFICATIONS = [
            { 
              title:'AWS Certified Solutions Architect',   
              desc:'Associate Level Certification for AWS Cloud computing.',
              img: '',
              grad:'linear-gradient(135deg,#ff9900,#ffcc00)',
              tech:['AWS', 'Cloud', 'Architecture'] 
            }
        ];
        let certCards = [];
        let certIndicators = [];
        (function() {
            const vp = $('certs-viewport');
            const ind = $('cert-indicators');
            CERTIFICATIONS.forEach((p, i) => {
                const c = document.createElement('div');
                c.className = 'project-card';
                c.innerHTML = `<div class="project-image" style="background:${p.grad}; position:relative; overflow:hidden;">
                    ${p.img ? `<div style="position:absolute;inset:0;background:url(${p.img}) center/cover no-repeat; filter:blur(40px); opacity:0.25; transform:scale(1.2);"></div>
                               <img src="${p.img}" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); max-height:75%; max-width:75%; border-radius:${p.imgRadius || '24px'}; filter:${p.imgFilter || 'none'}; box-shadow:0 15px 35px rgba(0,0,0,0.6); image-rendering: high-quality;" />` : ''}
                </div>
                    <div class="project-info">
                    <h3>${p.title}</h3><p>${p.desc}</p>
                    <div class="project-tech">${p.tech ? p.tech.map(t=>`<span>${t}</span>`).join('') : ''}</div>
                    </div>`;
                vp.appendChild(c); certCards.push(c);
                const dot = document.createElement('span');
                dot.className = 'indicator' + (i===0?' active':'');
                ind.appendChild(dot); certIndicators.push(dot);
            });
        })();

        let REPOS = [];

        let repoCards = [];
        async function loadGithubRepos() {
            const vp = $('github-viewport');
            try {
                let pinnedData = [];
                try {
                    // Primary: egoist pinned repos API
                    const pRes = await fetch('https://gh-pinned-repos.egoist.dev/?username=LiashRoy');
                    if (pRes.ok) pinnedData = await pRes.json();
                    else throw new Error('Primary API not ok');
                } catch(err) {
                    try {
                        // Secondary: pinned.github.io API
                        const pRes2 = await fetch('https://pinned.github.io/api/user/LiashRoy');
                        if (pRes2.ok) pinnedData = await pRes2.json();
                        else throw new Error('Secondary API not ok');
                    } catch(err2) {
                        console.warn("Pinned APIs failed, using exact fallback order:", err2);
                        // Hardcoded fallback exactly matching user's pinned dashboard order
                        pinnedData = [
                            {repo: 'whitequest-credflow'}, {repo: 'tranchechain'}, {repo: 'yt-music-sorter'},
                            {repo: 'cred-fintech-clone'}, {repo: 'Vivo-MRA-Dashboard-'}
                        ];
                    }
                }

                // Fetch full details from GitHub to get homepage (live link)
                const fullData = await Promise.all(pinnedData.map(async (p) => {
                    try {
                        const res = await fetch(`https://api.github.com/repos/LiashRoy/${p.repo || p.name}`);
                        if(!res.ok) throw new Error('Rate limit');
                        const r = await res.json();
                        return {
                            name: r.name,
                            desc: r.description || 'No description provided.',
                            lang: r.language || 'Unknown',
                            color: '#58a6ff',
                            stars: r.stargazers_count || 0,
                            forks: r.forks_count || 0,
                            url: r.html_url,
                            liveUrl: r.homepage || ''
                        };
                    } catch(e) { 
                        // Ultimate hardcoded fallback per repo if GitHub API is totally blocked/rate-limited
                        const repoName = p.repo || p.name;
                        return { 
                            name: repoName, 
                            desc: 'A LiashRoy repository.', 
                            lang: 'JavaScript', 
                            color: '#58a6ff', 
                            stars: 0, 
                            forks: 0, 
                            url: `https://github.com/LiashRoy/${repoName}`, 
                            liveUrl: `https://liashroy.github.io/${repoName}/` 
                        }; 
                    }
                }));

                REPOS = fullData;
                
                REPOS.forEach((r, i) => {
                    // Preload the appropriate image so it opens instantly when clicked
                    const preload = new Image();
                    preload.src = r.liveUrl ? `https://api.microlink.io?url=${encodeURIComponent(r.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url` : `https://opengraph.githubassets.com/1/LiashRoy/${r.name}`;

                    const c = document.createElement('div');
                    c.className = 'repo-card';
                    c.style.cursor = 'pointer';
                    c.innerHTML = `
                        <div class="repo-title">
                            <svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
                            ${r.name}
                        </div>
                        <div class="repo-desc">${r.desc}</div>
                        <div class="repo-stats">
                            <span><i class="lang-color" style="background:${r.color}"></i> ${r.lang}</span>
                            <span><svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path></svg> ${r.stars}</span>
                            <span><svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> ${r.forks}</span>
                        </div>`;
                    c.addEventListener('click', () => openRepoModal(i));
                    vp.appendChild(c); repoCards.push(c);
                });
            } catch(e) { console.error("Total failure fetching repos", e); }
        }
        loadGithubRepos();

        // =============== MODAL ===============
        window.openModalWithPdf = function(e, title, pdfSrc) {
            if(e) e.stopPropagation();
            $('modal-title').textContent = title;
            $('modal-repo-container').style.display = 'none';
            $('modal-pdf-container').style.display = 'block';
            $('modal-pdf-iframe').src = pdfSrc;
            modalOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        };

        function openModal(i) {
            $('modal-title').textContent = PROJECTS[i].title;
            $('modal-repo-container').style.display = 'none';
            $('modal-pdf-container').style.display = 'block';
            $('modal-pdf-iframe').src = PROJECTS[i].pdf;
            modalOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        
        function openRepoModal(i) {
            const r = REPOS[i];
            $('modal-title').textContent = r.name;
            $('modal-pdf-container').style.display = 'none';
            $('modal-repo-container').style.display = 'flex';
            
            const liveBtn = $('modal-repo-live');
            let fullLiveUrl = '';
            if (r.liveUrl && r.liveUrl !== '') {
                fullLiveUrl = r.liveUrl;
                if(!fullLiveUrl.startsWith('http')) fullLiveUrl = 'https://' + fullLiveUrl;
                liveBtn.style.display = 'block';
                liveBtn.href = fullLiveUrl;
            } else {
                liveBtn.style.display = 'none';
            }

            // Clear previous image instantly to prevent ghosting while the new one loads
            const img = $('modal-repo-img');
            img.style.opacity = 0;
            $('modal-repo-loading').style.display = 'flex';
            img.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
            img.style.display = 'block';
            
            // Use live screenshot if available, otherwise fallback to OpenGraph
            img.onload = () => {
                img.style.opacity = 1;
                $('modal-repo-loading').style.display = 'none';
            };
            
            if (fullLiveUrl) {
                img.src = `https://api.microlink.io?url=${encodeURIComponent(fullLiveUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
            } else {
                img.src = `https://opengraph.githubassets.com/1/LiashRoy/${r.name}`;
            }
            
            // If the screenshot fails to load, use a generic placeholder
            img.onerror = function() { 
                this.onerror = null; // prevent infinite loop
                this.src = 'https://placehold.co/600x300/1a1a1d/58a6ff?text=' + encodeURIComponent(r.name) + '&font=monospace'; 
            };

            $('modal-repo-desc').textContent = r.desc;
            $('modal-repo-github').href = r.url;
            
            modalOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        $('modal-close').addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', e => { if (e.target===modalOverlay) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key==='Escape') closeModal(); });
        function closeModal() { 
            modalOverlay.classList.remove('open'); 
            document.body.style.overflow = ''; 
            setTimeout(() => { 
                $('modal-pdf-iframe').src = ''; 
                $('modal-repo-img').src = '';
            }, 400); 
        }

        // =============== HELPERS ===============
        function prog(s, a, b) { return Math.max(0, Math.min(1, (s-a)/(b-a))); }
        function lerp(a, b, t) { return a + (b-a) * t; }
        
        // Guarantees no overlapping elements by creating a dead zone in the middle of a phase
        function f_out(s, phase) { return prog(s, phase.start, phase.start + (phase.end - phase.start) * 0.4); }
        function f_in(s, phase)  { return prog(s, phase.end - (phase.end - phase.start) * 0.4, phase.end); }
        
        function hideAll() {
            for (const s of Object.values(sections)) {
                s.style.opacity='0'; s.style.visibility='hidden'; s.style.transform='';
            }
        }
        function show(sec, op, tf) {
            sec.style.opacity = op;
            sec.style.visibility = op > 0 ? 'visible' : 'hidden';
            if (tf) sec.style.transform = tf;
        }

        // =============== RENDER LOOP ===============
        let target = window.scrollY || 0;
        let cur = target;

        function render() {
            cur += (target - cur) * 0.1;
            if (Math.abs(cur - target) < 0.5) cur = target;
            const s = cur;
            
            // Expose a fade variable for the canvas background! 1 at top, 0 as we scroll down past laptop
            window.bgFadeOpacity = Math.max(0, 1 - (s / 1200));

            // Keep the scroll hint visible across all sections, only fading it out at the very end (Contact page)
            scrollHint.style.opacity = s > (TOTAL - 800) ? '0' : '1';

            hideAll();

            /* ---- LAPTOP ---- */
            if (s <= PHASES.FADE_1.end) {
                const lp = prog(s, PHASES.LAPTOP.start, PHASES.LAPTOP.end);

                // Lid opens: 0° (closed flat) → 130° (past vertical, open)
                const lidP = Math.min(lp / 0.72, 1);
                const lidAngle = lerp(0, 130, lidP);
                laptopLid.style.transform = 'rotateX(' + lidAngle + 'deg) translateZ(8px)';

                // Keyboard glow from screen light
                const glP = prog(lp, 0.50, 0.78);
                kbGlow.style.opacity = glP * 0.40;

                // Shadow changes as lid opens
                laptopShadow.style.opacity = 0.3 + lidP * 0.6;
                laptopShadow.style.transform = 'scaleX(' + (1 + lidP * 0.3) + ')';

                // Screen overlay (name/links) fade in
                const cp = prog(lp, 0.62, 0.82);
                screenOverlay.style.opacity = cp;
                screenOverlay.style.pointerEvents = cp > 0.5 ? 'auto' : 'none';
                if (cp > 0.01) screenOverlay.classList.add('visible');
                else screenOverlay.classList.remove('visible');

                // Section opacity (fades out during FADE_1)
                let lo = 1, lt = '';
                if (s > PHASES.FADE_1.start) {
                    const fo = f_out(s, PHASES.FADE_1);
                    
                    // 1. Fade out the text/profile-pic early and smoothly
                    if (cachedNodes.screenDisplay) {
                        const overlay = cachedNodes.screenDisplay.querySelector('.screen-overlay');
                        if (overlay) overlay.style.opacity = Math.max(0, 1 - fo * 2);
                        cachedNodes.screenDisplay.style.boxShadow = 'none';
                    }
                    
                    // 2. Elegantly fade out the chassis before hiding it to prevent visual snapping
                    const chassisOp = Math.max(0, 1 - fo * 1.5); 
                    const chassisVis = fo > 0.7 ? 'hidden' : 'visible';
                    
                    if(cachedNodes.basePlate) {
                        cachedNodes.basePlate.style.opacity = chassisOp;
                        cachedNodes.basePlate.style.visibility = chassisVis;
                    }
                    laptopShadow.style.opacity = chassisOp;
                    laptopShadow.style.visibility = chassisVis;
                    if(cachedNodes.lidFront) {
                        cachedNodes.lidFront.style.opacity = chassisOp;
                        cachedNodes.lidFront.style.visibility = chassisVis;
                    }
                    
                    // 3. Much gentler, softer camera movement. 
                    const pitch = fo * 35; 
                    const zScale = 1 + Math.pow(fo, 2) * 8; // Ultra soft ease-in scale
                    const yOffset = fo * 100; 
                    
                    lt = `perspective(1000px) rotateX(${pitch}deg) scale(${zScale}) translateY(${yOffset}px)`;
                    
                    // 4. Ultra dreamy, gradual dissolve starting very early (at 15%)
                    lo = fo < 0.15 ? 1 : 1 - ((fo - 0.15) * 1.17);
                } else {
                    if (cachedNodes.screenDisplay) {
                        const overlay = cachedNodes.screenDisplay.querySelector('.screen-overlay');
                        if (overlay) overlay.style.opacity = 1;
                        cachedNodes.screenDisplay.style.boxShadow = 'inset 0 0 24px rgba(0,0,0,1)';
                    }
                    if(cachedNodes.basePlate) {
                        cachedNodes.basePlate.style.visibility = 'visible';
                        cachedNodes.basePlate.style.opacity = 1;
                    }
                    laptopShadow.style.visibility = 'visible';
                    laptopShadow.style.opacity = 1;
                    if(cachedNodes.lidFront) {
                        cachedNodes.lidFront.style.visibility = 'visible';
                        cachedNodes.lidFront.style.opacity = 1;
                    }
                }
                show(sections.laptop, lo, lt);
            }

            /* ---- PROJECTS ---- */
            if (s >= PHASES.FADE_1.start && s <= PHASES.FADE_GH.end) {
                let po=1, pt='';
                if (s <= PHASES.FADE_1.end) {
                    const fi = f_in(s, PHASES.FADE_1);
                    po=fi; pt=`scale(${0.5+fi*0.5}) translateY(${(1-fi)*100}px)`;
                } else if (s > PHASES.FADE_GH.start) {
                    const fo = f_out(s, PHASES.FADE_GH);
                    po=1-fo; pt=`scale(${1-fo*.04})`;
                }
                show(sections.projects, po, pt);

                const pp = prog(s, PHASES.PROJECTS.start, PHASES.PROJECTS.end);
                const fi = pp * (NUM_PROJECTS - 1);
                projectCards.forEach((c,i) => {
                    const off=i-fi, tx=off*110;
                    const sc=Math.max(.7, 1-Math.abs(off)*.15);
                    const op=Math.max(0, 1-Math.abs(off)*.7);
                    const ry=-off*25;
                    const tz=-Math.abs(off)*150; // Hardware accelerated depth sorting
                    c.style.transform=`perspective(1200px) translateX(${tx}%) translateZ(${tz}px) scale(${sc}) rotateY(${ry}deg)`;
                    c.style.opacity=op;
                });
                const ai=Math.round(Math.min(fi,NUM_PROJECTS-1));
                indicators.forEach((d,i)=>d.classList.toggle('active',i===ai));
            }

            
            /* ---- CERTIFICATIONS ---- */
            if (s >= PHASES.FADE_CERT.start && s <= PHASES.FADE_GH.end) {
                let co=1, ct='';
                if (s <= PHASES.FADE_CERT.end) {
                    const fi = f_in(s, PHASES.FADE_CERT);
                    co=fi; ct=`scale(${.96+fi*.04}) translateY(${(1-fi)*28}px)`;
                } else if (s > PHASES.FADE_GH.start) {
                    const fo = f_out(s, PHASES.FADE_GH);
                    co=1-fo; ct=`scale(${1-fo*.04})`;
                }
                show(sections.certs, co, ct);

                const cp = prog(s, PHASES.CERTS.start, PHASES.CERTS.end);
                const ci = cp * (CERTIFICATIONS.length - 1);
                certCards.forEach((c,i) => {
                    const off=i-ci, tx=off*110;
                    const sc=Math.max(.7, 1-Math.abs(off)*.15);
                    const op=Math.max(0, 1-Math.abs(off)*.8);
                    const z=off*-100;
                    const rx=off*15, ry=off*-25;
                    c.style.transform = `translate3d(${tx}%,0,${z}px) scale(${sc}) rotateX(${rx}deg) rotateY(${ry}deg)`;
                    c.style.opacity = op;
                    c.style.zIndex = Math.round(100 - Math.abs(off)*10);
                });
                const ai = Math.round(ci);
                certIndicators.forEach((d,i) => d.className='indicator'+(i===ai?' active':''));
            }

            /* ---- GITHUB ---- */

            if (s >= PHASES.FADE_GH.start && s <= PHASES.FADE_2.end) {
                let go=1, gt='';
                if (s <= PHASES.FADE_GH.end) {
                    const fi = f_in(s, PHASES.FADE_GH);
                    go=fi; gt=`scale(${.96+fi*.04}) translateY(${(1-fi)*28}px)`;
                } else if (s > PHASES.FADE_2.start) {
                    const fo = f_out(s, PHASES.FADE_2);
                    go=1-fo; gt=`scale(${1-fo*.04})`;
                }
                show(sections.github, go, gt);

                const gp = prog(s, PHASES.GITHUB.start, PHASES.GITHUB.end);
                const gi = gp * (REPOS.length - 1);
                repoCards.forEach((c,i) => {
                    const off=i-gi, tx=off*110;
                    const sc=Math.max(.7, 1-Math.abs(off)*.15);
                    const op=Math.max(0, 1-Math.abs(off)*.7);
                    const ry=-off*25;
                    const tz=-Math.abs(off)*150; // Hardware accelerated depth sorting
                    c.style.transform=`perspective(1200px) translateX(${tx}%) translateZ(${tz}px) scale(${sc}) rotateY(${ry}deg)`;
                    c.style.opacity=op;
                });
            }

            /* ---- EDUCATION SPIRAL ---- */
            if (s >= PHASES.FADE_2.start && s <= PHASES.FADE_EDU.end) {
                let eo=1, et='';
                if (s <= PHASES.FADE_2.end) {
                    const fi = f_in(s, PHASES.FADE_2);
                    eo=fi; et=`scale(${.96+fi*.04}) translateY(${(1-fi)*28}px)`;
                } else if (s > PHASES.EDU_SPIRAL.end) {
                    const fo = f_out(s, PHASES.FADE_EDU);
                    eo=1-fo; et=`scale(${1-fo*.04})`;
                }
                show(sections.eduSpiral, eo, et);

                // Spiral math
                const ep = prog(s, PHASES.EDU_SPIRAL.start, PHASES.EDU_SPIRAL.end);
                const ei = ep * (EDUCATION.length - 1);
                eduCards.forEach((c, i) => {
                    const off = i - ei;
                    const tz = -Math.abs(off) * 200; // Recedes into depth
                    const ty = off * 350;           // Moves up/down
                    const tx = Math.sin(off * Math.PI / 2) * 200; // Weaves left/right
                    const ry = off * 30;            // Rotates like a helix
                    const sc = Math.max(0.5, 1 - Math.abs(off) * 0.15);
                    const op = Math.max(0, 1 - Math.abs(off) * 0.5);
                    c.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${ry}deg) scale(${sc})`;
                    c.style.opacity = op;
                });
                
                // Spiral Path Dots math (using the exact same parametric curve)
                if (cachedNodes.pathDots) {
                    const timeOffset = (performance.now() / 1500) % 1; // Loops seamlessly from 0 to 1 every 1.5s
                    cachedNodes.pathDots.forEach((dot, idx) => {
                        // 60 dots covering an offset range of 6 (-3 to +3 from camera)
                        // Subtracting timeOffset * 0.1 shifts each dot smoothly to the position of the next, creating an infinite flow illusion!
                        const off = -3 + (idx * 0.1) - (timeOffset * 0.1);
                        
                        const tz = -Math.abs(off) * 200; 
                        const ty = off * 350;           
                        const tx = Math.sin(off * Math.PI / 2) * 200; 
                        
                        // Dots fade out gently into the distance, peak opacity increased to 0.65
                        const op = Math.max(0, 0.65 - Math.abs(off) * 0.12);
                        
                        dot.style.opacity = op;
                        dot.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px)`;
                    });
                }
            }

            /* ---- EDUCATION SUMMARY ---- */
            if (s >= PHASES.FADE_EDU.start && s <= PHASES.FADE_3.end) {
                let so=1, st='';
                if (s <= PHASES.FADE_EDU.end) {
                    const fi = f_in(s, PHASES.FADE_EDU);
                    so=fi; st=`scale(${.96+fi*.04}) translateY(${(1-fi)*28}px)`;
                } else if (s > PHASES.EDU_SUMMARY.end) {
                    const fo = f_out(s, PHASES.FADE_3);
                    so=1-fo; st=`scale(${1-fo*.04})`;
                }
                show(sections.eduSummary, so, st);
                
                if (so > 0) {
                    const sumP = prog(s, PHASES.EDU_SUMMARY.start, PHASES.EDU_SUMMARY.end);
                    
                    // 1. Sequence the 3 words ("MY", "EDUCATIONAL", "JOURNEY") to appear one by one
                    if (cachedNodes.eduWords) {
                        cachedNodes.eduWords.forEach((w, i) => {
                            // Slower fade over a longer scroll, sliding up from 50px below
                            const p = Math.max(0, Math.min(1, (sumP - (i * 0.15)) * 2.5)); 
                            w.style.opacity = p;
                            w.style.transform = `translateY(${(1-p)*50}px)`;
                            w.style.display = 'inline-block';
                        });
                    }

                    // 2. Sequence the 4 education history pointers to appear one by one
                    if (cachedNodes.eduItems) {
                        cachedNodes.eduItems.forEach((item, i) => {
                            // Pointers start later, slide in from 100px away for a very visible entrance
                            const p = Math.max(0, Math.min(1, (sumP - 0.25 - (i * 0.12)) * 2.5)); 
                            item.style.opacity = p;
                            item.style.transform = `translateX(${(1-p)*100}px)`;
                        });
                    }
                }
            }

            /* ---- CONTACT ---- */
            if (s >= PHASES.FADE_3.start) {
                let co=1, ct='';
                if (s <= PHASES.FADE_3.end) {
                    const fi = f_in(s, PHASES.FADE_3);
                    co=fi; ct=`scale(${.96+fi*.04}) translateY(${(1-fi)*28}px)`;
                }
                show(sections.contact, co, ct);
            }

            requestAnimationFrame(render);
        }

        // =============== SCROLL ===============
        window.addEventListener('scroll', () => { target = window.scrollY; }, { passive: true });

        // =============== INIT ===============
        show(sections.laptop, 1);
        laptopLid.style.transform = 'rotateX(0deg)';
        requestAnimationFrame(render);
    })();
    
