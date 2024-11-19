import styles from './logoutModal.module.scss';
import { IconBlackX, IconCheck } from '../../../public/icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CloseModalProps } from '@/types/modalHookType';
import { useRouter } from 'next/navigation';
import { removeCookie } from '@/utils/cookie';
import useAuthStore from '@/store/userauth';
import { useQueryClient } from '@tanstack/react-query';

export default function LogoutModal({ handleCloseModal }: CloseModalProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  const { setCheckLogin } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100 / 2);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 로그아웃
  useEffect(() => {
    if (isLoggedOut) {
      const timer = setTimeout(() => {
        setProgress(100);
      }, 500);

      const closeTimer = setTimeout(() => {
        handleCloseModal();
        router.push('/sign-in');
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [isLoggedOut]);

  const handleConfirm = () => {
    setIsLoggedOut(true);
    queryClient.clear();

    removeCookie(process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string);
    removeCookie(process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY as string);
    setCheckLogin(false);
    router.push('./sign-in');
    router.refresh();
  };

  return (
    <div
      className={`${styles.Container} ${isLoggedOut ? styles.smallContainer : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.header}>
        {isLoggedOut ? (
          <Image
            src={IconCheck}
            alt="완료 아이콘"
            className={styles.checkIcon}
          />
        ) : (
          <>
            <p>로그아웃</p>
            <Image
              src={IconBlackX}
              alt="종료"
              className={styles.iconX}
              onClick={handleCloseModal}
            />
          </>
        )}
      </div>
      {!isLoggedOut && (
        <>
          <div className={styles.seperator}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={styles.main}>
            <p>로그아웃 하시겠습니까?</p>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton} onClick={handleCloseModal}>
              취소
            </button>
            <button className={styles.confirmButton} onClick={handleConfirm}>
              확인
            </button>
          </div>
        </>
      )}
      {isLoggedOut && (
        <>
          <div className={styles.seperator}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={styles.logout}>
            <p>로그아웃 되었습니다.</p>
          </div>
        </>
      )}
    </div>
  );
}
