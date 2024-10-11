import Navigation from '@/component/common/navigation';
import styles from './setting.module.scss';
import { Suspense } from 'react';
import ProfileSettingClient from './settingClient';

export default function ProfileSetting() {
  return (
    <Suspense>
      <div className={styles.Container}>
        <Navigation title="설정" />
        <div className={styles.verticalLine}></div>
        <ProfileSettingClient />
      </div>
    </Suspense>
  );
}
