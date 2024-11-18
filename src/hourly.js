const apiKey = '07aed853a2b3116bf7e19dfeee63b968';

import axios from 'axios';
import barometerIcon from './images/svg/005-barometer.svg';
import windIcon from './images/svg/003-wind.svg';
import humidityIcon from './images/svg/004-humidity.svg';

const cardsContainer = document.querySelector('.days');
if (!cardsContainer) {
  console.error(error);
}

function convertPressureToMmHg(pressureInhPa) {
  return Math.round(pressureInhPa * 0.75006375541921);
}

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
    cardsContainer.innerHTML = '';

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

export function displayHourlyWeather(hourlyData) {
  cardsContainer.innerHTML = '';

  hourlyData.forEach(hourData => {
    const processedData = processHourlyData(hourData);
    const hourCard = createWeatherCard(processedData);

    if (hourCard) {
      cardsContainer.appendChild(hourCard);
    }
  });

  cardsContainer.style.display = 'flex';
}
