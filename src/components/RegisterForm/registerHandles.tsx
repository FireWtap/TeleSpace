import axios from 'axios';
import { API_URL } from '@/utils/API_URL';

const registerHandler = async (values: {
  email: string;
  password: string;
  BotToken: string;
  ChatId: string;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      {
        email: values.email,
        password: values.password,
        bot_token: values.BotToken,
        chat_id: values.ChatId,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response?.data?.Ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export default registerHandler;
