import axios from 'axios';
import { Products } from 'src/components/models/product';

const API_BASE_URL = 'https://dummyjson.com';

/**
 * Fetches products from the API.
 * @returns Promise<Products> A promise that resolves to the fetched products.
 * @throws Error if there's an issue fetching the products.
 */
export const fetchProducts = async () => {
  try {
    const response = await axios.get<Products>(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
