import { instance } from '@/utils/api';
import { Button, Flex, Menu, Popover, Stack, Text, rem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
  IconCheck,
  IconDatabase,
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
  clear_cache_modal,
  rename_modal,
  ...props
}) {
  onSubmit = () => {
    onSubmit();
    $currentSelectedId.set(-1); // After submitting we're not selecting any file
  };
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

          <Menu.Item
            leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => rename_modal()}
          >
            Rename
          </Menu.Item>
          <Menu.Divider />
          {locally_stored ? (
            <Menu.Item
              onClick={() => {
                clear_cache_modal();
              }}
              color="red"
              leftSection={<IconDatabase style={{ width: rem(14), height: rem(14) }} />}
            >
              Clear Cache
            </Menu.Item>
          ) : (
            ''
          )}
          <Menu.Item
            onClick={() => {
              delete_modal();
            }}
            color="red"
            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
