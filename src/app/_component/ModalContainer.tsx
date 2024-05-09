import React from "react";
import styles from "./ModalContainer.module.css";

interface Props {
  children: React.ReactNode;
  handleCloseModal?: () => void;
}

export default function ModalContainer({ children, handleCloseModal }: Props) {
  return (
    <div className={styles.container} onClick={handleCloseModal}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
