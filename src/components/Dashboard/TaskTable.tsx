import { Card, CardSection, Flex, List, Paper, Stack, Table, Text, ThemeIcon, rem } from '@mantine/core';
import { IconCheck, IconCircleCheck, IconCircleDashed, IconClockPause, IconRefresh } from '@tabler/icons-react';
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
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          ) : task.status == 'WORKING' ? (
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCircleDashed style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          ) : (
            <ThemeIcon color="red" size={24} radius="xl">
              <IconClockPause color="red" />
            </ThemeIcon>
          );
        const filename =
          task.filename.length <= 35 ? task.filename : `${task.filename.slice(0, 35)}...`;
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

        {/* <Table.ScrollContainer minWidth={rem(250)}>
          <Table
            captionSide="bottom"
            data={tableData}
            withColumnBorders
            highlightOnHover
            striped
          />
        </Table.ScrollContainer> */}
        <List
          spacing="xs"
          size="sm"
          mt="lg"
          center
        >
                {
                  tableData.body.map((a) => (

                        <List.Item
                          key={a[0]}
                          icon={
                            a[3]
                          }
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Text me="sm">{a[1]}</Text>
                            <Text c="dimmed" size="sm">{a[2]}</Text>
                          </div>
                        </List.Item>
                    ))
                }
        </List>

    </>
  );
}
