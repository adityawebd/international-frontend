import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('/api/product');
  return response.data;
};
