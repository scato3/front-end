import React from "react";
import styles from "./ModalContainer.module.css";

interface Props {
  children: React.ReactNode;
  handleCloseModal?: () => void;
  bgDark?: boolean;
}

export default function ModalContainer({ children, handleCloseModal, bgDark=true }: Props) {
  return (
    <div  className={bgDark ? `${styles.container} ${styles.dark}` : styles.container} 
          onClick={handleCloseModal}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
