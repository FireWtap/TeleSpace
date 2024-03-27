import React from 'react';
import { Title, Text, Button, Group, Image } from '@mantine/core';
import { IconEdit, IconLogin, IconRegistered } from '@tabler/icons-react';
// Non c'è bisogno di importare classes se si usano solo le props di Mantine per lo styling
import logo from '@/assets/logo.svg';
import { useNavigate } from 'react-router-dom';
export function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      <Image
        src={logo}
        h={200}
        maw={200}
        mx="auto"
        mt={50}
        mb={0}
        fallbackSrc="https://placehold.co/600x400?text=Logo"
        onClick={() => navigate('/')}
      ></Image>
      <Title size="50" ta="center">
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'purple' }}>
          TeleSpace
        </Text>
      </Title>
      <Text color="dimmed" size="xxl" maw={520} mx="auto" mt="xl">
        This service allows you to have access to unlimited storage space, by leveraging Telegram
        Bots and their API to securely store as much data as you want.
      </Text>
      <Group maw={300} mx="auto">
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'grape', deg: 233 }}
          style={{
            border: 0,
            transition: 'transform 0.5s ease',
            borderRadius: 0,
            minWidth: '20%',
          }}
          leftSection={<IconLogin size="20" />}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onClick={() => navigate('/login')}
          radius="xs"
          mt="xl"
          mx="auto"
          size="md"
        >
          Sign-in
        </Button>
        <Button
          variant="outline"
          miw="20%"
          style={{ borderRadius: 0 }}
          radius="xs"
          mt="xl"
          mx="auto"
          size="md"
          leftSection={<IconEdit size="20" />}
        >
          Sign-up
        </Button>
      </Group>
    </>
  );
}
