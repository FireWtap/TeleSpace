import axios from 'axios';
import Cookies from 'universal-cookie';
import { $token } from '@/stores/user';
import { API_URL } from '@/utils/API_URL';
import { getMessaging } from 'firebase/messaging';

const loginHandler = async (values: { email: string; password: string }, remember: boolean) => {
  try {
    //Some magic! We need to send the token for the notification to the server:)

    const token = localStorage.getItem('fcmToken');

    const response = await axios.post(
      `${API_URL}/login`,
      {
        email: values.email,
        password_hash: values.password,
        notification_token: token ?? '',
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response?.data?.Ok) {
      $token.set(response.data.Ok);

      /*if (remember) {
        const cookies = new Cookies();
        cookies.set('token', response.data.Ok, { path: '/' });
      }*/

      return true;
    }
    return false; // Aggiungi questa linea per gestire casi in cui la risposta non è quella attesa
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default loginHandler;
