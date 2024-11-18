import axios from 'axios';
import backgroundImage from './images/background.png';

export async function fetchCityImage(cityName) {
  const URL = 'https://pixabay.com/api/';
  const requestParameters = `?image_type=photo&category=travel&orientation=horizontal&q=${encodeURIComponent(
    cityName
  )}&page=1&per_page=40&key=40060920-6840b24aaee2d2997514145f9`;

  try {
    const response = await axios.get(URL + requestParameters);
    const data = response.data;

    if (data.hits && data.hits.length) {
      const randomImgIndex = Math.floor(Math.random() * data.hits.length);
      return data.hits[randomImgIndex].largeImageURL;
    } else {
      console.warn('No images found for this city, using a fallback image.');
      alert('No images found for this city, using a fallback image.');
      return backgroundImage;
    }
  } catch (error) {
    console.error('Error fetching city image:', error);
    return backgroundImage; // Fallback image in case of error
  }
}
