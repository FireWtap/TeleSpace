//if file locally available then ask for direct download and direct download it from deleteLocalFile
//if file isn't locally available then ask for download and download it from downloadFile function

import { instance } from '@/utils/api';
import { Button, Flex, Group, Menu, Modal, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconDownload, IconTrash } from '@tabler/icons-react';

function downloadFile(id) {
  //not stored locally
  console.log('Downloading file with id:', id);
  instance
    .get('/downloadFile/' + id)
    .then((response) => {
      console.log(response);
      showNotification({
        title: 'Download added to queue',
        message: 'The download has been added to the queue. \n Check your dashboard for updates',
        icon: <IconCheck />,
        color: 'green',
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
}

function downloadLocalFile(id) {
  console.log('locally downloading file with id:', id);
  instance
    .get('/downloadLocalFile/' + id)
    .then((response) => {
      console.log(response);
      showNotification({
        title: 'Download started',
        message: 'Downloading...',
        icon: <IconCheck />,
        color: 'green',
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
}

const DownloadFilePopover = (id, type, locallyAvailable, onSubmit) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Download file">
        <Group justify="center">
          {locallyAvailable ? (
            <Text size="xs">
              The file is locally available. Do you want to download it directly?
            </Text>
          ) : (
            <Text size="xs">
              The file isn't locally available. We will need to run some magic in the background to
              get it for you. You will be notified when the file is ready to be downloaded.
            </Text>
          )}

          <Flex gap="md">
            <Button
              color="green"
              onClick={() => {
                locallyAvailable ? downloadLocalFile(id) : downloadFile(id);
                close();
              }}
              leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
            >
              Download
            </Button>
            <Button onClick={() => close()}>Cancel</Button>
          </Flex>
        </Group>
      </Modal>
      <Menu.Item
        onClick={() => {
          open();
        }}
        leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
      >
        Download
      </Menu.Item>
    </>
  );
};
export default DownloadFilePopover;
