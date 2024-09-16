'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import styles from '../styles/provider.module.scss';
import { IconCaution } from '../../public/icons';
import Image from 'next/image';

interface AlertContextType {
  alertMessage: string;
  showAlert: (message: string) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertMessage, setAlertMessage] = useState<string>('');

  const showAlert = (message: string) => setAlertMessage(message);
  const hideAlert = () => setAlertMessage('');

  useEffect(() => {
    if (alertMessage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; // 컴포넌트 언마운트 시 스크롤 복원
    };
  }, [alertMessage]);

  return (
    <AlertContext.Provider value={{ alertMessage, showAlert, hideAlert }}>
      {children}
      {alertMessage && (
        <div className={styles.overlay} onClick={hideAlert}>
          <div className={styles.alert} onClick={(e) => e.stopPropagation()}>
            <div className={styles.imageContainer}>
              <Image src={IconCaution} alt="caution 이미지" />
            </div>
            {alertMessage}
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert는 AlertProvider 내에서 사용되어야 합니다.');
  }
  return context;
};
