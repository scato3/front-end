import React, { useEffect } from 'react';

import styles from './modal.module.scss';

interface Props {
  children: React.ReactNode;
  handleCloseModal?: () => void;
}

export default function ModalContainer({ children, handleCloseModal }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const closeModalHandler = handleCloseModal || (() => {});

  useEffect(() => {
    // 모달 열릴 때 스크롤 막기
    document.body.style.overflow = 'hidden';

    return () => {
      // 모달 닫힐 때 스크롤 복원
      document.body.style.overflow = '';
    };
  }, []);

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.Container} onClick={closeModalHandler}>
      <div onClick={handleContainerClick}>{children}</div>
    </div>
  );
}
