import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api';

const KEY_API_PIXABAY = '29314953-9960e0c1117cd8f48e1da89de';

export const getImages = async (query, page) => {
    const response = await axios.get(`/?q=${query}&page=${page}&key=${KEY_API_PIXABAY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data.hits;
};