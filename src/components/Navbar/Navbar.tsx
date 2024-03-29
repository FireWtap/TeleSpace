import { IconCloudComputing, IconDashboard, IconMenu } from '@tabler/icons-react';
import React, { useState } from 'react';
import classes from './Navbar.module.css';
import { Button, Code, Group, rgba } from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import { theme } from '@/theme';
import { useMediaQuery } from '@mantine/hooks';

export default function Navbar({ toggle, ...props }) {
  const [active, setActive] = useState('Dashboard');
  const navigate = useNavigate();
  const linksList = [
    { link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
    { link: '/cloud', label: 'Cloud', icon: IconCloudComputing },
  ];
  const links = linksList.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? 'bold' : '',
          color: isPending ? 'red' : 'black',
          viewTransitionName: isTransitioning ? 'slide' : '',
          backgroundColor: isActive ? rgba('#add8e6', 0.5) : '',
        };
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
