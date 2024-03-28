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

import { $currentSelectedId } from '@/stores/user';

export default function MenuToolTip({
  id,
  type,
  onSubmit,
  locally_stored,
  download_modal,
  delete_modal,
  ...props
}) {
  return (
    <>
      <Menu shadow="md">
        <Menu.Target>
          <a
            onClick={() => {
              $currentSelectedId.set(id);
            }}
          >
            <IconDotsVertical style={{ width: rem(15), height: rem(15) }} />
          </a>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Operations</Menu.Label>
          {type == 'file' ? (
            <Menu.Item
              onClick={() => {
                download_modal();
              }}
              leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
            >
              Download
            </Menu.Item>
          ) : (
            ''
          )}
          <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}>
            Rename
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              delete_modal();
            }}
            color="red"
            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          >
            Delete
          </Menu.Item>
          {/* {type == 'folder'
            ? deleteFolderPopover(id, () => onSubmit())
            : deleteFilePopover(id, () => onSubmit())} */}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
