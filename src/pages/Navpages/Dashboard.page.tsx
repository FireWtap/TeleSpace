import { Container, Group, rem } from '@mantine/core';
import React from 'react';
import StatsCard from '@/components/Dashboard/StatsCard';
import TaskTable from '@/components/Dashboard/TaskTable';

export default function Dashboard() {
  return (
    <>
      <h1 style={{ textTransform: 'capitalize' }}>Benvenuto👋</h1>

      <Container size="xs" mah={rem(50)} ml={rem(5)} mt={rem(50)} m={rem(50)}>
        {/* Group component added to manage layout and spacing between components */}
        <Group spacing="xl">
          <StatsCard />
          <TaskTable />
        </Group>
      </Container>
    </>
  );
}
