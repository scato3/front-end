import styles from './deleteModal.module.scss';
import { useDeleteStudy } from '@/apis/study/delete';
import { useAlert } from '@/context/alertProvider';
import { useRouter } from 'next/navigation';

interface DeleteModalProps {
  studyId: number;
  handleCloseModal: () => void;
}

export default function DeleteModal({
  studyId,
  handleCloseModal,
}: DeleteModalProps) {
  const { mutate } = useDeleteStudy();
  const { showAlert } = useAlert();
  const router = useRouter();

  const handleDelete = () => {
    mutate(studyId, {
      onSuccess: () => {
        router.push('./');
        handleCloseModal();
      },
      onError: (error) => {
        showAlert(error.message);
      },
    });
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <p>스터디를 삭제하시겠습니까?</p>
      </div>
      <div className={styles.ButtonContainer}>
        <button className={styles.CancelButton} onClick={handleCloseModal}>
          취소
        </button>
        <button className={styles.ConfirmButton} onClick={handleDelete}>
          확인
        </button>
      </div>
    </div>
  );
}
