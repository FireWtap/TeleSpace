import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Alert, Button, Paper, TextInput } from '@mantine/core';
import { getMe, instance, updateBotToken, updateChatId } from '@/utils/api';

interface User {
  botToken: string;
  id: number;
  username: string;
  chatId: string;
}
export default function ChangeChatIdPaper() {
  const [alertStatus, setAlertStatus] = useState({ show: false, success: false, message: '' });
  const [me, setMe] = useState<User | null>(null);
  const handleChangeToken = (values) => {
    const chat_id = values.ChatId;
    // we can't check if chat id is valid, so we just update it
    updateChatId(chat_id).then(() => {
      setAlertStatus({
        show: true,
        success: true,
        message: 'Chat Id Updated! Check your Telegram for confirmation.',
      });
    });
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

  const ChatIdSettings = useForm({
    initialValues: {
      ChatId: me?.chatId,
    },
    validate: {},
  });

  useEffect(() => {
    if (me) {
      ChatIdSettings.setFieldValue('ChatId', me?.chatId);
    }
  }, [me]);

  return (
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
      <form onSubmit={ChatIdSettings.onSubmit(handleChangeToken)}>
        <TextInput
          label="Chat Id..."
          placeholder="Chat Id..."
          required
          {...ChatIdSettings.getInputProps('ChatId')}
        />
        <Alert color="red" title="Be careful!" mb="md" mt="md">
          Changing your chat id is an extremely dangerous operation. Please be aware, deleting the
          Telegram account will erase all of your data.
        </Alert>
        <Button type="submit" fullWidth mt="md">
          Update Chat Id
        </Button>
      </form>
    </Paper>
  );
}
