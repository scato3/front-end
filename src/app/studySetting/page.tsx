import Navigation from '@/component/common/navigation';
import styles from './studySetting.module.scss';
import { Suspense } from 'react';
import StudySettingClient from './studySettingClient';

export default function StudySetting() {
  return (
    <Suspense>
      <div className={styles.Container}>
        <Navigation title="스터디 설정" />
        <div className={styles.verticalLine}></div>
        <StudySettingClient />
      </div>
    </Suspense>
  );
}
