const API_KEY = '07aed853a2b3116bf7e19dfeee63b968';

const API_URL_BASE =
  'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';

const todayBtn = document.querySelector('.today-btn');
const fiveDaysBtn = document.querySelector('.five-days');

export async function todayWeather(cityName) {
  try {
    const response = await fetch(`${API_URL_BASE}${cityName}&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const today = new Date().toDateString();
    const todayTemps = data.list.filter(item => {
      const itemDate = new Date(item.dt * 1000).toDateString();
      return itemDate === today;
    });

    const minTemp = Math.round(
      Math.min(...todayTemps.map(item => item.main.temp_min))
    );
    const maxTemp = Math.round(
      Math.max(...todayTemps.map(item => item.main.temp_max))
    );

    document.querySelector('.hero-weather__city').textContent = data.city.name;
    document.querySelector('.hero-weather__degrees').textContent =
      Math.round(data.list[0].main.temp) + '°';
    document.querySelector('.values__min h5').textContent = minTemp + '°';
    document.querySelector('.values__max h5').textContent = maxTemp + '°';

    const heroWeatherIcon = document.querySelector('.hero-weather');
    const existingIcon = document.querySelector('.hero-weather__emoji');
    if (existingIcon) {
      heroWeatherIcon.removeChild(existingIcon);
    }
    let iconToday = document.createElement('img');
    iconToday.classList.add('hero-weather__emoji');
    const iconApi = data.list[0].weather[0].icon;
    const iconLink = `https://openweathermap.org/img/wn/${iconApi}@2x.png`;
    iconToday.src = iconLink;
    iconToday.alt = data.list[0].weather[0].description;
    heroWeatherIcon.prepend(iconToday);
  } catch (error) {
    console.error('There was an error fetching the weather data:', error);
  }
}

todayBtn.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.buttons').style.marginRight = '0';
  document.querySelector('.buttons').style.marginTop = '10px';
  document.querySelector('.days').style.display = 'none';
  todayBtn.style.background = 'white';
  fiveDaysBtn.style.background = 'rgba(255, 255, 255, 0.5)';
  document.querySelector('.today-weather').style.display = 'flex';
});
