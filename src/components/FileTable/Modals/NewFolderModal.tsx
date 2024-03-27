import { $currentDir } from '@/stores/user';
import { instance } from '@/utils/api';
import { Alert, Box, Button, Flex, Input, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

export default function NewFolderModal({ opened, onClose, ...props }) {
  const [loadingVisible, { toggle }] = useDisclosure(false);
  const [alertProps, setAlertProps] = useState({ visibility: true, alertText: '', color: '' });
  const createFolderForm = useForm({
    initialValues: {
      folderName: '',
    },
    validate: {
      folderName: (value) =>
        /^[a-zA-Z0-9]{1,19}$/.test(value)
          ? null
          : "Special character aren't allowed and the folder name must be under 20 charaters.",
    },
  });

  function handleCreateFolderSubmit(values: { folderName: string }) {
    instance
      .post('/createDir', { name: values.folderName, parent: $currentDir.get() })
      .then(function (response) {
        console.log(response);
        if (response.data.Ok != undefined) {
          setAlertProps({
            visibility: false,
            alertText: 'Folder successfully created',
            color: 'green',
          });
        } else {
          setAlertProps({
            visibility: false,
            alertText: response.data.BadRequest,
            color: 'red',
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
      <Modal
        opened={opened}
        onClose={onClose}
        title="New folder"
        withCloseButton
        transitionProps={{ transition: 'rotate-left' }}
      >
        <Box>
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
          <Alert
            mt={10}
            variant="light"
            color={alertProps.color}
            title="Alert title"
            hidden={alertProps.visibility}
          >
            {alertProps.alertText}
          </Alert>
        </Box>
      </Modal>
    </>
  );
}
