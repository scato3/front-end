import styles from './edit.module.scss';
import Navigation from '@/component/common/navigation';
import StudyEditClient from './studyEditClient';
import { Suspense } from 'react';

export default function StudyEdit() {
  return (
    <div className={styles.Container}>
      <Navigation title="스터디 수정" />
      <div className={styles.verticalLine}></div>
      <Suspense>
        <StudyEditClient />
      </Suspense>
    </div>
  );
}
