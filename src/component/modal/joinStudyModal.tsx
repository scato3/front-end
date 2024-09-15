import { IconCheck, IconCaution } from '../../../public/icons';
import Image from 'next/image';
import styles from './joinStudyModal.module.scss';

interface JoinStudyModalProps {
  message: string;
}

export default function JoinStudyModal({ message }: JoinStudyModalProps) {
  return (
    <div className={styles.Container}>
      {message === '이미 참가중인 사용자입니다.' ? (
        <div className={styles.imageContainer}>
          <Image src={IconCaution} alt="caution 이미지" />
        </div>
      ) : (
        <Image src={IconCheck} width={28} height={28} alt="확인 이미지" />
      )}
      <p>{message}</p>
    </div>
  );
}
