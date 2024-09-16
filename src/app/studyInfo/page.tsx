import StudyInfoClient from './studyInfoClient';
import Navigation from '@/component/common/navigation';
import Image from 'next/image';
import styles from './studyInfo.module.scss';
import { IconHoriz } from '../../../public/icons';

export default function StudyInfo() {
  return (
    <div className={styles.Container}>
      <Navigation title="Study Info" />
      <Image src={IconHoriz} alt="horiz" className={styles.horiz} />
      <div className={styles.separator}></div>
      <StudyInfoClient />
    </div>
  );
}
