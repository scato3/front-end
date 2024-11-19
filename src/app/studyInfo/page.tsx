import StudyInfoClient from './studyInfoClient';
import styles from './studyInfo.module.scss';
import { Suspense } from 'react';

export default function StudyInfo() {
  return (
    <div className={styles.Container}>
      <Suspense>
        <StudyInfoClient />
      </Suspense>
    </div>
  );
}
