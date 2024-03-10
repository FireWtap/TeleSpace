import { $currentDir } from '@/stores/user';
import { getDirectoryName, getParentDirectory, instance } from '@/utils/api';
import { Box, Button, Paper, Table, Title } from '@mantine/core';
import { IconArrowBack, IconCheck, IconFile, IconFolder, IconX } from '@tabler/icons-react';
import React, { Children, useEffect, useState } from 'react';
import UploadModal from '../UploadModal/UploadModal';
import { formatBytes } from '@/utils/function_utils';

const loadFiles = (dir, f) => {
  instance
    .get('/listDirectory/' + dir)
    .then((response) => {
      console.log(response.data?.Ok);
      const data = JSON.parse(response.data?.Ok).map((file) => {
        const filename = file.filename.replace(/^.*[\\/]/, '');
        return (
          <Table.Tr key={file.id}>
            <Table.Td>{file.type ? <IconFolder /> : <IconFile />}</Table.Td>
            <Table.Td>
              {!file.type ? (
                filename
              ) : (
                <a
                  style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => changeDir(file.id)}
                >
                  {filename}
                </a>
              )}
            </Table.Td>
            <Table.Td>{!file.type ? formatBytes(file.original_size) : ''}</Table.Td>
            <Table.Td>{file.upload_time}</Table.Td>
            <Table.Td>
              {file.type ? '' : file.last_download == null ? 'Never' : file.last_download}
            </Table.Td>
            <Table.Td>
              {file.type ? (
                ''
              ) : file.locally_stored == null ||
                file.locally_stored == false ||
                file.locally_stored == 0 ? (
                <IconX />
              ) : (
                <IconCheck />
              )}
            </Table.Td>
          </Table.Tr>
        );
      });
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

function FileTable() {
  const [files, setFiles] = useState([]);
  const [currentDir, setCurrentDir] = useState($currentDir.get());
  const [directoryName, setDirectoryName] = useState('Root Directory');

  useEffect(() => {
    console.log('Current dir' + $currentDir.get());
    loadFiles($currentDir.get(), setFiles);
    const unsubscribe = $currentDir.subscribe(setCurrentDir); // Aggiorna lo stato locale quando $currentDir cambia
    return () => unsubscribe();
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
    // JSX code for your component's UI goes here
    <>
      <Paper shadow="xl" p="xl" m={10} withBorder style={{ width: 'auto', overflow: 'hidden' }}>
        <Box display="flex" mt={5} mb={5}>
          {$currentDir.get() != -1 ? (
            <Button variant="outline" onClick={() => previousFolder()}>
              <IconArrowBack />{' '}
            </Button>
          ) : (
            <></>
          )}

          <Title>{directoryName}</Title>
        </Box>

        <Table.ScrollContainer minWidth={500} style={{ maxHeight: '50vh', overflowY: 'auto' }}>
          <Table striped highlightOnHover withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Type</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Original Size</Table.Th>
                <Table.Th>Upload Time</Table.Th>
                <Table.Th>Last Download</Table.Th>
                <Table.Th>Locally Stored</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{files}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </>
  );
}

export default FileTable;
