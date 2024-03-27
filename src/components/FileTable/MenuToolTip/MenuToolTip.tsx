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
import deleteFolderPopover from './DeleteFolderPopover';
import deleteFilePopover from './DeleteFilePopover';

export default function MenuToolTip(values) {
  const [deletePopoverState, setDeletePopoverState] = useState(false);

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
          {values.type == 'folder'
            ? deleteFolderPopover(values.id, deletePopoverState, setDeletePopoverState)
            : deleteFilePopover(values.id, deletePopoverState, setDeletePopoverState)}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
