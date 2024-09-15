import { IconCheck } from '../../../public/icons';
import Image from 'next/image';
import styles from './joinStudyModal.module.scss';

export default function CreateModal() {
  return (
    <div className={styles.Container}>
      <Image src={IconCheck} width={28} height={28} alt="확인 이미지" />
      <p>쇼터디가 생성되었어요!</p>
    </div>
  );
}
