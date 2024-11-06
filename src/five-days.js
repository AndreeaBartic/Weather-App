const apiKey = '07aed853a2b3116bf7e19dfeee63b968';

function updateForecast(data) {
  const forecastItems = document.getElementById('weather-forecast');
  forecastItems.innerHTML = '';

  const dayMap = {};

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toDateString();

    if (date >= tomorrow) {
      if (!dayMap[day]) {
        dayMap[day] = [];
      }

      dayMap[day].push(item);
    }
  });

  for (const day in dayMap) {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('weather-forecast-item');
    const firstItem = dayMap[day][0];
    const allInfo = document.createElement('div');
    allInfo.classList.add('all-about');
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.innerHTML = `<div class="day-name">${getDayOfWeek(
      firstItem.dt
    )}</div> <div class="date">${formatDate(
      new Date(firstItem.dt * 1000)
    )}</div>`;
    allInfo.appendChild(dayElement);

    const iconElement = document.createElement('img');

    iconElement.classList.add('w-icon');

    const iconCode = firstItem.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    iconElement.src = iconUrl;
    iconElement.alt = 'weather-icon';

    allInfo.appendChild(iconElement);

    const temperatureElement = document.createElement('div');
    temperatureElement.classList.add('temperature');

    const minTemp = Math.round(firstItem.main.temp_min);
    const maxTemp = Math.round(firstItem.main.temp_max);
    temperatureElement.innerHTML = `<div class="temperature__deg"><div class="temperature__design">min</div>
                    <div class="temperature__data"> ${minTemp}&deg;C</div></div><span class="temperature__line"></span><div class="temperature__deg"><div class="temperature__design" > max</div>
                <div class="temperature__data"> ${maxTemp}&deg;C</div></div>`;
    allInfo.appendChild(temperatureElement);
    const moreButton = document.createElement('button');
    moreButton.classList.add('more-btn');
    moreButton.innerHTML = 'more info';
    allInfo.appendChild(moreButton);
    forecastItems.appendChild(allInfo);
  }
}

function getDayOfWeek(timestamp) {
  const date = new Date(timestamp * 1000);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return daysOfWeek[date.getDay()];
}

function formatDate(date) {
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

const fiveDaysButton = document.querySelector('.five-days');
const cancelButton = document.querySelector('.today-btn');
const futureForecastSection = document.querySelector('.future-forecast');
const todayEl = document.querySelector('.dateDisplay-container');
// const moreInfo = document.querySelector('.more-btn');
const daySection = document.querySelector('.days');
const todayBtn = document.querySelector('.today-btn');
const todaySection = document.querySelector('.today-weather');
const buttons = document.querySelector('.buttons');

fiveDaysButton.addEventListener('click', e => {
  e.preventDefault();
  fiveDaysButton.style.background = 'white';
  buttons.style.marginTop = '250px';
  todayBtn.style.background = 'rgba(255, 255, 255, 0.5)';
  todaySection.style.display = 'none';
  futureForecastSection.style.display = 'flex';
  futureForecastSection.style.backgroundColor = '#102136cc';
  todayEl.style.display = 'none';
  // daySection.style.display = 'flex';
});

cancelButton.addEventListener('click', function () {
  futureForecastSection.style.display = 'none';
  todayEl.style.display = 'flex';
});

export async function fetchWeatherData(city) {
  if (!city || city.trim() === '') {
    console.error('Error: City name is required for fetching weather data.');
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    document.querySelector('.future-forecast__city-name').textContent =
      data.city.name;
    if (data && data.list) {
      updateForecast(data);
    } else {
      console.error("Error: 'list' property not found in API response", data);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
