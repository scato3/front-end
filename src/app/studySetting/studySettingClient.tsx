'use client';

import styles from './studySetting.module.scss';
import { useModal } from '@/hooks/useModal';
import ModalContainer from '@/component/common/modalContainer';
import ModalPortal from '@/component/common/modalPortal';
import DeleteModal from '@/component/modal/deleteModal';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useGetJoinRequest } from '@/apis/study/joinRequest';

export default function StudySettingClient() {
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  const searchParams = useSearchParams();
  const router = useRouter();

  const studyId = Number(searchParams.get('studyId'));

  const { data } = useGetJoinRequest(studyId);

  return (
    <>
      <div className={styles.section}>
        <h2>스터디 정보</h2>
        <div className={styles.manage}>
          <p
            onClick={() => {
              router.push(`./studySetting/edit?studyId=${studyId}`);
            }}
          >
            스터디 수정하기
          </p>

          <div className={styles.membermanage}>
            <p
              onClick={() => {
                router.push(`./studySetting/manage?studyId=${studyId}`);
              }}
            >
              스터디 멤버 관리
            </p>
            {data && data?.data > 0 && <span>{data?.data}</span>}
          </div>
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
    </>
  );
}
