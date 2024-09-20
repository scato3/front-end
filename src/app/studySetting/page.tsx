'use client';

import Navigation from '@/component/common/navigation';
import styles from './studySetting.module.scss';
import { useModal } from '@/hooks/useModal';
import ModalContainer from '@/component/common/modalContainer';
import ModalPortal from '@/component/common/modalPortal';
import DeleteModal from '@/component/modal/deleteModal';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function StudySetting() {
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  const searchParams = useSearchParams();

  const studyId = searchParams.get('studyId')
    ? Number(searchParams.get('studyId'))
    : null;

  return (
    <Suspense>
      <div className={styles.Container}>
        <Navigation title="스터디 설정" />
        <div className={styles.section}>
          <h2>스터디 정보</h2>
          <div className={styles.manage}>
            <p>스터디 수정하기</p>
            <p>스터디 멤버 관리</p>
          </div>
          <p className={styles.delete} onClick={handleOpenModal}>
            스터디 삭제
          </p>
        </div>
        {openModal && studyId !== null && (
          <ModalPortal>
            <ModalContainer handleCloseModal={handleCloseModal}>
              <DeleteModal
                studyId={studyId}
                handleCloseModal={handleCloseModal}
              />
            </ModalContainer>
          </ModalPortal>
        )}
      </div>
    </Suspense>
  );
}
