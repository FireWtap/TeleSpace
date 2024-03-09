import { $token } from '@/stores/user';
import { API_URL } from '@/utils/API_URL';
import axios from 'axios';
import Cookies from 'universal-cookie';

const loginHandler = async (values: { email: string; password: string }, remember: boolean) => {
  try {
    console.log(values);
    const response = await axios.post(
      `${API_URL}/login`,
      {
        email: values.email,
        password_hash: values.password,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log(response);
    if (response?.data?.Ok) {
      $token.set(response.data.Ok);

      if (remember) {
        const cookies = new Cookies();
        cookies.set('token', response.data.Ok, { path: '/' });
      }

      console.log($token.get());
      return true;
    } else {
      return false; // Aggiungi questa linea per gestire casi in cui la risposta non è quella attesa
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default loginHandler;
