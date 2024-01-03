import axios from 'axios';

const PROVIDER_API_URL = 'http://localhost:3000/products';

export async function getProducts() {
  try {
    const response = await axios.get(PROVIDER_API_URL);
    console.log('Received data from provider:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

getProducts();