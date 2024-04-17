import { Button, Flex, Modal, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useStore } from '@nanostores/react';
import { IconCheck } from '@tabler/icons-react';
import * as React from 'react';
import { instance } from '@/utils/api';
import { $currentSelectedId } from '@/stores/user';

const clearCache = async (id, onSubmit, closeModal) => {
  instance.get(`/clearCache/${id}`).then((response) => {
    onSubmit();
    closeModal();
    showNotification({
      title: 'Cache cleared successfully',
      message: 'The cache has been successfully cleared.',
      icon: <IconCheck />,
      color: 'green',
    });
  });
};

export default function DeleteModal({
  openedModalClearCache,
  closeModalClearCache,
  currentFileInfo,
  onSubmit,
  ...props
}) {
  const currentSelectedId = useStore($currentSelectedId);
  return (
    <>
      <Modal opened={openedModalClearCache} onClose={closeModalClearCache} title="Clear Cache">
        <Stack gap="xs">
          <Text size="sm">
            Do you want to clear the cache for this file? You will need to download it again on the
            server to have it.
          </Text>
          <Stack>
            <Flex gap="md" justify="center">
              <Button size="xs" onClick={() => closeModalClearCache()} color="gray">
                Cancel
              </Button>
              <Button
                size="xs"
                onClick={() => {
                  clearCache(currentSelectedId, onSubmit, closeModalClearCache);
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
