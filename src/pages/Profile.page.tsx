import { Container } from '@mantine/core';
import React from 'react';
import ProfileSettingsCard from '@/components/ProfileSettings/ProfileSettingsCard';

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <Container>
        <ProfileSettingsCard />
      </Container>
    </div>
  );
}
