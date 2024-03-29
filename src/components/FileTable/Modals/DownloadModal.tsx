import { $currentFileInfo, $currentSelectedId, $token } from '@/stores/user';
import { API_URL } from '@/utils/API_URL';
import { instance } from '@/utils/api';
import { Button, Flex, Group, Modal, Text, rem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useStore } from '@nanostores/react';
import { IconCheck, IconDownload } from '@tabler/icons-react';
import { useEffect } from 'react';

interface FileInfos {
  filename: string;
  last_download: string | null;
  locally_stored: boolean | null;
  type: boolean;
}

function downloadFile(id) {
  //not stored locally
  instance
    .get('/downloadFile/' + id)
    .then((response) => {
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

export default function DownloadModal({ openedModalDownload, closeDownload, ...props }) {
  const currentSelectedId = useStore($currentSelectedId);
  const currentFileInfo = useStore($currentFileInfo);

  return (
    <>
      <Modal opened={openedModalDownload} onClose={closeDownload} title="Download file">
        <Group justify="center">
          {currentFileInfo?.locally_stored ? (
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
            {currentFileInfo?.locally_stored ? (
              <a
                href={API_URL + '/downloadLocalFile/' + $token.get() + '/' + currentSelectedId}
                download
              >
                <Button
                  color="green"
                  leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
                >
                  Download local
                </Button>
              </a>
            ) : (
              <Button
                color="green"
                onClick={() => {
                  downloadFile(currentSelectedId);
                  closeDownload();
                }}
                leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
              >
                Download
              </Button>
            )}
          </Flex>
        </Group>
      </Modal>
    </>
  );
}
