import { IconCloudComputing, IconDashboard } from '@tabler/icons-react';
import React, { useState } from 'react';
import classes from './Navbar.module.css';
import { Code, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [active, setActive] = useState('Dashboard');
  const navigate = useNavigate();
  const linksList = [
    { link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
    { link: '/cloud', label: 'Cloud', icon: IconCloudComputing },
  ];
  const links = linksList.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
