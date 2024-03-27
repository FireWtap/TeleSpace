import { Button, Menu, rem } from '@mantine/core';
import { IconDownload, IconEdit, IconTools, IconTrash, IconWheel } from '@tabler/icons-react';
import * as React from 'react';
import { useState, useEffect } from 'react';

export default function MenuToolTip(values) {
  return (
    <>
      <Menu shadow="md">
        <Menu.Target>
          <a>
            <IconTools style={{ width: rem(15), height: rem(15) }} />
          </a>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Operations</Menu.Label>
          <Menu.Item leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
            Download
          </Menu.Item>
          <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}>
            Rename
          </Menu.Item>

          <Menu.Item
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
