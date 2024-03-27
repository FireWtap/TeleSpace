import { $currentDir } from '@/stores/user';
import { useStore } from '@nanostores/react';
import { getDirectoryName, getParentDirectory, instance } from '@/utils/api';
import { Box, Button, Flex, Group, Menu, Paper, Stack, Table, Text, Title } from '@mantine/core';
import {
  IconArrowBack,
  IconCheck,
  IconFile,
  IconFold,
  IconFolder,
  IconFolderPlus,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import React, { Children, useEffect, useState } from 'react';
import UploadModal from './Modals/UploadModal';
import { formatBytes } from '@/utils/function_utils';
import NewFolderModal from './Modals/NewFolderModal';
import MenuToolTip from './MenuToolTip';
import classes from './FileTable.module.css';

const loadFiles = (dir, f) => {
  instance
    .get('/listDirectory/' + dir)
    .then((response) => {
      console.log(response.data?.Ok);
      const data = JSON.parse(response.data?.Ok);
      f(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeDir = (new_dir) => {
  console.log($currentDir.get());
  $currentDir.set(new_dir);
};

const previousFolder = async () => {
  const parentDir = await getParentDirectory($currentDir.get());
  changeDir(parentDir);
};

type ServerFile = any;
//poi lo sistemi

function FileTable() {
  const [files, setFiles] = useState<ServerFile[]>([]);
  const currentDir = useStore($currentDir);

  const [directoryName, setDirectoryName] = useState('Root Directory');

  //new folder modal
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const openModalFolder = () => setFolderModalOpen(true);
  const closeModalFolder = () => setFolderModalOpen(false);

  useEffect(() => {
    console.log('Current dir' + $currentDir.get());
    loadFiles($currentDir.get(), setFiles);
  }, []);

  useEffect(() => {
    const updateDirectoryName = async () => {
      if (currentDir == -1) {
        setDirectoryName('Root Directory');
      } else {
        const name = await getDirectoryName(currentDir);
        setDirectoryName(name || 'Unknown Directory'); // Gestisci il caso in cui `name` sia null o undefined
      }
    };
    updateDirectoryName();
    loadFiles(currentDir, setFiles); // Carica i file quando currentDir cambia
  }, [currentDir]); // Imposta currentDir come dipendenza dell'effect

  return (
    <>
      <Title order={4} mb="sm">
        Folders
      </Title>
      <Group>
        {files
          .filter((f) => f?.type)
          .map((file, index) => {
            //{"filename":"pescerossopep","id":2,"last_download":null,"locally_stored":null,"original_size":0,"parent_dir":null,"type":true,"upload_time":"2024-03-10 18:35:04","user":1}
            return (
              <Paper radius="lg" bg="whitesmoke" p={16} className={classes.Card}>
                <Group>
                  <IconFolder onClick={() => changeDir(file.id)} />
                  <Stack gap={0} onClick={() => changeDir(file.id)}>
                    <Title order={6}>{file.filename}</Title>
                    <Text size="xs">Created on: {file?.upload_time?.split(' ')[0]}</Text>
                  </Stack>
                  <MenuToolTip id={file.id} />
                </Group>
              </Paper>
            );
          })}

        <Paper radius="lg" bg="whitesmoke" p={16} className={classes.Card}>
          <Group>
            <IconFolderPlus />
            <Stack gap={0}>
              <Title order={6} mb="md">
                Nuova Cartella
              </Title>
            </Stack>
          </Group>
        </Paper>
      </Group>

      <Title order={4} mb="sm" mt="xl">
        Files
      </Title>
      <Stack>
        {files
          .filter((f) => !f?.type)
          .map((file, index) => {
            //{"filename":"pescerossopep","id":2,"last_download":null,"locally_stored":null,"original_size":0,"parent_dir":null,"type":true,"upload_time":"2024-03-10 18:35:04","user":1}
            return (
              <Paper radius="lg" bg="whitesmoke" p={16}>
                <Group>
                  <IconFile />
                  <Stack gap={0}>
                    <Title order={6}>{file.filename.replace('./temp/', '')}</Title>
                    <Text size="xs">Created on: {file?.upload_time?.split(' ')[0]}</Text>
                  </Stack>
                </Group>
              </Paper>
            );
          })}
      </Stack>
    </>
  );

  // return (
  //   // veramente troppo lungo
  //   <>
  //     <Box display="flex" mt={5} mb={5}>
  //       {currentDir != -1 ? (
  //         <Button variant="outline" onClick={() => previousFolder()}>
  //           <IconArrowBack />{' '}
  //         </Button>
  //       ) : (
  //         <></>
  //       )}
  //       <Group align="start" justify="space-between" w="100%">
  //         <Stack gap={0}>
  //           <Text>Currently on: </Text>
  //           <Title size="h3">{directoryName}</Title>
  //         </Stack>
  //         <Button leftSection={<IconPlus />} onClick={openModalFolder}>
  //           <IconFolder />
  //         </Button>
  //       </Group>
  //     </Box>

  //     <Table.ScrollContainer minWidth={500} style={{ maxHeight: '50vh', overflowY: 'auto' }}>
  //       <Table striped highlightOnHover withColumnBorders>
  //         <Table.Thead>
  //           <Table.Tr>
  //             <Table.Th>Type</Table.Th>
  //             <Table.Th>Name</Table.Th>
  //             <Table.Th>Original Size</Table.Th>
  //             <Table.Th>Upload Time</Table.Th>
  //             <Table.Th>Last Download</Table.Th>
  //             <Table.Th>Locally Stored</Table.Th>
  //             <Table.Th>Toolbox</Table.Th>
  //           </Table.Tr>
  //         </Table.Thead>
  //         <Table.Tbody>{files}</Table.Tbody>
  //       </Table>
  //     </Table.ScrollContainer>

  //     <NewFolderModal opened={isFolderModalOpen} onClose={closeModalFolder} />
  //   </>
  // );
}

export default FileTable;
