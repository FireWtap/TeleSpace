import { Image, Container, Group, Title, Text, Avatar, Menu, rem } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { onMount } from 'nanostores';
import logo from '@/assets/logo.svg';
import { getMe, instance, logout } from '@/utils/api';
import { $token } from '@/stores/user';

function Header() {
  const navigate = useNavigate();

  //avatar letters
  const [initial, setInitial] = useState('');

  useEffect(() => {
    getMe().then((response) => {
      const parsed = JSON.parse(response);
      setInitial("");
    });
  }, []);

  return (
    <Group h="100%" px="md" style={{ width: '100%' }}>
      {' '}
      {/* Assicurati che il gruppo esterno abbia una larghezza del 100% */}
      <Group onClick={() => navigate('/')}>
        <Image
          src={logo}
          width={120} // Imposta qui la larghezza desiderata per ridimensionare il logo
          height={60} // Puoi anche regolare l'altezza se necessario
          fallbackSrc="https://placehold.co/600x400?text=Logo"
          style={{ display: 'block', marginLeft: 0, cursor: 'pointer' }}
        />
        <Title ml={0} size="25">
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'blue', to: 'purple' }}
          >
            TeleSpace
          </Text>
        </Title>
      </Group>
      <div style={{ flexGrow: 1 }} />
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Avatar alt="Avatar" style={{ cursor: 'pointer' }}>
            {initial}
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Profile</Menu.Label>
          <Menu.Item
            onClick={() => {
              navigate('/profile');
            }}
            leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              logout();
              navigate('/dashboard');
            }}
            leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
export default Header;
