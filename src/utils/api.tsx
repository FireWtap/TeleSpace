import { $token } from '@/stores/user';
import axios from 'axios';
import { API_URL } from './API_URL';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${$token.get()}`, //Assume that this cannot be called from routes where the user is required to be logged in but he's not
    'Content-Type': 'multipart/form-data',
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  }
);

const logout = () => {
  $token.set('');
};

export { instance, logout };
