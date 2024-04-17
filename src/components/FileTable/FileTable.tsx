import { useStore } from '@nanostores/react';
import { Button, Group, Paper, Stack, Text, Title, rem } from '@mantine/core';
import { IconFile, IconFolder, IconFolderPlus, IconUpload } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { $currentDir, $currentFileInfo, $currentSelectedId } from '@/stores/user';
import { getDirectoryName, getFileInfo, getParentDirectory, instance } from '@/utils/api';
import UploadModal from './Modals/UploadModal';
import { formatBytes } from '@/utils/function_utils';
import NewFolderModal from './Modals/NewFolderModal';
import MenuToolTip from './MenuToolTip/MenuToolTip';
import classes from './FileTable.module.css';
import DownloadModal from './Modals/DownloadModal';
import DeleteModal from './Modals/DeleteModal';
import ClearCacheModal from './Modals/ClearCacheModal';
import RenameFileModal from './Modals/RenameModal';
import RenameModal from './Modals/RenameModal';

interface FileDetails {
  filename: string; // Nome del file
  id: number; // Identificativo unico del file
  last_download: string | null; // Data dell'ultima volta che il file è stato scaricato, può essere null
  locally_stored: boolean | null; // Indica se il file è memorizzato localmente, può essere null
  original_size: number; // Dimensione originale del file in byte
  parent_dir: string | null; // Directory padre del file, può essere null
  type: boolean; // Tipo del file, vero indica una certa categoria (ad es., directory o file eseguibile), falso un'altra
  upload_time: string; // Data di caricamento del file
  user: number; // Identificativo dell'utente che ha caricato il file
}

interface FileInfos {
  filename: string;
  last_download: string | null;
  locally_stored: boolean | null;
  type: boolean;
}

const loadFiles = (dir, f) => {
  instance
    .get(`/listDirectory/${dir}`)
    .then((response) => {
      const data = JSON.parse(response.data?.Ok);
      f(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeDir = (new_dir) => {
  $currentDir.set(new_dir);
};

function FileTable() {
  const [uploadModal, { open: openUpload, close: closeUpload }] = useDisclosure(false);

  const [files, setFiles] = useState<FileDetails[]>([]);

  const currentDir = useStore($currentDir);
  const currentSelectedId = useStore($currentSelectedId);
  const currentFileInfo = useStore($currentFileInfo);

  const [directoryName, setDirectoryName] = useState('Root Directory');
  const [isFolderModalOpen, { open: openModalFolder, close: closeModalFolder }] =
    useDisclosure(false);
  const [openedModalDownload, { open: openDownload, close: closeDownload }] = useDisclosure(false);
  const [openedModalDelete, { open: openModalDelete, close: closeModalDelete }] =
    useDisclosure(false);
  const [openedModalClearCache, { open: openModalClearCache, close: closeModalClearCache }] =
    useDisclosure(false);
  const [openedRenameModal, { open: openRenameModal, close: closeRenameModal }] =
    useDisclosure(false);

  useEffect(() => {
    loadFiles($currentDir.get(), setFiles);
  }, []);

  //aggiorna ogni volta che vediamo un nuovo id selezionato
  useEffect(() => {
    getFileInfo(currentSelectedId).then((info) => {
      if (info) {
        $currentFileInfo.set(info);
      }
    });
  }, [currentSelectedId]);

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
          .map((file, index) => (
              <Paper radius="lg" bg="whitesmoke" p={16} className={classes.Card}>
                <Group>
                  <IconFolder onClick={() => changeDir(file.id)} />
                  <Stack gap={0} onClick={() => changeDir(file.id)}>
                    <Title order={6}>{file.filename}</Title>
                    <Text size="xs">Created on: {file.upload_time.split(' ')[0]}</Text>
                  </Stack>
                  <MenuToolTip
                    onSubmit={() => loadFiles(currentDir, setFiles)}
                    id={file.id}
                    type="folder"
                    className={classes.MenuToolTip}
                    locally_stored={file.locally_stored}
                    download_modal={() => {}}
                    delete_modal={() => openModalDelete()}
                    clear_cache_modal={() => openModalClearCache()}
                    rename_modal={() => openRenameModal()}
                  />
                </Group>
              </Paper>
            ))}

        <Paper
          radius="lg"
          bg="whitesmoke"
          p={10}
          className={classes.Card}
          onClick={openModalFolder}
        >
          <Group>
            <IconFolderPlus />
            <Stack gap={0}>
              <Title mt={rem(15)} order={6} mb="md">
                Nuova Cartella
              </Title>
            </Stack>
          </Group>
        </Paper>
      </Group>
      <Group justify="space-between">
        <Title order={4} mb="sm" mt="xl">
          Files
        </Title>
        <Button
          leftSection={<IconUpload style={{ width: rem(15), height: rem(15) }} />}
          onClick={() => openUpload()}
        >
          Upload
        </Button>
      </Group>

      <Stack>
        {files
          .filter((f) => !f?.type)
          .map((file, index) => (
            //{"filename":"pescerossopep","id":2,"last_download":null,"locally_stored":null,"original_size":0,"parent_dir":null,"type":true,"upload_time":"2024-03-10 18:35:04","user":1}
            <Paper radius="lg" bg="whitesmoke" p={16}>
              <Group justify="space-between">
                <Group>
                  <IconFile />
                  <Stack gap={0}>
                    <Title order={6}>{file.filename.replace('./temp/', '')}</Title>
                    <Text size="xs">Created on: {file?.upload_time?.split(' ')[0]}</Text>
                    <Text size="xs">Size: {formatBytes(file?.original_size)}</Text>
                    <Text size="xs" color={!file?.locally_stored ? 'red' : 'green'}>
                      {!file?.locally_stored ? 'Not locally available' : 'Locally available'}
                    </Text>
                  </Stack>
                </Group>
                <MenuToolTip
                  onSubmit={() => loadFiles(currentDir, setFiles)}
                  id={file.id}
                  type="file"
                  className={classes.MenuToolTip}
                  locally_stored={file.locally_stored}
                  download_modal={() => openDownload()}
                  delete_modal={() => openModalDelete()}
                  clear_cache_modal={() => openModalClearCache()}
                  rename_modal={() => openRenameModal()}
                />
              </Group>
            </Paper>
          ))}
      </Stack>

      <NewFolderModal
        opened={isFolderModalOpen}
        onClose={closeModalFolder}
        onSubmit={() => loadFiles(currentDir, setFiles)}
      />
      <UploadModal
        opened={uploadModal}
        onClose={() => closeUpload()}
        onSubmit={() => loadFiles(currentDir, setFiles)}
      />
      <DownloadModal openedModalDownload={openedModalDownload} closeDownload={closeDownload} />
      <DeleteModal
        openedModalDelete={openedModalDelete}
        closeModalDelete={() => closeModalDelete()}
        currentFileInfo={currentFileInfo}
        onSubmit={() => loadFiles(currentDir, setFiles)}
      />
      <ClearCacheModal
        openedModalClearCache={openedModalClearCache}
        closeModalClearCache={closeModalClearCache}
        currentFileInfo={currentFileInfo}
        onSubmit={() => loadFiles(currentDir, setFiles)}
      />
      <RenameModal
        openedRenameModal={openedRenameModal}
        closeRenameModal={closeRenameModal}
        currentFileInfo={currentFileInfo}
        onSubmit={() => loadFiles(currentDir, setFiles)}
      />
    </>
  );
}

export default FileTable;
