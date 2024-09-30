import styles from './profile.module.scss';
import Image from 'next/image';
import { IconSetting } from '../../../public/icons';
import ProfileClient from './profileClient';
import { getMyProfile } from '@/apis/profile/userProfile';
import { cookies } from 'next/headers';

export default async function Profile() {
  const cookieStore = cookies();
  const token =
    cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string)
      ?.value || '';

  const data = await getMyProfile(token);

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
      <ProfileClient data={data} />
    </div>
  );
}
