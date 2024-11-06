import backgroundImage from './images/background.png';

export function fetchCityImage(cityName) {
  const URL = 'https://pixabay.com/api/';
  const requestParameters = `?image_type=photo&category=travel&orientation=horizontal&q=${encodeURIComponent(
    cityName
  )}&page=1&per_page=40`;

  return fetch(URL + requestParameters + '&' + process.env.BACKGROUND)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(image => {
      if (image.hits && image.hits.length) {
        const randomImg = Math.floor(Math.random() * image.hits.length);
        return image.hits[randomImg].largeImageURL; // Use webformatURL for faster loading
      } else {
        console.warn('No images found for this city, using a fallback image.');
        return backgroundImage; // Return a fallback image URL
      }
    });
}
