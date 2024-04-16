import React from "react";

interface Props {
  children: React.ReactNode;
  handleCloseModal?: () => void;
}

export default function ModalContainer({ children, handleCloseModal }: Props) {
  const closeModalHandler = handleCloseModal || (() => {});

  return <div onClick={closeModalHandler}>{children}</div>;
}
