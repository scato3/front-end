import { IconCheck } from '../../../public/icons';
import Image from 'next/image';
import styles from './joinStudyModal.module.scss';

interface MessageType {
  message: string;
}

export default function CheckModal({ message }: MessageType) {
  return (
    <div className={styles.Container}>
      <Image src={IconCheck} width={28} height={28} alt="확인 이미지" />
      <p>{message}</p>
    </div>
  );
}
