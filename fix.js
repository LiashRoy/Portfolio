const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Remove all instances of loadGithubRepos function definition
content = content.replace(/async function loadGithubRepos\(\) \{[\s\S]*?\}\s*loadGithubRepos\(\);/g, '');
// Also catch if loadGithubRepos(); was on a different line
content = content.replace(/async function loadGithubRepos\(\) \{[\s\S]*?\}\s*/g, '');
content = content.replace(/loadGithubRepos\(\);/g, '');

// 2. Remove duplicate let REPOS = []; let repoCards = [];
content = content.replace(/let REPOS = \[\];\s*let repoCards = \[\];/g, '');

const fixedCode = 
          let REPOS = [];
          let repoCards = [];
          async function loadGithubRepos() {
              const vp = github-viewport;
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
                      console.warn("Direct scraping failed, using exact fallback order:", err);
                      pinnedData = [
                          { name: 'whitequest-credflow', desc: 'A LiashRoy repository.', lang: 'JavaScript', color: '#f1e05a', stars: 0, forks: 0, url: 'https://github.com/LiashRoy/whitequest-credflow', liveUrl: '' },
                          { name: 'tranchechain', desc: 'A LiashRoy repository.', lang: 'JavaScript', color: '#f1e05a', stars: 0, forks: 0, url: 'https://github.com/LiashRoy/tranchechain', liveUrl: '' },
                          { name: 'yt-music-sorter', desc: 'A LiashRoy repository.', lang: 'JavaScript', color: '#f1e05a', stars: 0, forks: 0, url: 'https://github.com/LiashRoy/yt-music-sorter', liveUrl: '' },
                          { name: 'cred-fintech-clone', desc: 'A LiashRoy repository.', lang: 'HTML', color: '#e34c26', stars: 0, forks: 0, url: 'https://github.com/LiashRoy/cred-fintech-clone', liveUrl: '' },
                          { name: 'Vivo-MRA-Dashboard-', desc: 'A LiashRoy repository.', lang: 'TypeScript', color: '#3178c6', stars: 0, forks: 0, url: 'https://github.com/LiashRoy/Vivo-MRA-Dashboard-', liveUrl: '' }
                      ];
                  }

                  REPOS = pinnedData;
                  vp.innerHTML = '';
                  repoCards = [];
                  REPOS.forEach((r, i) => {
                      const c = document.createElement('div');
                      c.className = 'repo-card';
                      c.style.cursor = 'pointer';
                      c.innerHTML = \
                          <div class="repo-title">
                              <svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
                              \
                          </div>
                          <div class="repo-desc">\</div>
                          <div class="repo-stats">
                              <span><i class="lang-color" style="background:\"></i> \</span>
                              <span><svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path></svg> \</span>
                              <span><svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> \</span>
                          </div>\;
                      c.addEventListener('click', () => openRepoModal(i));
                      vp.appendChild(c); repoCards.push(c);
                  });

                  Promise.all(REPOS.map(async (p, idx) => {
                      try {
                          const res = await fetch('https://api.github.com/repos/LiashRoy/' + p.name);
                          if(res.ok) {
                              const r = await res.json();
                              REPOS[idx].liveUrl = r.homepage || '';
                              const preload = new Image();
                              preload.src = REPOS[idx].liveUrl ? 
                                  'https://api.microlink.io?url=' + encodeURIComponent(REPOS[idx].liveUrl) + '&screenshot=true&meta=false&embed=screenshot.url' : 
                                  'https://opengraph.githubassets.com/1/LiashRoy/' + REPOS[idx].name;
                          }
                      } catch(e) { }
                  }));
              } catch(e) { console.error("Total failure fetching repos", e); }
          }
          loadGithubRepos();
;

content = content.replace('// =============== MODAL ===============', fixedCode + '\n          // =============== MODAL ===============');

fs.writeFileSync('index.html', content);
console.log('Fixed index.html!');
