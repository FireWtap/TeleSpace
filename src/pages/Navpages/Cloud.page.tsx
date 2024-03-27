import FileTable from '@/components/FileTable/FileTable';
import UploadModal from '@/components/FileTable/Modals/UploadModal';
import { $currentDir } from '@/stores/user';
import { getDirectoryName, instance } from '@/utils/api';
import { Button, DirectionContext, Group } from '@mantine/core';
import { useStore } from '@nanostores/react';
import { IconArrowBack } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

const getParentDirectory = async (id) => {
  try {
    const response = await instance.get('/getParentDirectory/' + id);
    if (response.data?.Ok !== undefined) {
      return response.data.Ok;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function Cloud() {
  const [isModalOpen, setModalOpen] = useState(false);
  const currentDir = useStore($currentDir);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [dirname, setDirname] = useState('Cloud');

  useEffect(() => {
    if (currentDir == -1) {
      setDirname('Cloud');
    } else {
      getDirectoryName(currentDir).then((name) => {
        setDirname(name);
      });
    }
  }, [currentDir]);

  return (
    <>
      <Group justify="space-between">
        <Group>
          {currentDir != -1 && (
            <Button
              onClick={() => {
                getParentDirectory(currentDir).then((dir) => {
                  $currentDir.set(dir);
                });
              }}
              radius={'xl'}
            >
              <IconArrowBack />
            </Button>
          )}
          <h1 style={{ textTransform: 'capitalize' }}>{dirname}</h1>
        </Group>
        <Button onClick={openModal}>Upload</Button>
      </Group>

      <UploadModal opened={isModalOpen} onClose={closeModal} />
      <FileTable></FileTable>

      {/*<FileTable />*/}
    </>
  );
}
