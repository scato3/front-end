import Navigation from '@/component/common/navigation';
import styles from './situation.module.scss';
import ProfileSitClient from './situationClient';
import { Suspense } from 'react';

export default function ProfileSit() {
  return (
    <Suspense>
      <div className={styles.Container}>
        <Navigation title="나의 스터디 현황" />
        <div className={styles.verticalLine}></div>
        <ProfileSitClient />
      </div>
    </Suspense>
  );
}
