const apiKey = '07aed853a2b3116bf7e19dfeee63b968';

import axios from 'axios';
import barometerIcon from './images/005-barometer.svg';
import windIcon from './images/003-wind.svg';
import humidityIcon from './images/004-humidity.svg';

const cardsContainer = document.querySelector('.days');
if (!cardsContainer) {
  console.error('Elementul .days nu a fost găsit în DOM.');
}

// Convert pressure from hPa to mmHg
function convertPressureToMmHg(pressureInhPa) {
  return (pressureInhPa * 0.75006375541921).toFixed(2);
}

// Process a single hour of weather data
function processHourlyData(hourData) {
  const date = new Date(hourData.dt * 1000);
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return {
    time: `${hour.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`,
    temperature: `${Math.round(hourData.main.temp)}°C`,
    pressure: `${convertPressureToMmHg(hourData.main.pressure)} mm`,
    humidity: `${hourData.main.humidity} %`,
    windSpeed: `${hourData.wind.speed} m/s`,
    weatherCondition: hourData.weather[0].main,
    iconUrl: `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`,
  };
}

// Create a weather card for hourly data
function createWeatherCard(hourData) {
  const {
    time,
    temperature,
    pressure,
    humidity,
    windSpeed,
    iconUrl,
    weatherCondition,
  } = hourData;

  const card = document.createElement('div');
  card.classList.add('weather-card');
  card.innerHTML = `
    <div class="weather-card__time">
      <h2 class="weather-card__time-hour">${time}</h2>
      <img src="${iconUrl}" alt="${weatherCondition}" class="weather-card__time-icon" />
      <h1 class="weather-card__time-temp">${temperature}</h1>
    </div>
    <div class="weather-card__details">
      <div class="weather-card__barometer">
        <img class="weather-card__icon" src=${barometerIcon} alt="barometer"/> 
        <p class="weather-card__details-text">${pressure}</p>
      </div>
      <div class="weather-card__humidity">
        <img class="weather-card__icon" src=${humidityIcon} alt="humidity"/>
        <p class="weather-card__details-text">${humidity}</p>
      </div>
      <div class="weather-card__wind">
        <img class="weather-card__icon" src=${windIcon} alt="wind"/>
        <p class="weather-card__details-text">${windSpeed}</p>
      </div>
    </div>
  `;
  return card;
}

// Fetch hourly weather for the selected city
export async function fetchHourWeather(cityName) {
  if (!cityName) {
    console.error('Numele orașului nu este definit.');
    return;
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
    );

    const next7HoursData = response.data.list.slice(0, 7);
    cardsContainer.innerHTML = ''; // Clear previous cards

    next7HoursData.forEach(hourData => {
      const processedData = processHourlyData(hourData);
      const hourCard = createWeatherCard(processedData);

      if (hourCard) {
        cardsContainer.appendChild(hourCard);
      }
    });
  } catch (error) {
    console.error('Eroare la obținerea datelor meteo:', error);
    alert('Eroare la obținerea datelor meteo:', error);
  }
}

// Display hourly weather for a specific day
export function displayDailyWeather(data) {
  const forecastContainer = document.getElementById('weather-forecast');
  forecastContainer.innerHTML = ''; // Clear previous daily cards

  const groupedByDay = data.list.reduce((days, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!days[date]) days[date] = [];
    days[date].push(item);
    return days;
  }, {});

  Object.entries(groupedByDay).forEach(([day, hourlyData]) => {
    const minTemp = Math.min(...hourlyData.map(d => d.main.temp_min));
    const maxTemp = Math.max(...hourlyData.map(d => d.main.temp_max));
    const dayIconCode = hourlyData[0].weather[0].icon;
    const dayIconUrl = `http://openweathermap.org/img/wn/${dayIconCode}@2x.png`;

    const dayCard = document.createElement('div');
    dayCard.classList.add('daily-card');
    dayCard.innerHTML = `
      <h3>${day}</h3>
      <img src="${dayIconUrl}" alt="Daily weather icon" class="daily-weather-icon">
      <p>Min: ${Math.round(minTemp)}°C</p>
      <p>Max: ${Math.round(maxTemp)}°C</p>
      <button class="more-info-btn">More Info</button>
    `;

    const moreInfoButton = dayCard.querySelector('.more-info-btn');
    moreInfoButton.addEventListener('click', () => {
      // Afisăm datele orare pentru acea zi
      displayHourlyWeather(hourlyData);
    });

    forecastContainer.appendChild(dayCard);
  });
}

export function displayHourlyWeather(hourlyData) {
  cardsContainer.innerHTML = ''; // Clear previous cards

  hourlyData.forEach(hourData => {
    const processedData = processHourlyData(hourData);
    const hourCard = createWeatherCard(processedData);

    if (hourCard) {
      cardsContainer.appendChild(hourCard);
    }
  });

  cardsContainer.style.display = 'flex'; // Ensure the container is visible
}

function processHourlyData(hourData) {
  const date = new Date(hourData.dt * 1000);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const hourTime = `${hour.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
  const hourTemperature = `${Math.round(hourData.main.temp)}°C`;
  const hourPressureInMmHg = `${convertPressureToMmHg(
    hourData.main.pressure
  )} mm`;
  const hourHumidity = `${hourData.main.humidity} %`;
  const hourWindSpeed = `${hourData.wind.speed} m/s`;
  const weatherCondition = hourData.weather[0].main;
  const weatherIconCode = hourData.weather[0].icon;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

  return {
    hourTime,
    hourTemperature,
    hourPressureInMmHg,
    hourHumidity,
    hourWindSpeed,
    weatherCondition,
    weatherIconUrl,
  };
}

function createWeatherCard({
  hourTime,
  hourTemperature,
  hourPressureInMmHg,
  hourHumidity,
  hourWindSpeed,
  weatherIconUrl,
  weatherCondition,
}) {
  const card = document.createElement('div');
  card.classList.add('weather-card');
  card.innerHTML = `
    <div class="weather-card__time">
      <h2 class="weather-card__time-hour">${hourTime}</h2>
      <img src="${weatherIconUrl}" alt="${weatherCondition}" class="weather-card__time-icon" />
      <h1 class="weather-card__time-temp">${hourTemperature}</h1>
    </div>
    <div class="weather-card__details">
      <div class="weather-card__barometer">
        <img class="weather-card__icon" src=${barometerIcon} alt="barometer"/> 
        <p class="weather-card__details-text">${hourPressureInMmHg}</p>
      </div>
      <div class="weather-card__humidity">
        <img class="weather-card__icon" src=${humidityIcon} alt="humidity"/>
        <p class="weather-card__details-text">${hourHumidity}</p>
      </div>
      <div class="weather-card__wind">
        <img class="weather-card__icon" src=${windIcon} alt="wind"/>
        <p class="weather-card__details-text">${hourWindSpeed}</p>
      </div>
    </div>
  `;
  return card;
}
