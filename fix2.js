const fs = require('fs');
let content = fs.readFileSync('index_step_288.html', 'utf8');

const newFetcher = 
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
                              repo: repo,
                              description: desc ? desc.textContent.trim() : 'No description provided.',
                              language: langNode ? langNode.textContent.trim() : 'Unknown',
                              languageColor: colorNode ? colorNode.style.backgroundColor : '#58a6ff',
                              stars: starsNode ? parseInt(starsNode.textContent.trim().replace(/,/g, '')) || 0 : 0,
                              forks: forksNode ? parseInt(forksNode.textContent.trim().replace(/,/g, '')) || 0 : 0,
                              link: 'https://github.com/LiashRoy/' + repo
                          };
                      });
                      
                      if (pinnedData.length === 0) throw new Error("No pinned items found");
                  } catch(err) {
                      console.warn("Direct scraping failed, using exact fallback order:", err);
                      pinnedData = [
                          { repo: 'whitequest-credflow', description: 'A custom frontend implementation connecting to credflow APIs.', language: 'JavaScript', languageColor: '#f1e05a', stars: 0, forks: 0, link: 'https://github.com/LiashRoy/whitequest-credflow' },
                          { repo: 'tranchechain', description: 'Blockchain related project implementation and experiments.', language: 'JavaScript', languageColor: '#f1e05a', stars: 0, forks: 0, link: 'https://github.com/LiashRoy/tranchechain' },
                          { repo: 'yt-music-sorter', description: 'A tool to sort and manage YouTube Music playlists efficiently.', language: 'JavaScript', languageColor: '#f1e05a', stars: 0, forks: 0, link: 'https://github.com/LiashRoy/yt-music-sorter' },
                          { repo: 'cred-fintech-clone', description: 'UI/UX clone of the popular fintech application Cred.', language: 'HTML', languageColor: '#e34c26', stars: 0, forks: 0, link: 'https://github.com/LiashRoy/cred-fintech-clone' },
                          { repo: 'Vivo-MRA-Dashboard-', description: 'Dashboard application for tracking and analytics.', language: 'TypeScript', languageColor: '#3178c6', stars: 0, forks: 0, link: 'https://github.com/LiashRoy/Vivo-MRA-Dashboard-' }
                      ];
                  }
;

// In index_step_288, the old fetcher was:
// const pRes = await fetch('https://gh-pinned-repos.egoist.dev/?username=LiashRoy');
// let pinnedData = [];
// ...
// pinnedData = fbData.map(r => ({ repo: r.name }));
// }

const oldFetcherRegex = /const pRes = await fetch\('https:\/\/gh-pinned-repos\.egoist\.dev\/\?username=LiashRoy'\);[\s\S]*?pinnedData = fbData\.map\(r => \(\{ repo: r\.name \}\)\);\s*\}/;

content = content.replace(oldFetcherRegex, newFetcher);

fs.writeFileSync('index.html', content);
console.log('Fixed index.html perfectly based on step 288!');
