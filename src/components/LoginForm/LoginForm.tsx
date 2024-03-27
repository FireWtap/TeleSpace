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
  Alert,
  LoadingOverlay,
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
  const [alertStatus, setAlertStatus] = useState({ show: false, success: false, message: '' });

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

  const modifiedLoginHandler = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await loginHandler(values, remember);
      if (response) {
        setAlertStatus({ show: true, success: true, message: 'Login successful!' });
        setTimeout(() => navigate('/dashboard'), 1000); // Redirezione dopo il successo
      } else {
        setAlertStatus({ show: true, success: false, message: 'Wrong credentials' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={classes.pageContainer}>
      <Grid columns={12}>
        <Grid.Col span={{ md: 6, sm: 12 }}>
          <Image
            src={logo}
            height={200}
            maw={200}
            mx="auto"
            mb={0}
            fallbackSrc="https://placehold.co/600x400?text=Logo"
            onClick={() => navigate('/')}
          ></Image>
          <Title className={classes.title}>Welcome back!</Title>
          <Text color="dimmed" style={{ textAlign: 'center' }} size="sm" mt={5}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </Text>
        </Grid.Col>
        <Grid.Col span={{ md: 6, sm: 12 }} className={classes.loginElement}>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />

          <Paper withBorder shadow="md" p={20} mt={10} radius="sm">
            {alertStatus.show && (
              <Alert
                color={alertStatus.success ? 'green' : 'red'}
                title={alertStatus.success ? 'Success!' : 'Error!'}
                withCloseButton
                closeButtonLabel="Close"
                onClose={() => setAlertStatus({ ...alertStatus, show: false })}
                mb="md"
              >
                {alertStatus.message}
              </Alert>
            )}
            <form onSubmit={loginForm.onSubmit(modifiedLoginHandler)}>
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
              <Group p="apart" mt="lg">
                <Checkbox
                  checked={remember}
                  label="Remember me"
                  onChange={(event) => setRemember(event.currentTarget.checked)}
                />
                <Anchor size="sm" component="button">
                  Forgot password?
                </Anchor>
              </Group>
              <Button type="submit" fullWidth mt="xl" loading={loading}>
                Sign in
              </Button>
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
