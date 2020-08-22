import axios from 'axios';
import { SearchPayload } from './store/items/action';

export const fetchItems = async (payload: SearchPayload): Promise<any> => {
  const data = await axios
    .get('/api/v1/search', { params: payload })
    .catch((error) => {
      console.log('fetchItems error ', error);
      return Promise.reject(error);
    });
  return Promise.resolve(data);
};
