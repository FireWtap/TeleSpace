import TaskTable from '@/components/Dashboard/TaskTable';
import { Badge, Box, Button, Card, Container, Group, Title, rem } from '@mantine/core';
import React from 'react';

export default function Dashboard() {
  return (
    <>
      <h1 style={{ textTransform: 'capitalize' }}>Dashboard</h1>

      <Container size="xs" mah={rem(50)} ml={rem(5)} mt={rem(5)}>
        <TaskTable />
      </Container>
    </>
  );
}
