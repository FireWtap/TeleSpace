import { Card, CardSection, Paper, Table, Text, rem } from '@mantine/core';
import { IconCheck, IconClockPause, IconRefresh } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { instance } from '@/utils/api';

export default function TaskTable() {
  //    "Ok": "[{\"add_time\":\"2024-03-28 22:54:30\",\"completion_time\":\"2024-03-28 22:54:43\",\"id\":\"03ad0abc-7f5d-4537-8229-a26760d113ff\",\"name\":51,\"status\":\"COMPLETED\",
  const [tasks, setTasks] = useState([]);
  const [body, setBody] = useState<(string | number | JSX.Element)[][]>([]);
  function getAllTasks() {
    instance
      .get('/tasks')
      .then((response) => {
        setTasks(JSON.parse(response.data.Ok));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllTasks(); //On startup get all tasks
  }, []);

  useEffect(() => {
    const newBody = tasks.map(
      (task: {
        id: number;
        name: number | string;
        add_time: string;
        status: string;
        filename: string;
      }) => {
        const status =
          task.status === 'COMPLETED' ? (
            <IconCheck color="green" />
          ) : task.status == 'WORKING' ? (
            <IconRefresh color="orange" />
          ) : (
            <IconClockPause color="red" />
          );
        const filename =
          task.filename.length < 20 ? task.filename : `${task.filename.slice(0, 20)}...`;
        return [task.id, filename, task.add_time, status];
      }
    );
    setBody(newBody);
  }, [tasks]); //when tasks change, update the body

  const tableData = {
    caption: 'Your Tasks',
    head: ['Id', 'File', 'Add Time', 'Status'],
    body,
  };
  return (
    <>
      <Card shadow="xs" padding="md" radius="md" withBorder>
        <Text fw={700} size="lg">
          Tasks
        </Text>
        <Table.ScrollContainer minWidth={rem(250)}>
          <Table
            captionSide="bottom"
            data={tableData}
            withColumnBorders
            highlightOnHover
            striped
          />
        </Table.ScrollContainer>
      </Card>
    </>
  );
}
