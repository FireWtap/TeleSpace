import { Card, Grid, Stack, Text } from '@mantine/core';
import React, { useEffect } from 'react';
import { instance } from '@/utils/api';
import { formatBytes } from '@/utils/function_utils';

interface stats {
  totalTasks: number;
  cumulativeDimension: number;
}

export default function StatsCard() {
  const [stats, setStats] = React.useState<stats>({ totalTasks: 0, cumulativeDimension: 0 });

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
      <Card shadow="xs" padding="md" radius="md" withBorder>
        <Text fw={700} size="lg">
          Statistics
          <Grid>
            <Grid.Col span={6}>
              <Stack bg="var(--mantine-color-body)" align="stretch" justify="center" gap="md">
                <Text size="s">Total Uploaded Files</Text>
                <Text size="s">{stats.totalTasks}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack bg="var(--mantine-color-body)" align="stretch" justify="center" gap="md">
                <Text size="s">Cumulative Dimension</Text>
                <Text size="s">{formatBytes(stats.cumulativeDimension)}</Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Text>
      </Card>
    </>
  );
}
