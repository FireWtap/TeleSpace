import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {} from 'virtual:pwa-register';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';
import { theme } from './theme';
import NetworkDetector from './utils/NetworkDetector';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />

      <Router />
    </MantineProvider>
  );
}
