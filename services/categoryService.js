import axios from 'axios';

export const fetchCategories = async () => {
  const response = await axios.get('/api/cat/');
  return response.data;
};
