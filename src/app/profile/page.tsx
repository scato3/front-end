import styles from './profile.module.scss';
import Image from 'next/image';
import { IconSetting } from '../../../public/icons';
import ProfileClient from './profileClient';

export default async function Profile() {
  return (
    <div className={styles.Container}>
      <div className={styles.navigation}>
        마이페이지
        <Image
          src={IconSetting}
          alt="세팅 이미지"
          className={styles.settingImg}
        />
      </div>
      <ProfileClient />
    </div>
  );
}
