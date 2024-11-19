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
import { useRouter } from 'next/navigation';
import { removeCookie, getAppCookie } from '@/utils/cookie';

interface AlertContextType {
  alertMessage: string;
  showAlert: (message: string) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const router = useRouter();

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

  const handleOverlayClick = () => {
    const explore = getAppCookie('explore'); // 쿠키 값 가져오기

    if (explore === 'true') {
      // 문자열로 "true"인지 확인
      removeCookie('explore');
      router.push('/sign-in');
    }
    hideAlert(); // 알림 숨기기
  };

  return (
    <AlertContext.Provider value={{ alertMessage, showAlert, hideAlert }}>
      {children}
      {alertMessage && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
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
