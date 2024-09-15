import styles from './mainHeader.module.scss';
import Image from 'next/image';
import { IconNotification } from '../../../public/icons';

export default function MainHeader() {
  return (
    <div className={styles.Container}>
      <p className={styles.Title}>SHOWTUDY</p>
      <Image
        className={styles.iconBell}
        src={IconNotification}
        width={33}
        height={33}
        alt="bell"
      />
    </div>
  );
}
