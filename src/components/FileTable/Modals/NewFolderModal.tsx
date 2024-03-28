import { $currentDir } from '@/stores/user';
import { instance } from '@/utils/api';
import { Alert, Box, Button, Flex, Input, Modal, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

export default function NewFolderModal({ opened, onClose, onSubmit, ...props }) {
  const [loadingVisible, { toggle }] = useDisclosure(false);
  const [alertProps, setAlertProps] = useState({ visibility: true, alertText: '', color: '' });
  const createFolderForm = useForm({
    initialValues: {
      folderName: '',
    },
    validate: {
      folderName: (value) => (/^[a-zA-Z0-9]{1,19}$/.test(value) ? null : 'Invalid folder name'),
    },
  });

  function handleCreateFolderSubmit(values: { folderName: string }) {
    instance
      .post('/createDir', { name: values.folderName, parent: $currentDir.get() })
      .then(function (response) {
        console.log(response);
        if (response.data.Ok != undefined) {
          onClose();
          onSubmit();
          showNotification({
            title: 'Folder created',
            message: 'The folder has been successfully created.',
            icon: <IconCheck />,
            color: 'green',
          });
        }
      })
      .catch(function (error) {
        onClose();
        console.log(error);
      });
  }

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="New folder" withCloseButton>
        <Stack>
          <form onSubmit={createFolderForm.onSubmit((values) => handleCreateFolderSubmit(values))}>
            <Flex align="flex-start" gap="sm">
              <Input
                leftSection={<IconPlus />}
                placeholder="New folder name"
                {...createFolderForm.getInputProps('folderName')}
              ></Input>
              <Button type="submit">Add Folder</Button>
            </Flex>
          </form>
        </Stack>
      </Modal>
    </>
  );
}
