function e(e){const t=`?image_type=photo&category=travel&orientation=horizontal&q=${encodeURIComponent(e)}&page=1&per_page=40`;return fetch("https://pixabay.com/api/"+t+"&key=40060920-6840b24aaee2d2997514145f9").then((e=>{if(!e.ok)throw new Error("Network response was not ok");return e.json()})).then((e=>{if(e.hits&&e.hits.length){const t=Math.floor(Math.random()*e.hits.length);return e.hits[t].largeImageURL}throw new Error("No images found.")}))}function t(e){e?fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=384cfe62d8b3ed2e8a555db347025eef`).then((e=>e.json())).then((e=>{if(200===e.cod){const t=new Date(1e3*e.sys.sunrise).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1}),o=new Date(1e3*e.sys.sunset).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1}),n=document.getElementById("sunriseDisplay"),r=document.getElementById("sunsetDisplay");n.textContent=`${t}`,r.textContent=`${o}`}else console.error("Error fetching data for city:",e.message)})).catch((e=>console.error("Error fetching data from OpenWeatherMap:",e))):console.error("City name is missing.")}function o(e){const t=new Date,o=e+t.getTimezoneOffset()/60;let n=t.getHours()+o;n=(n+24)%24;const r=String(n).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0"),i=String(t.getSeconds()).padStart(2,"0");document.querySelector(".dateDisplay__hour").textContent=`${r}:${a}:${i}`}var n={};!function(){const e=new Date,t=document.getElementById("dayDisplay"),o=document.getElementById("monthDisplay"),n=document.getElementById("timeDisplay"),r=document.getElementById("sunriseDisplay"),a=document.getElementById("sunsetDisplay"),i=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][e.getDay()],c=["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()],s=e.getDate(),d=e.getHours(),l=e.getMinutes(),u=e.getSeconds(),g=`${d.toString().padStart(2,"0")}:${l.toString().padStart(2,"0")}:${u.toString().padStart(2,"0")}`,h=m(s);function m(e){if(e>=11&&e<=13)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}t.textContent=`${s}${h} ${i}`,o.textContent=`${c}`,n.textContent=g,navigator.geolocation&&navigator.geolocation.getCurrentPosition((e=>{const{latitude:o,longitude:n}=e.coords;fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${o}&lon=${n}&appid=384cfe62d8b3ed2e8a555db347025eef`).then((e=>e.json())).then((e=>{const o=`\n          <h3>${s}<sup class="exponent">${m(s)}</sup> ${i}</h3>\n        `;t.innerHTML=o;const n=new Date(1e3*e.sys.sunrise).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1}),c=new Date(1e3*e.sys.sunset).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1});r.textContent=`${n}`,a.textContent=`${c}`})).catch((e=>console.error("Error fetching data from OpenWeatherMap:",e)))}))}();document.addEventListener("DOMContentLoaded",(function(){console.log("DOMContentLoaded fired");const r=document.querySelector(".search-bar"),a=document.querySelector(".search-bar_input"),i=document.querySelector(".search-bar_favorites-icon"),c=document.querySelector(".favorites_list"),s=document.querySelector(".favorites_prev-btn"),d=document.querySelector(".favorites_next-btn");r.addEventListener("submit",(function(e){e.preventDefault();const t=a.value.trim();t&&l(t)})),i.addEventListener("click",(function(){const e=a.value.trim();this.classList.toggle("selected"),e&&!function(e){const t=c.querySelectorAll(".favorites_item");for(let o of t)if(o.textContent.trim().toLowerCase()===e.toLowerCase())return!0;return!1}(e)&&function(e){const t=document.createElement("li");t.classList.add("favorites_item"),t.textContent=e;const o=document.createElement("span");o.classList.add("close-button"),o.textContent="x",o.addEventListener("click",(function(){t.remove()})),t.appendChild(o),c.appendChild(t)}(e)}));function l(n){fetch(`https://api.openweathermap.org/data/2.5/weather?q=${n}&appid=07aed853a2b3116bf7e19dfeee63b968`).then((e=>e.json())).then((r=>{200===r.cod?e(n).then((e=>{console.log("Fetched Image URL:",e),document.body.style.backgroundImage=`url(${e})`,document.body.style.backgroundSize="cover",document.body.style.backgroundPosition="center",document.body.style.backgroundRepeat="no-repeat";const a=r.timezone/3600;document.body.style.height="954px",t(n),o(a)})).catch((e=>{console.error("Error fetching city image:",e)})):alert(r.message)})).catch((e=>{console.error("Error fetching weather data:",e)}))}s.addEventListener("click",(function(){c.scrollBy({left:-100,top:0,behavior:"smooth"})})),d.addEventListener("click",(function(){c.scrollBy({left:100,top:0,behavior:"smooth"})})),(0,n.displayCurrentTime)();(()=>{console.log("findCityLocation called");const e=e=>{console.log("Location access allowed");const t=e.coords.latitude,o=e.coords.longitude;fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${t}&lon=${o}&appid=07aed853a2b3116bf7e19dfeee63b968`).then((e=>e.json())).then((e=>{if(e&&e.length>0){const t=e[0].name;console.log("Resolved City:",t),l(t)}else console.error("City not found.")})).catch((e=>{console.error("Error fetching city name:",e)}))},t=()=>{console.error("Could not get location.")};navigator.geolocation.getCurrentPosition(e,t);document.querySelector(".search-bar_location-icon").addEventListener("click",(()=>{console.log("Location icon clicked"),navigator.geolocation.getCurrentPosition(e,t)}))})()}));
//# sourceMappingURL=index.d1211c17.js.map
