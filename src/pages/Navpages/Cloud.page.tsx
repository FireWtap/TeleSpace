import FileTable from '@/components/FileTable/FileTable';
import UploadModal from '@/components/UploadModal/UploadModal';
import { Button } from '@mantine/core';
import React, { useState } from 'react';

export default function Cloud() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div>
      <h1>Cloud</h1>
      <Button onClick={openModal}>Upload</Button>
      <UploadModal opened={isModalOpen} onClose={closeModal} />
      <FileTable />
    </div>
  );
}
