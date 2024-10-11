'use client';

import Navigation from '@/component/common/navigation';
import styles from './setting.module.scss';
import Image from 'next/image';
import { RightArrow } from '../../../../public/arrow';
import ModalContainer from '@/component/common/modalContainer';
import ModalPortal from '@/component/common/modalPortal';
import { useModal } from '@/hooks/useModal';
import LogoutModal from '@/component/profile/logoutModal';

export default function ProfileSetting() {
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  return (
    <div className={styles.Container}>
      <Navigation title="설정" />
      <div className={styles.verticalLine}></div>
      <div className={styles.section}>
        <h2>계정</h2>
        <div className={styles.outContainer}>
          <div className={styles.widthdraw}>
            <p>회원 탈퇴</p>
            <Image
              src={RightArrow}
              alt="오른쪽 화살표"
              width={8.46}
              height={14.5}
            />
          </div>
          <div className={styles.widthdraw}>
            <p>로그아웃</p>
            <Image
              src={RightArrow}
              alt="오른쪽 화살표"
              width={8.46}
              height={14.5}
              onClick={handleOpenModal}
            />
          </div>
        </div>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <LogoutModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
