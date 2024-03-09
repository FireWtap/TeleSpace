import { $currentDir } from '@/stores/user';
import { getDirectoryName, instance } from '@/utils/api';
import { Box, Button, Paper, Table, Title } from '@mantine/core';
import { IconArrowBack, IconCheck, IconFile, IconFolder, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import UploadModal from '../UploadModal/UploadModal';

function formatBytes(a, b = 2) {
  if (!+a) return '0 Bytes';
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'][d]}`;
}

const loadFiles = (dir, f) => {
  instance
    .get('/listDirectory/' + dir)
    .then((response) => {
      console.log(response.data?.Ok);
      const data = JSON.parse(response.data?.Ok).map((file) => {
        return (
          <Table.Tr key={file.id}>
            <Table.Td>{file.type ? <IconFolder /> : <IconFile />}</Table.Td>
            <Table.Td>{file.filename.replace(/^.*[\\/]/, '')}</Table.Td>
            <Table.Td>{!file.type ? formatBytes(file.original_size) : ''}</Table.Td>
            <Table.Td>{file.upload_time}</Table.Td>
            <Table.Td>{file.last_download == null ? 'Never' : file.last_download}</Table.Td>
            <Table.Td>
              {file.locally_stored == null ||
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

function FileTable() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadFiles($currentDir.get(), setFiles);
  }, []); //OnMount, Load directory content

  return (
    // JSX code for your component's UI goes here
    <>
      <Paper maw="50%" shadow="xl" p="xl" m={10} withBorder>
        <Box display="flex" mt={5} mb={5}>
          {$currentDir.get() != -1 ? (
            <Button variant="outline">
              <IconArrowBack />{' '}
            </Button>
          ) : (
            <></>
          )}

          <Title>
            {$currentDir.get() == -1 ? 'Root Directory' : getDirectoryName($currentDir.get())}
          </Title>
        </Box>

        <Table.ScrollContainer minWidth={500}>
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
