import axios from 'axios';

const API_KEY = '35664571-75b29dbb0058a8cd226bd52d4';
const URL = 'https://pixabay.com/api/';

export default async function getImgs(searchValue) {
  let page = 1;

  try {
    const response = await axios.get(
      `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
    );
    const { hits } = response.data;

    return hits;
  } catch (error) {
    return error;
  }
}
