import { $token } from '@/stores/user';
import { API_URL } from '@/utils/API_URL';
import axios from 'axios';
import Cookies from 'universal-cookie';

const loginHandler = (values: { email: string; password: string }, remember: boolean) => {
  console.log(values);
  axios
    .post(
      API_URL + '/login',
      {
        email: values.email,
        password_hash: values.password,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((response) => {
      console.log(response);
      $token.set(response?.data?.Ok);

      if (remember) {
        const cookies = new Cookies(null, { path: '/' });
        cookies.set('token', $token.get());
      }
      console.log($token.get());
    })
    .catch((error) => console.log(error));
};

export default loginHandler;
