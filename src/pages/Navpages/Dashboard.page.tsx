import { Badge, Box, Button, Card, Container, Group, Title, rem } from '@mantine/core';
import React from 'react';
import StatsCard from '@/components/Dashboard/StatsCard';
import TaskTable from '@/components/Dashboard/TaskTable';

export default function Dashboard() {
  return (
    <>
      <h1 style={{ textTransform: 'capitalize' }}>Dashboard</h1>

      <Container size="xs" mah={rem(50)} ml={rem(5)} mt={rem(5)}>
        <StatsCard />
        <TaskTable />
      </Container>
    </>
  );
}
