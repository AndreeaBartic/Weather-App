!function(){function e(e){var t="https://api.unsplash.com/search/photos?query=".concat(e,"&client_id=").concat("3eLdLI3McT-xMd_k4uMgU6VIED8TAquFAmIAMFjfgHU","&per_page=1");return fetch(t).then((function(e){return e.json()})).then((function(e){if(e&&e.results&&e.results.length>0)return e.results[0].urls.full;throw new Error("No image found for the given city.")}))}document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector(".search-bar"),n=document.querySelector(".search-bar_input"),r=document.querySelector(".search-bar_favorites-icon"),o=document.querySelector(".favorites_list"),c=document.querySelector(".favorites_prev-btn"),a=document.querySelector(".favorites_next-btn");t.addEventListener("submit",(function(t){t.preventDefault();var r=n.value.trim();r&&function(t){var n="07aed853a2b3116bf7e19dfeee63b968",r="https://api.openweathermap.org/data/2.5/weather?q=".concat(t,"&appid=").concat(n);fetch(r).then((function(e){return e.json()})).then((function(n){200===n.cod?e(t).then((function(e){document.body.style.backgroundImage="url(".concat(e,")"),document.body.style.backgroundSize="cover",document.body.style.backgroundPosition="center",document.body.style.backgroundRepeat="no-repeat"})).catch((function(e){console.error("Error fetching city image:",e)})):alert(n.message)})).catch((function(e){console.error("Error fetching weather data:",e)}))}(r)})),r.addEventListener("click",(function(){var e=n.value.trim();this.classList.toggle("selected"),e&&!function(e){var t=o.querySelectorAll(".favorites_item"),n=!0,r=!1,c=void 0;try{for(var a,i=t[Symbol.iterator]();!(n=(a=i.next()).done);n=!0){if(a.value.textContent.trim().toLowerCase()===e.toLowerCase())return!0}}catch(e){r=!0,c=e}finally{try{n||null==i.return||i.return()}finally{if(r)throw c}}return!1}(e)&&function(e){var t=document.createElement("li");t.classList.add("favorites_item"),t.textContent=e;var n=document.createElement("span");n.classList.add("close-button"),n.textContent="x",n.addEventListener("click",(function(){t.remove()})),t.appendChild(n),o.appendChild(t)}(e)}));c.addEventListener("click",(function(){o.scrollBy({left:-100,top:0,behavior:"smooth"})})),a.addEventListener("click",(function(){o.scrollBy({left:100,top:0,behavior:"smooth"})}))}))}();
//# sourceMappingURL=index.216593ee.js.map
