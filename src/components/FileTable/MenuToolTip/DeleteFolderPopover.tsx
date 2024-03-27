import { instance } from '@/utils/api';
import { Button, Flex, Menu, Popover, Stack, Text, rem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconTrash } from '@tabler/icons-react';

const deleteFolderPopover = (id, deletePopoverState, setDeletePopoverState) => {
  const deleteFolderReq = async (id) => {
    instance.delete('/deleteDirectory/' + id).then((response) => {
      console.log(response);
      showNotification({
        title: 'Folder deleted successfully',
        message: 'The folder has been successfully deleted.',
        icon: <IconCheck />,
        color: 'green',
      });
    });
  };

  return (
    <>
      <Popover opened={deletePopoverState} onChange={setDeletePopoverState}>
        <Popover.Target>
          <Menu.Item
            onClick={() => {
              setDeletePopoverState(true);
            }}
            color="red"
            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          >
            Delete
          </Menu.Item>
        </Popover.Target>

        <Popover.Dropdown>
          <Stack gap="xs">
            <Text size="xs">
              Are you sure you want to delete this folder? You will lose all of it content
            </Text>
            <Stack>
              <Flex gap="md" justify="center">
                <Button
                  size="xs"
                  onClick={() => {
                    setDeletePopoverState(false);
                  }}
                  color="gray"
                >
                  Cancel
                </Button>
                <Button
                  size="xs"
                  onClick={() => {
                    deleteFolderReq(id);
                    setDeletePopoverState(false);
                  }}
                  color="red"
                >
                  Delete
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </>
  );
};
export default deleteFolderPopover;
