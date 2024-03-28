import { instance } from '@/utils/api';
import { Button, Flex, Menu, Modal, Popover, Stack, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconTrash } from '@tabler/icons-react';

const deleteFilePopover = (id: Number, onSubmit) => {
  const deleteFolderReq = async (id) => {
    instance.delete('/deleteFile/' + id).then((response) => {
      onSubmit();
      showNotification({
        title: 'File deleted successfully',
        message: 'The file has been successfully deleted.',
        icon: <IconCheck />,
        color: 'green',
      });
    });
  };
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Menu.Item
        onClick={() => open()}
        color="red"
        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
      >
        Delete
      </Menu.Item>
      <Modal opened={opened} onClose={close} title="Delete File">
        <Stack gap="xs">
          <Text>Are you sure you want to delete this file?</Text>
          <Stack>
            <Flex gap="md" justify="center">
              <Button size="xs" onClick={() => {}} color="gray">
                Cancel
              </Button>
              <Button
                size="xs"
                onClick={() => {
                  deleteFolderReq(id);
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
};
export default deleteFilePopover;
