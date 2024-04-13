import { getMe } from '@/utils/api';
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
  const [me, setMe] = useState<User>({} as User);
  useEffect(() => {
    getMe().then((res) => {
      setMe(JSON.parse(res) as User);
      console.log(me);
    });
  }, []);

  const ProfileSettings = useForm({
    initialValues: {
      BotToken: me.botToken,
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
        <form onSubmit={ProfileSettings.onSubmit(() => {})}>
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
