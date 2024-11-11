const apiKey = '07aed853a2b3116bf7e19dfeee63b968';

import axios from 'axios';

const cardsContainer = document.querySelector('.days');
if (!cardsContainer) {
  console.error('Elementul .days nu a fost găsit în DOM.');
}

const svgContainer = document.getElementById('svg-container');
if (!svgContainer) {
  console.error('Elementul #svg-container nu a fost găsit în DOM.');
}

function getWeatherIconName(weatherCondition) {
  switch (weatherCondition) {
    case 'Clouds':
      return 'icon-cloudy';
    case 'Clear':
      return 'icon-sun';
    case 'Snow':
      return 'icon-snow';
    case 'Clouds_sun':
      return 'icon-clouds-and-sun';
    default:
      return 'icon-weather';
  }
}

function createWeatherCard(
  time,
  temperature,
  pressureInMmHg,
  humidity,
  windSpeed,
  weatherCondition
) {
  const weatherIconName = getWeatherIconName(weatherCondition);
  if (!weatherIconName) {
    console.error(
      'Icona meteo nu a fost găsită pentru condiția:',
      weatherCondition
    );
    return null;
  }

  const card = document.createElement('div');
  card.classList.add('weather-card');
  card.innerHTML = `
    <div class="weather-card__time">
      <h2 class="weather-card__time-hour">${time}</h2>
      <svg class="weather-card__time-icon">
        <use href="#${weatherIconName}"></use>
      </svg>
      <h1 class="weather-card__time-temp">${temperature}</h1>
    </div>
    <div class="weather-card__details">
      <div class="weather-card__barometer">
        <svg class="weather-card__details-icons">
          <use href="#icon-barometer"></use>
        </svg>
        <p class="weather-card__details-text">${pressureInMmHg}</p>
      </div>
      <div class="weather-card__humidity">
        <svg class="weather-card__details-icons">
          <use href="#icon-humidity"></use>
        </svg>
        <p class="weather-card__details-text">${humidity}</p>
      </div>
      <div class="weather-card__wind">
        <svg class="weather-card__details-icons">
          <use href="#icon-wind"></use>
        </svg>
        <p class="weather-card__details-text">${windSpeed}</p>
      </div>
    </div>
  `;
  return card;
}

function convertPressureToMmHg(pressureInhPa) {
  return (pressureInhPa * 0.75006375541921).toFixed(2);
}

export async function fetchHourWeather(cityName) {
  if (!cityName) {
    console.error('Numele orașului nu este definit.');
    return;
  }

  try {
    const hourlyData = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
    );

    const next7HoursData = hourlyData.data.list.slice(0, 7);
    cardsContainer.innerHTML = '';
    next7HoursData.forEach(hourData => {
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

      const hourCard = createWeatherCard(
        hourTime,
        hourTemperature,
        hourPressureInMmHg,
        hourHumidity,
        hourWindSpeed,
        weatherCondition
      );

      if (hourCard) {
        cardsContainer.appendChild(hourCard);
      }
    });
  } catch (error) {
    console.error('Eroare la obținerea datelor meteo:', error);
    alert('Eroare la obținerea datelor meteo:', error);
  }
}
