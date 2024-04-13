import ProfileSettingsCard from '@/components/ProfileSettings/ProfileSettingsCard';
import { Container } from '@mantine/core';
import React from 'react';

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
