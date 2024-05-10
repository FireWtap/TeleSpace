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
  Stack,
  Flex,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import classes from './RegisterForm.module.css';
import registerHandler from './registerHandles';

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [alertStatus, setAlertStatus] = useState({ show: false, success: false, message: '' });

  const registerForm = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      BotToken: '',
      ChatId: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
          ? null
          : 'Password must at least have 8 character, at least a capital letter, at least a digit, and at least a special character',
      confirmPassword: (value, values) =>
        value === values.password ? null : 'Password does not match',
      BotToken: (value) => (/^\d+:[A-Za-z0-9_-]+$/.test(value) ? null : 'Invalid Bot Token'),
    },
  });

  const modifiedLoginHandler = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
    BotToken: string;
    ChatId: string;
  }) => {
    setLoading(true);
    try {
      const response = await registerHandler(values);
      if (response) {
        setAlertStatus({ show: true, success: true, message: 'Register successful! ' });
        setTimeout(() => navigate('/login'), 1000); // Redirezione dopo il successo
      } else {
        setAlertStatus({ show: true, success: false, message: 'Some errors...' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className={classes.pageContainer}>
      <Grid grow columns={12} style={{ width: '100%', height: '100%' }} justify="center">
        <Grid.Col span={{ md: 6, sm: 12 }} className={classes.loginElement}>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />

          <Paper
            withBorder
            shadow="md"
            p={20}
            mt={10}
            radius="sm"
            style={{ width: '100%', maxWidth: 'none' }}
          >
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
            <form onSubmit={registerForm.onSubmit(modifiedLoginHandler)}>
              <Stack gap="xs">
                <TextInput
                  label="Email"
                  placeholder="you@mantine.dev"
                  required
                  {...registerForm.getInputProps('email')}
                />
                <Flex style={{ width: '100%' }}>
                  <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                    style={{ flex: 1 }}
                    {...registerForm.getInputProps('password')}
                    mr={rem(5)}
                  />
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Your password"
                    required
                    mt="md"
                    style={{ flex: 1 }}
                    {...registerForm.getInputProps('confirmPassword')}
                  />
                </Flex>

                <TextInput
                  label="Bot Token"
                  placeholder="Your bot token..."
                  required
                  mt="md"
                  description="You can get it from @BotFather"
                  {...registerForm.getInputProps('BotToken')}
                />
                <TextInput
                  label="ChatId"
                  placeholder="Your chat id..."
                  required
                  mt="md"
                  description="You can get it from @userinfobot"
                  {...registerForm.getInputProps('ChatId')}
                />
              </Stack>

              <Button type="submit" fullWidth mt="xl" loading={loading}>
                Sign in
              </Button>
            </form>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ md: 6, sm: 12 }}>
          <Image
            src={logo}
            height={200}
            maw={200}
            mx="auto"
            mb={0}
            fallbackSrc="https://placehold.co/600x400?text=Logo"
            onClick={() => navigate('/')}
          />
          <Title className={classes.title}>Here we are 🌝</Title>
          <Text color="dimmed" style={{ textAlign: 'center' }} size="sm" mt={5}>
            Already have an account?{' '}
            <Anchor size="sm" component="button" onClick={() => navigate('/login')}>
              Sign-in
            </Anchor>
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
