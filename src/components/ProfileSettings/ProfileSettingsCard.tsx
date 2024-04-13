import { getMe, instance } from '@/utils/api';
import {
  Alert,
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
interface User {
  botToken: string;
  id: number;
  username: string;
}

function handleChangeToken(values) {
  let botToken = values.BotToken;
  // Check if token is valid
  instance
    .post('/checkBotToken', { bot_token: botToken })
    .then((response) => {
      if (response.data.Ok == 'true') {
        console.log(true);
      } else {
        console.log(false);
      }
    })
    .catch((err) => console.log(err))
    .finally();
}

export default function ProfileSettingsCard() {
  const [alertStatus, setAlertStatus] = useState({ show: false, success: false, message: '' });
  const [me, setMe] = useState<User | null>(null);

  const updateMe = async () => {
    try {
      const response = await getMe();
      setMe(JSON.parse(response) as User);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    updateMe();
  }, []);

  useEffect(() => {
    if (me) {
      ProfileSettings.setFieldValue('BotToken', me?.botToken);
    }
  }, [me]);

  const ProfileSettings = useForm({
    initialValues: {
      BotToken: me?.botToken,
    },
    validate: {},
  });

  return (
    <>
      <Paper withBorder shadow="md" p={20} mt={10} radius="sm">
        {alertStatus.show && (
          <Alert
            color={alertStatus.success ? 'green' : 'red'}
            title={alertStatus.success ? 'Success!' : 'Error!'}
            withCloseButton
            closeButtonLabel="Close"
            onClose={() => setAlertStatus({ ...alertStatus, show: false })}
            mb="md"
          >
            {alertStatus.message}
          </Alert>
        )}
        <form
          onSubmit={ProfileSettings.onSubmit((values) => {
            handleChangeToken(values);
          })}
        >
          <TextInput
            label="Bot Token..."
            placeholder="Bot Token..."
            required
            {...ProfileSettings.getInputProps('BotToken')}
          />

          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </>
  );
}
