import { useState } from 'react';

export const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return {
    openModal,
    handleOpenModal,
    handleCloseModal,
  };
};
