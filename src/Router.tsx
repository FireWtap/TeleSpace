import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { FooterCentered } from './components/Footer/FooterCentered';
import { element } from 'prop-types';
import { Login } from './pages/Login.page';
import { useStore } from '@nanostores/react';
import { $isLoggedIn } from './stores/user';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Dashboard from './pages/Navpages/Dashboard.page';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Profile from './pages/Profile.page';
import Cloud from './pages/Navpages/Cloud.page';

function NonLoggedIn() {
  return (
    <>
      <Outlet />
      <FooterCentered />
    </>
  );
}

export default function RouteGuard() {
  const isLoggedIn = useStore($isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <NonLoggedIn />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    element: <RouteGuard />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/cloud',
        element: <Cloud />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
