import { instance } from '@/utils/api';
import { Button, Flex, Group, Menu, Modal, Popover, Stack, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconTrash } from '@tabler/icons-react';

const deleteFolderPopover = (id, onSubmit) => {
  const deleteFolderReq = async (id) => {
    instance.delete('/deleteDirectory/' + id).then((response) => {
      console.log(response);
      onSubmit();
      showNotification({
        title: 'Folder deleted successfully',
        message: 'The folder has been successfully deleted.',
        icon: <IconCheck />,
        color: 'green',
      });
    });
  };
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Folder">
        <Group justify="center">
          <Text>Are you sure you want to delete this folder? You will lose all of it content</Text>
          <Flex gap="md">
            <Button color="red" onClick={() => deleteFolderReq(id)}>
              Delete
            </Button>
            <Button onClick={() => close()}>Cancel</Button>
          </Flex>
        </Group>
      </Modal>
      <Menu.Item
        onClick={() => {
          open();
        }}
        color="red"
        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
      >
        Delete
      </Menu.Item>
    </>
  );
};
export default deleteFolderPopover;
