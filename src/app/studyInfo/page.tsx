import StudyInfoClient from './studyInfoClient';
import styles from './studyInfo.module.scss';
import { Suspense } from 'react';

export default function StudyInfo() {
  return (
    <Suspense>
      <div className={styles.Container}>
        <StudyInfoClient />
      </div>
    </Suspense>
  );
}
