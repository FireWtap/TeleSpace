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
import DownloadFilePopover from './DownloadFilePopover';

export default function MenuToolTip({ id, type, onSubmit, locally_stored, ...props }) {
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
          {type == 'file' ? DownloadFilePopover(id, type, locally_stored, onSubmit) : ''}
          <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}>
            Rename
          </Menu.Item>

          {type == 'folder'
            ? deleteFolderPopover(id, () => onSubmit())
            : deleteFilePopover(id, () => onSubmit())}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
