import { Alert, Box, Button, Flex, Input, Modal, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useStore } from '@nanostores/react';
import { IconCheck, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { instance } from '@/utils/api';
import { $currentFileInfo, $currentSelectedId } from '@/stores/user';

function renameFile(id, new_name, onSubmit, closeModal) {
  instance.post(`/renameFile/${id}`, { new_name }).then((response) => {
    onSubmit();
    closeModal();
    if (response.data.Ok) {
      showNotification({
        title: 'File renamed successfully',
        message: 'The file has been successfully renamed.',
        icon: <IconCheck />,
        color: 'green',
      });
    } else if (response.data.BadRequest) {
      showNotification({
        title: 'Error',
        message: 'A file with the same name already exists.',
        color: 'red',
      });
    }
  });
}

function renameDirectory(id, new_name, onSubmit, closeModal) {
  instance.post(`/renameDirectory/${id}`, { new_name }).then((response) => {
    onSubmit();
    closeModal();
    if (response.data.Ok) {
      showNotification({
        title: 'Folder renamed successfully',
        message: 'The folder has been successfully renamed.',
        icon: <IconCheck />,
        color: 'green',
      });
    } else if (response.data.BadRequest) {
      showNotification({
        title: 'Error',
        message: 'A folder with the same name already exists.',
        color: 'red',
      });
    }
  });
}

export default function RenameModal({
  openedRenameModal,
  closeRenameModal,
  currentFileInfo,
  onSubmit,
  ...props
}) {
  const [loadingVisible, { toggle }] = useDisclosure(false);
  const [alertProps, setAlertProps] = useState({ visibility: true, alertText: '', color: '' });
  const currentSelectedId = useStore($currentSelectedId);

  useEffect(() => {
    console.log(currentFileInfo);
    if (currentFileInfo.filename) {
      renameFileForm.setValues({ currentName: currentFileInfo.filename.replace('./temp/', '') });
    }
  }, [currentFileInfo]);

  const renameFileForm = useForm({
    initialValues: {
      currentName: currentFileInfo.filename,
    },
    validate: {
      //currentName: (value) => (/^[a-zA-Z0-9]{1,19}$/.test(value) ? null : 'Invalid file name'),
    },
  });

  return (
    <>
      <Modal
        opened={openedRenameModal}
        onClose={closeRenameModal}
        title={currentFileInfo.type ? 'Rename Folder' : 'Rename File'}
        withCloseButton
      >
        <Stack>
          <form
            onSubmit={renameFileForm.onSubmit((values) => {
              currentFileInfo.type
                ? renameDirectory(
                    currentSelectedId,
                    values.currentName,
                    () => onSubmit(),
                    () => closeRenameModal()
                  )
                : renameFile(
                    currentSelectedId,
                    values.currentName,
                    () => onSubmit(),
                    () => closeRenameModal()
                  );
            })}
          >
            <Flex align="flex-start" gap="sm">
              <Input
                leftSection={<IconPlus />}
                placeholder={currentFileInfo.type ? 'Rename Folder' : 'Rename File'}
                {...renameFileForm.getInputProps('currentName')}
              />
              <Button type="submit">Confirm</Button>
            </Flex>
          </form>
        </Stack>
      </Modal>
    </>
  );
}
