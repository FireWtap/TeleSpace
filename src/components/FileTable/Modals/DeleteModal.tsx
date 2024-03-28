import { $currentSelectedId } from '@/stores/user';
import { instance } from '@/utils/api';
import { Button, Flex, Modal, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useStore } from '@nanostores/react';
import { IconCheck } from '@tabler/icons-react';

const deleteFolderReq = async (id, onSubmit, closeModal) => {
  instance.delete('/deleteDirectory/' + id).then((response) => {
    onSubmit();
    closeModal();
    showNotification({
      title: 'Folder deleted successfully',
      message: 'The folder has been successfully deleted.',
      icon: <IconCheck />,
      color: 'green',
    });
  });
};

const deleteFileReq = async (id, onSubmit, closeModal) => {
  instance.delete('/deleteFile/' + id).then((response) => {
    onSubmit();
    closeModal();
    showNotification({
      title: 'File deleted successfully',
      message: 'The file has been successfully deleted.',
      icon: <IconCheck />,
      color: 'green',
    });
  });
};

export default function DeleteModal({
  openedModalDelete,
  closeModalDelete,
  currentFileInfo,
  onSubmit,
  ...props
}) {
  const currentSelectedId = useStore($currentSelectedId);
  return (
    <>
      <Modal opened={openedModalDelete} onClose={closeModalDelete} title="Delete File">
        <Stack gap="xs">
          <Text size="sm">
            {currentFileInfo.type
              ? "Are you sure you want to delete this folder? You' gonna lose all of it content."
              : 'Are you sure you want to delete this file?'}
          </Text>
          <Stack>
            <Flex gap="md" justify="center">
              <Button size="xs" onClick={() => closeModalDelete()} color="gray">
                Cancel
              </Button>
              <Button
                size="xs"
                onClick={() => {
                  currentFileInfo.type
                    ? deleteFolderReq(currentSelectedId, onSubmit, closeModalDelete)
                    : deleteFileReq(currentSelectedId, onSubmit, closeModalDelete);
                }}
                color="red"
              >
                Delete
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}
