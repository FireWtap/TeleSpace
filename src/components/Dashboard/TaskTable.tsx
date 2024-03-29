import { instance } from '@/utils/api';
import { Card, CardSection, Paper, Table, Text, rem } from '@mantine/core';
import { IconCheck, IconClockPause, IconRefresh } from '@tabler/icons-react';
import React, { Component, useEffect, useState } from 'react';

export default function TaskTable() {
  //    "Ok": "[{\"add_time\":\"2024-03-28 22:54:30\",\"completion_time\":\"2024-03-28 22:54:43\",\"id\":\"03ad0abc-7f5d-4537-8229-a26760d113ff\",\"name\":51,\"status\":\"COMPLETED\",
  const [tasks, setTasks] = useState([]);
  const [body, setBody] = useState<(string | number | JSX.Element)[][]>([]);
  function getAllTasks() {
    instance
      .get('/tasks')
      .then(function (response) {
        setTasks(JSON.parse(response.data.Ok));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllTasks(); //On startup get all tasks
  }, []);

  useEffect(() => {
    let newBody = tasks.map(
      (task: { id: number; name: number | string; add_time: string; status: string }) => {
        let status =
          task.status === 'COMPLETED' ? (
            <IconCheck color="green" />
          ) : task.status == 'WORKING' ? (
            <IconRefresh color="orange" />
          ) : (
            <IconClockPause color="red" />
          );
        return [task.id, task.name, task.add_time, status];
      }
    );
    setBody(newBody);
  }, [tasks]); //when tasks change, update the body

  const tableData = {
    caption: 'Your Tasks',
    head: ['Id', 'File', 'Add Time', 'Status'],
    body: body,
  };
  return (
    <>
      <Card shadow="xs" padding="md" radius="md" withBorder>
        <Text fw={500} size="lg">
          Tasks
        </Text>
        <Table.ScrollContainer minWidth={rem(250)}>
          <Table
            captionSide="bottom"
            data={tableData}
            withColumnBorders
            highlightOnHover
            striped
          ></Table>
        </Table.ScrollContainer>
      </Card>
    </>
  );
}