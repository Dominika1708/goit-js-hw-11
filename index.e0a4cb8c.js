const e=document.querySelector(".pagination__list"),t=document.querySelector("#search-form"),a=document.querySelector("input"),n=document.querySelector(".film-list");let s=1;const i=async e=>{const t=await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=18cc3ec683925dedb66d3e6092890eaa&page=${e}`);return await t.json()},l=async(e,t)=>{const a=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=18cc3ec683925dedb66d3e6092890eaa&language=pl-PL&query=${e}&page=${t}&include_adult=false`);return await a.json()};function c(t,a){let n,s="",i=a-1,l=a+1;a>1&&(s+=`<li class="btn prev" data-page="${a-1}" onclick="changePage(totalPages, ${a-1})"><span>&#8592</span></li>`),a>2&&(s+='<li class="num" data-page="1" onclick="changePage(totalPages, 1)"><span>1</span></li>',a>3&&(s+='<li class="dots"><span>...</span></li>')),a===t?i-=2:a===t-1&&(i-=1),1===a?l+=2:2===a&&(l+=1);for(let e=i;e<=l;e++)e>t||(0===e&&e++,n=a===e?"active":"",s+=`<li class="num ${n}" data-page="${e}" onclick="changePage(totalPages, ${e})"><span>${e}</span></li>`);a<t-1&&(a<t-3&&(s+='<li class="dots"><span>...</span></li>'),s+=`<li class="num" data-page="${t}" onclick="changePage(totalPages, ${t})"><span>${t}</span></li>`),a<t&&(s+=`<li class="btn next" data-page="${a+1}" onclick="changePage(totalPages, ${a+1})"><span>&#8594</span></li>`),1===t&&(s='<li class="btn prev"><span>&#8592</span></li>\n          <li class="num active"><span>1</span></li>\n          <li class="btn next"><span>&#8594</span></li>'),e.innerHTML=s}const o=e=>{const t=e.results.map((e=>`<div class="single-film">\n            <img class="film-image" src="https://image.tmdb.org/t/p/w400/${e.poster_path}"\n                alt="${e.title}">\n            <div class="film-info">\n                <p class="film-title">${e.title}</p>\n                <div class="film-subinfo">\n                    <p>Gatunek z API</p>\n                    <p>${e.release_date}</p>\n                </div>\n            </div>\n        </div>`)).join("");n.innerHTML=t};i(s).then((t=>{o(t),c(t.total_pages,s),e.addEventListener("click",(e=>{s=Number(e.target.textContent),console.log(e.target.dataset.page),i(s).then((e=>{o(e),c(e.total_pages,s)}))}))})),e.removeEventListener("submit",{}),t.addEventListener("submit",(t=>{let r=a.value.trim();t.preventDefault(),n.innerHTML="",e.innerHTML="",s=1;try{return""===r&&(n.innerHTML="",e.innerHTML=""),l(r,s).then((t=>{if(0===t.total_results)return alert("there are no movies with this title, here are the popular movies of the moment"),i(s).then((t=>{o(t),c(t.total_pages,s),e.addEventListener("click",(e=>{s=Number(e.target.dataset.number),i(s).then((e=>{o(e),c(e.total_pages,s)}))})),e.removeEventListener("submit",{})}));t.total_results>0&&(o(t),c(t.total_pages,s),e.addEventListener("click",(e=>{s=Number(e.target.dataset.number),l(r,s).then((e=>{o(e),c(e.total_pages,s)}))})),e.removeEventListener("submit",{}))}))}catch(e){console.log(e.message)}}));
//# sourceMappingURL=index.e0a4cb8c.js.map
