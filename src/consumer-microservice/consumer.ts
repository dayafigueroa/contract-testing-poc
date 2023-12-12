import axios from 'axios';

const PROVIDER_API_URL = 'http://localhost:3000/data';

export async function fetchDataFromProvider() {
  try {
    // let response;
    // if (!url) {
    const response = await axios.get(PROVIDER_API_URL);
    // }else {
    //   response = await axios.get(url);
    // }
    console.log('Received data from provider:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchDataFromProvider();
