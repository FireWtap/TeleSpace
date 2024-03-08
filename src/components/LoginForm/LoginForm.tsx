import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Image,
  Grid,
} from '@mantine/core';
import classes from './LoginForm.module.css';
import logo from '@/assets/logo.svg';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/utils/API_URL';
import { useNavigate } from 'react-router-dom';
import loginHandler from './loginHandlers';
import { c } from 'vite/dist/node/types.d-AKzkD8vd';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    console.log(remember);
  }, [remember]);

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      /*password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
          ? null
          : 'Password must at least have 8 character, at least a capital letter, at least a digit, and at least a special character',
    */
    },
  });

  return (
    <Container size={840} my={40} mt={100}>
      {' '}
      {/* Modifica la larghezza del Container per adattarsi a due colonne */}
      <Grid>
        {/* Prima colonna per il logo e il messaggio di benvenuto */}
        <Grid.Col span={6}>
          {' '}
          {/* Imposta il numero di span in base alle tue necessità */}
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
          <Title ta="center" className={classes.title}>
            Welcome back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>
        </Grid.Col>

        {/* Seconda colonna per il form di login */}
        <Grid.Col span={6}>
          {' '}
          {/* Imposta il numero di span in base alle tue necessità */}
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={loginForm.onSubmit((values) => loginHandler(values, remember))}>
              <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                required
                {...loginForm.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                {...loginForm.getInputProps('password')}
              />
              <Group justify="space-between" mt="lg">
                <Checkbox
                  checked={remember}
                  label="Remember me"
                  onChange={(v) => setRemember(v.target.checked)}
                />
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
              <Button type="submit" fullWidth mt="xl">
                Sign in
              </Button>
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
