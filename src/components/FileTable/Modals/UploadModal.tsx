import { Button, Group, Modal, Stack, Text, rem, CloseButton, LoadingOverlay } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconFile, IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import '@mantine/dropzone/styles.css';
import { formatBytes } from '@/utils/function_utils';
import { instance } from '@/utils/api';
import { $currentDir } from '@/stores/user';
import { showNotification } from '@mantine/notifications';

export default function UploadModal({ opened, onClose, onSubmit, ...props }) {
  const [filesList, setFilesList] = useState([]);
  const [filesStackList, setFilesStackList] = useState([]);
  // const [loadingVisible, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggle = () => setIsLoading((v) => !v);
  const resetModal = () => {
    setFilesList([]);
    setFilesStackList([]);
    setIsLoading(false);
  };
  const handleClose = () => {
    resetModal();
    onClose(); // Assuming onClose is a prop for handling modal close events
  };
  function onDrop(files) {
    setFilesList(files);

    //Generate button stack
    const buttons = files.map((file, index) => (
      <Button key={index} variant="default" rightSection={formatBytes(file.size)}>
        {file.name}
      </Button>
    ));
    setFilesStackList(buttons);
  }

  function uploadFiles() {
    //Loading overlay
    setIsLoading(true);

    //Array of promises
    const uploadPromises = filesList.map((f: File) => {
      return instance.post(
        'uploadFile',
        { file: f, dir: $currentDir.get(), filename: f.name },
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              console.log(progressEvent.loaded / progressEvent.total);
            }
          },
        }
      );
    });
    //Wait until all promises get satisfied
    Promise.all(uploadPromises)
      .then(function (responses) {
        setIsLoading(false);
        onSubmit();
        showNotification({
          title: 'Upload Scheduled',
          message:
            'All files have been successfully uploaded locally. \n They will be uploaded to Telegram as soon as possible.\n Check the dashbaord for updates.',
          icon: <IconCheck />,
          color: 'green',
        });

        handleClose();
      })
      .catch(function (error) {
        console.log("Errore durante l'upload di uno o più file", error);
      })
      .finally(function () {});
  }

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Upload New File">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />

        <Dropzone
          onDrop={(files) => onDrop(files)}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={10 * 1024 ** 3}
          maxFiles={3}
          {...props}
        >
          <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconUpload
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFile
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={3}>
                Attach files up to 10GB each. Max 3 files at once.
                <br /> Uploading new file will reset the list.
              </Text>
            </div>
          </Group>
        </Dropzone>
        {/* Stack for displaying buttons for each selected file */}
        <Stack mt={10}>{filesStackList}</Stack>
        <Button fullWidth mt={10} onClick={() => uploadFiles()}>
          Upload
        </Button>
      </Modal>
    </>
  );
}
