import { $token } from '@/stores/user';
import axios from 'axios';
import { API_URL } from './API_URL';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = $token.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

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
  window.location.href = '/';
};

const getDirectoryName = async (id) => {
  try {
    const response = await instance.get('/getDirectoryName/' + id);
    if (response.data?.Ok !== undefined) {
      return response.data.Ok;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getParentDirectory = async (id: Number) => {
  try {
    const response = await instance.get('/getParentDirectory/' + id);
    if (response.data?.Ok !== undefined) {
      return response.data.Ok;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getFileInfo = async (id: Number) => {
  try {
    const response = await instance.get('/info/' + id);
    if (response.data?.Ok !== undefined) {
      return JSON.parse(response.data.Ok);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getMe = async () => {
  try {
    const response = await instance.get('/me');
    if (response.data?.Ok !== undefined) {
      return response.data.Ok;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export { instance, logout, getDirectoryName, getParentDirectory, getFileInfo, getMe };
