import { instance } from '@/utils/api';
import { Button, Flex, Menu, Popover, Stack, Text, rem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  IconCheck,
  IconDots,
  IconDotsVertical,
  IconDownload,
  IconEdit,
  IconTools,
  IconTrash,
  IconWheel,
} from '@tabler/icons-react';
import * as React from 'react';
import { useState, useEffect } from 'react';

export default function MenuToolTip(values) {
  const [deletePopoverState, setDeletePopoverState] = useState(false);

  const deleteFolderPopover = (id) => {
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

  const deleteFilePopover = (id) => {
    const deleteFolderReq = async (id) => {
      instance.delete('/deleteFile/' + id).then((response) => {
        console.log(response);
        showNotification({
          title: 'File deleted successfully',
          message: 'The file has been successfully deleted.',
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
              <Text size="xs">Are you sure you want to delete this file?</Text>
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

  return (
    <>
      <Menu shadow="md">
        <Menu.Target>
          <a>
            <IconDotsVertical style={{ width: rem(15), height: rem(15) }} />
          </a>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Operations</Menu.Label>
          {values.type == 'file' ? (
            <Menu.Item leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
              Download
            </Menu.Item>
          ) : (
            ''
          )}
          <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}>
            Rename
          </Menu.Item>
          {values.type == 'folder' ? deleteFolderPopover(values.id) : deleteFilePopover(values.id)}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
