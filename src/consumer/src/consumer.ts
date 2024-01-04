import axios from 'axios';

export class API {
public url: string;
  constructor(url?: string ) {
    this.url = url || 'http://localhost:3000';
  }

   async getProducts() {
    try {
      const response = await axios.get(`${this.url}/products`);
      console.log('Received data from provider:', response.data);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async getProduct(id: number) {
    try {
    const response = await axios.get(`${this.url}/products/${id}`)
    console.log('Received data from provider:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

}
