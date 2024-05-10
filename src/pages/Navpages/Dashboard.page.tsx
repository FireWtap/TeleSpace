import { Card, Container, Grid, Text, rem } from '@mantine/core';
import { useEffect, useState } from 'react';
// import StatsCard from '@/components/Dashboard/StatsCard';
// import TaskTable from '@/components/Dashboard/TaskTable';
import { instance } from '@/utils/api';
import { formatBytes } from '@/utils/function_utils';
import TaskTable from '@/components/Dashboard/TaskTable';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalTasks: 0, cumulativeDimension: 0 });

  function getStats() {
    instance.get('/stats').then((response) => {
      if (response.data.Ok) {
        const parsed_response = JSON.parse(response.data.Ok);
        setStats({
          totalTasks: parsed_response.file_count,
          cumulativeDimension: parsed_response.cumulative_size,
        });
      }
    });
  }
  useEffect(() => {
    getStats();
  }, []);
  return (
    <>
      <Container fluid mah={rem(50)} ml={rem(5)} mt={0} m={rem(50)}>
      <Text fw={900} size={rem(30)} mb="lg">Welcome to your
      {' '}
      <Text
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        display="inline-block"
      >
      TeleSpace
      </Text>
      {' '}
      🚀
      </Text>
      <Grid columns={8}>
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed">
            Total Uploaded Files
            </Text>
            <Text fw={500} size="xl">{stats.totalTasks}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed">
            Cumulative Dimension
            </Text>
            <Text fw={500} size="xl">{formatBytes(stats.cumulativeDimension)}</Text>
          </Card>
        </Grid.Col>
      </Grid>
      <Card shadow="sm" padding="lg" radius="md" withBorder mt="lg">
        <Card.Section withBorder inheritPadding py="xs">
          <Text fw={500}>Latest tasks</Text>
        </Card.Section>
        <TaskTable />
      </Card>
        {/* <Group spacing="xl">
          <StatsCard />

        </Group> */}
      </Container>
    </>
  );
}
