import { Anchor, Group, ActionIcon, rem, Text } from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandLinkedin,
} from '@tabler/icons-react';
import classes from './FooterCentered.module.css';

export function FooterCentered() {
  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>
          <Text>
            Made with ♥️ by{' '}
            <Anchor href="https://github.com/FireWtap/thesplitter" lh={1} size="md">
              Francesco
            </Anchor>
          </Text>
        </Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <a href="https://github.com/FireWtap" target="_blank" rel="noopener noreferrer">
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </a>
          <a
            href="https://www.instagram.com/francescom._/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </a>
          <a
            href="https://www.linkedin.com/in/francesco-massafra-993097216/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandLinkedin
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              ></IconBrandLinkedin>
            </ActionIcon>
          </a>
        </Group>
      </div>
    </div>
  );
}
