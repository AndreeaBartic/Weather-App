!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},n={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in a)return a[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return a[e]=r,t.call(r.exports,r,r.exports),r.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,t){n[e]=t},t.parcelRequired7c6=r);var d=r("bpxeT"),i=r("2TvXO"),c="07aed853a2b3116bf7e19dfeee63b968",o="";function s(){return(s=e(d)(e(i).mark((function t(){var a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o="https://api.openweathermap.org/data/2.5/forecast?q=".concat(city,"&appid=").concat(c,"&units=metric"),e.prev=1,e.next=4,fetch(o);case 4:return a=e.sent,e.next=7,a.json();case 7:u(e.sent),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.error("Error fetching weather data:",e.t0);case 14:case"end":return e.stop()}}),t,null,[[1,11]])})))).apply(this,arguments)}function u(e){var t=document.getElementById("weather-forecast");t.innerHTML="";var a,n,r={},d=new Date;for(var i in d.setDate(d.getDate()+1),e.list.forEach((function(e){var t=new Date(1e3*e.dt),a=t.toDateString();t>=d&&(r[a]||(r[a]=[]),r[a].push(e))})),r){document.createElement("div").classList.add("weather-forecast-item");var c=r[i][0],o=document.createElement("div");o.classList.add("all-about");var s=document.createElement("div");s.classList.add("day"),s.innerHTML='<div class="day-name">'.concat((a=c.dt,n=void 0,void 0,n=new Date(1e3*a),["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][n.getDay()]),'</div> <div class="date">').concat(l(new Date(1e3*c.dt)),"</div>"),o.appendChild(s);var u=document.createElement("img");u.classList.add("w-icon");var p=c.weather[0].icon,v="https://openweathermap.org/img/wn/".concat(p,"@2x.png");u.src=v,u.alt="weather-icon",o.appendChild(u);var m=document.createElement("div");m.classList.add("temperature");var f=Math.round(c.main.temp_min),h=Math.round(c.main.temp_max);m.innerHTML='<div class="temperature__deg"><div class="temperature__design">min</div>\n                    <div class="temperature__data"> '.concat(f,'&deg;C</div></div><span class="temperature__line"></span><div class="temperature__deg"><div class="temperature__design" > max</div>\n                <div class="temperature__data"> ').concat(h,"&deg;C</div></div>"),o.appendChild(m);var y=document.createElement("button");y.classList.add("more-btn"),y.innerHTML="more info",o.appendChild(y),t.appendChild(o)}}function l(e){return e.toLocaleDateString("en-US",{month:"short",day:"numeric"})}var p=document.querySelector(".search-bar_input");p.addEventListener("input",(function(){city=p.value})),function(){s.apply(this,arguments)}()}();
//# sourceMappingURL=index.99aea74d.js.map
