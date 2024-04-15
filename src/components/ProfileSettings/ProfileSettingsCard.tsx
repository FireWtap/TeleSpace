import { getMe, instance, updateBotToken } from '@/utils/api';
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

export default function ProfileSettingsCard() {
  const [alertStatus, setAlertStatus] = useState({ show: false, success: false, message: '' });
  const [me, setMe] = useState<User | null>(null);
  const handleChangeToken = (values) => {
    let botToken = values.BotToken;
    // Check if token is valid
    instance
      .post('/checkBotToken', { bot_token: botToken })
      .then((response) => {
        if (response.data.Ok == 'true') {
          //Fine we can update it
          updateBotToken(botToken).then((response) => {
            setAlertStatus({ show: true, success: true, message: 'Token updated!' });
          });
        } else {
          setAlertStatus({ show: true, success: false, message: "Invalid Token! Won't update" });
        }
      })
      .catch((err) => console.log(err))
      .finally();
  };
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
            Update Bot Token
          </Button>
        </form>
      </Paper>
    </>
  );
}
