
(() => {
const PROJECTS = [
            { title:'Project Alpha',   desc:'A full-stack web app with real-time collaboration features.', pdf:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tech:['React','Node.js','Socket.io','MongoDB'], grad:'linear-gradient(135deg,#667eea,#764ba2)' },
            { title:'System Beta',     desc:'A highly scalable microservices backend.', pdf:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tech:['Go','Docker','Kubernetes','PostgreSQL'], grad:'linear-gradient(135deg,#232526,#414345)' },
            { title:'App Gamma',       desc:'A cross-platform mobile application.', pdf:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tech:['Flutter','Firebase','Dart','Redux'], grad:'linear-gradient(135deg,#ff9a9e,#fecfef)' },
            { title:'Tool Delta',      desc:'An AI-powered data analysis tool.', pdf:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tech:['Python','TensorFlow','Pandas','FastAPI'], grad:'linear-gradient(135deg,#a18cd1,#fbc2eb)' },
            { title:'Platform Epsilon',desc:'A decentralized finance dashboard.', pdf:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', tech:['Web3.js','Solidity','Next.js','Tailwind'], grad:'linear-gradient(135deg,#84fab0,#8fd3f4)' }
        ];

        const $ = id => document.getElementById(id);
        let REPOS = [];
        let repoCards = [];
        
        async function loadGithubRepos() {
            const vp = $('github-viewport');
            try {
                let pinnedData = [];
                try {
                    const htmlRes = await fetch('https://api.codetabs.com/v1/proxy?quest=https://github.com/LiashRoy?t=' + Date.now());
                    if (!htmlRes.ok) throw new Error('Failed to fetch GitHub profile');
                    const htmlText = await htmlRes.text();
                    
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlText, 'text/html');
                    const pinnedItems = doc.querySelectorAll('.js-pinned-item-list-item');
                    
                    pinnedData = Array.from(pinnedItems).map(item => {
                        const repoA = item.querySelector('a.repo');
                        const repo = repoA ? repoA.textContent.trim() : '';
                        const desc = item.querySelector('.pinned-item-desc');
                        const langNode = item.querySelector('[itemprop="programmingLanguage"]');
                        const colorNode = item.querySelector('.repo-language-color');
                        const starsNode = item.querySelector('a[href$="/stargazers"]');
                        const forksNode = item.querySelector('a[href$="/forks"]');
                        
                        return {
                            name: repo,
                            desc: desc ? desc.textContent.trim() : 'No description provided.',
                            lang: langNode ? langNode.textContent.trim() : 'Unknown',
                            color: colorNode ? colorNode.style.backgroundColor : '#58a6ff',
                            stars: starsNode ? parseInt(starsNode.textContent.trim().replace(/,/g, '')) || 0 : 0,
                            forks: forksNode ? parseInt(forksNode.textContent.trim().replace(/,/g, '')) || 0 : 0,
                            url: 'https://github.com/LiashRoy/' + repo,
                            liveUrl: ''
                        };
                    });
                    
                    if (pinnedData.length === 0) throw new Error("No pinned items found");
                } catch(err) {
                    console.warn("Direct scraping failed, using fallback:", err);
                    pinnedData = [
                        { name: 'whitequest-credflow', desc: 'A custom frontend implementation connecting to credflow APIs.', lang: 'JavaScript', color: '#f1e05a', stars: 0, forks: 0, url: 'https://github.com/LiashRoy/whitequest-credflow', liveUrl: '' },
                        { name: 'tranchechain', desc: 'Blockchain related project implementation and experiments.', lang: 'JavaScript', color: '#f1e05a', stars: 0, forks: 0, url: 'https://github.com/LiashRoy/tranchechain', liveUrl: '' },
                        { name: 'yt-music-sorter', desc: 'A tool to sort and manage YouTube Music playlists efficiently.', lang: 'JavaScript', color: '#f1e05a', stars: 0, forks: 0, url: 'https://github.com/LiashRoy/yt-music-sorter', liveUrl: '' },
                        { name: 'cred-fintech-clone', desc: 'UI/UX clone of the popular fintech application Cred.', lang: 'HTML', color: '#e34c26', stars: 0, forks: 0, url: 'https://github.com/LiashRoy/cred-fintech-clone', liveUrl: '' },
                        { name: 'Vivo-MRA-Dashboard-', desc: 'Dashboard application for tracking and analytics.', lang: 'TypeScript', color: '#3178c6', stars: 0, forks: 0, url: 'https://github.com/LiashRoy/Vivo-MRA-Dashboard-', liveUrl: '' }
                    ];
                }

                REPOS = pinnedData;
                vp.innerHTML = '';
                repoCards = [];
                REPOS.forEach((r, i) => {
                    const c = document.createElement('div');
                    c.className = 'repo-card';
                    c.style.cursor = 'pointer';
                    c.innerHTML = `<div class="repo-title">
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

                Promise.all(REPOS.map(async (p, idx) => {
                    try {
                        const res = await fetch('https://api.github.com/repos/LiashRoy/' + p.name);
                        if(res.ok) {
                            const r = await res.json();
                            REPOS[idx].liveUrl = r.homepage || '';
                            const img = $('modal-repo-img');
                            // We don't update img here, only when modal opens
                        }
                    } catch(e) { }
                }));
            } catch(e) { console.error("Total failure fetching repos", e); }
        }
        loadGithubRepos();

        // =============== MODAL ===============
        const modalOverlay = $('modal-overlay');

        function openModalWithPdf(e, title, pdfSrc) {
            if(e) e.stopPropagation();
            $('modal-title').textContent = title;
            $('modal-repo-container').style.display = 'none';
            $('modal-pdf-container').style.display = 'block';
            $('modal-pdf-iframe').src = pdfSrc;
            modalOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        
        function openRepoModal(i) {
            const r = REPOS[i];
            $('modal-title').textContent = r.name;
            $('modal-pdf-container').style.display = 'none';
            $('modal-repo-container').style.display = 'flex';
            
            const img = $('modal-repo-img');
            img.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
            img.style.display = 'block';
            
            if (r.liveUrl && r.liveUrl !== '') {
                img.src = 'https://api.microlink.io?url=' + encodeURIComponent(r.liveUrl) + '&screenshot=true&meta=false&embed=screenshot.url';
            } else {
                img.src = 'https://opengraph.githubassets.com/1/LiashRoy/' + r.name;
            }
            
            $('modal-repo-desc').textContent = r.desc;
            $('modal-repo-github').href = r.url;
            
            const liveBtn = $('modal-repo-live');
            if (r.liveUrl && r.liveUrl !== '') {
                let url = r.liveUrl;
                if(!url.startsWith('http')) url = 'https://' + url;
                liveBtn.style.display = 'block';
                liveBtn.href = url;
            } else {
                liveBtn.style.display = 'none';
            }
            
            modalOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() { 
            modalOverlay.classList.remove('open'); 
            document.body.style.overflow = ''; 
            setTimeout(() => { 
                $('modal-pdf-iframe').src = ''; 
                $('modal-repo-img').src = '';
            }, 400); 
        }

        $('modal-close').addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', e => { if (e.target===modalOverlay) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key==='Escape') closeModal(); });

        // =============== RENDER LOOP ===============
        const TOTAL = 12500;
        const NUM_PROJECTS = 5;
        const PHASES = {
            LAPTOP:     { start: 0,    end: 1800 },
            FADE_1:     { start: 2500, end: 3100 },
            PROJECTS:   { start: 3100, end: 6100 },
            FADE_GH:    { start: 6100, end: 6700 },
            GITHUB:     { start: 6700, end: 9700 },
            FADE_2:     { start: 9700, end: 10300 },
            EDUCATION:  { start: 10300, end: 11300 },
            FADE_3:     { start: 11300, end: 11900 },
        };

        const sections = {
            laptop: $('sec-laptop'),
            projects: $('sec-projects'),
            github: $('sec-github'),
            education: $('sec-education'),
            contact: $('sec-contact')
        };
        const laptopLid = $('laptop-lid');
        const kbGlow = $('kb-glow');
        const screenOverlay = $('screen-overlay');
        const projectCards = document.querySelectorAll('.project-card');
        const indicators = document.querySelectorAll('.indicator');
        const navItems = document.querySelectorAll('.nav span');

        document.body.style.height = (TOTAL + window.innerHeight) + 'px';

        let target = 0;
        let cur = 0;

        function lerp(a,b,t) { return a + (b-a)*t; }
        function prog(v, min, max) { return Math.max(0, Math.min(1, (v-min)/(max-min))); }
        function show(el, op, tx='') {
            if(!el) return;
            el.style.opacity = op;
            el.style.transform = tx;
            el.style.pointerEvents = op > 0.1 ? 'auto' : 'none';
        }
        function setNav(idx) {
            navItems.forEach((n,i)=>n.classList.toggle('active',i===idx));
        }

        function render() {
            cur += (target - cur) * 0.08;
            const s = cur;

            /* ---- LAPTOP LID ---- */
            if (s <= PHASES.LID?.end || s <= 1800) {
                const lp = prog(s, 0, 1800);
                const lidP = Math.min(lp / 0.72, 1);
                const lidAngle = lerp(0, 130, lidP);
                laptopLid.style.transform = 'rotateX(' + lidAngle + 'deg)';

                const glP = prog(lp, 0.50, 0.78);
                kbGlow.style.opacity = glP * 0.40;

                const cp = prog(lp, 0.62, 0.82);
                screenOverlay.style.opacity = cp;
                screenOverlay.style.transform = `translate(-50%,-50%) scale(${0.92+cp*0.08})`;
                screenOverlay.style.pointerEvents = cp > 0.5 ? 'auto' : 'none';
                if (cp > 0.01) screenOverlay.classList.add('visible');
                else screenOverlay.classList.remove('visible');
            }
            
            /* ---- LAPTOP FADE ---- */
            let lo = 1, lt = '';
            if (s > PHASES.FADE_1.start) {
                const fo = prog(s, PHASES.FADE_1.start, PHASES.FADE_1.end);
                lo = 1 - fo;
                lt = `scale(${1-fo*0.04}) translateY(${-fo*35}px)`;
            }
            show(sections.laptop, lo, lt);
            if (s <= PHASES.FADE_1.end) setNav(0);

            /* ---- PROJECTS ---- */
            if (s >= PHASES.FADE_1.start && s <= PHASES.FADE_GH.end) {
                let po=1, pt='';
                if (s <= PHASES.FADE_1.end) {
                    const fi = prog(s, PHASES.FADE_1.start, PHASES.FADE_1.end);
                    po=fi; pt=`scale(${.96+fi*.04}) translateY(${(1-fi)*28}px)`;
                } else if (s > PHASES.FADE_GH.start) {
                    const fo = prog(s, PHASES.FADE_GH.start, PHASES.FADE_GH.end);
                    po=1-fo; pt=`scale(${1-fo*.04})`;
                }
                show(sections.projects, po, pt);

                const pp = prog(s, PHASES.PROJECTS.start, PHASES.PROJECTS.end);
                const fi = pp * (NUM_PROJECTS - 1);
                projectCards.forEach((c,i) => {
                    const off=i-fi, tx=off*115;
                    const sc=Math.max(.78,1-Math.abs(off)*.12);
                    const op=Math.max(.15,1-Math.abs(off)*.55);
                    const bl=Math.min(Math.abs(off)*2.5,5);
                    c.style.transform=`translateX(${tx}%) scale(${sc})`;
                    c.style.opacity=op; c.style.filter=`blur(${bl}px)`;
                    c.style.zIndex=NUM_PROJECTS-Math.round(Math.abs(off));
                });
                const ai=Math.round(Math.min(fi,NUM_PROJECTS-1));
                indicators.forEach((d,i)=>d.classList.toggle('active',i===ai));
                if (s > PHASES.FADE_1.end && s <= PHASES.FADE_GH.end) setNav(1);
            }

            /* ---- GITHUB ---- */
            if (s >= PHASES.FADE_GH.start && s <= PHASES.FADE_2.end) {
                let go=1, gt='';
                if (s <= PHASES.FADE_GH.end) {
                    const fi = prog(s, PHASES.FADE_GH.start, PHASES.FADE_GH.end);
                    go=fi; gt=`scale(${.96+fi*.04}) translateY(${(1-fi)*28}px)`;
                } else if (s > PHASES.FADE_2.start) {
                    const fo = prog(s, PHASES.FADE_2.start, PHASES.FADE_2.end);
                    go=1-fo; gt=`scale(${1-fo*.04})`;
                }
                show(sections.github, go, gt);

                const gp = prog(s, PHASES.GITHUB.start, PHASES.GITHUB.end);
                const gi = gp * (REPOS.length - 1);
                repoCards.forEach((c,i) => {
                    const off=i-gi, tx=off*65;
                    const sc=Math.max(.7, 1-Math.abs(off)*.15);
                    const op=Math.max(0, 1-Math.abs(off)*.7);
                    const ry=-off*25;
                    c.style.transform=`perspective(1200px) translateX(${tx}%) scale(${sc}) rotateY(${ry}deg)`;
                    c.style.opacity=op;
                    c.style.zIndex=100-Math.round(Math.abs(off)*10);
                });
                if (s > PHASES.FADE_GH.end && s <= PHASES.FADE_2.end) setNav(2); // Github nav was 2!
            }

            /* ---- EDUCATION ---- */
            if (s >= PHASES.FADE_2.start && s <= PHASES.FADE_3.end) {
                let eo=1, et='';
                if (s <= PHASES.FADE_2.end) {
                    const fi=prog(s,PHASES.FADE_2.start,PHASES.FADE_2.end);
                    eo=fi; et=`translateY(${(1-fi)*28}px)`;
                } else if (s > PHASES.FADE_3.start) {
                    const fo=prog(s,PHASES.FADE_3.start,PHASES.FADE_3.end);
                    eo=1-fo; et=`scale(${1-fo*.04})`;
                }
                show(sections.education, eo, et);
                if (s > PHASES.FADE_2.end && s <= PHASES.FADE_3.end) setNav(3); 
            }

            /* ---- CONTACT ---- */
            if (s >= PHASES.FADE_3.start) {
                let co=1, ct='';
                if (s <= PHASES.FADE_3.end) {
                    const fi=prog(s,PHASES.FADE_3.start,PHASES.FADE_3.end);
                    co=fi; ct=`translateY(${(1-fi)*28}px)`;
                }
                show(sections.contact, co, ct);
                if (s > PHASES.FADE_3.end) setNav(4); 
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
    