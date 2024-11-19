'use client';

import Image from 'next/image';
import styles from './setProfile.module.scss';
import { useRouter } from 'next/navigation';
import { WhiteArrow } from '../../../public/arrow';

export default function SetProfile() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <button className={styles.BackBtn} onClick={handleBackClick}>
          <Image alt="화살표" height={24} src={WhiteArrow} width={24} />
        </button>

        <h1 className={styles.Title}>시작하기</h1>
      </div>
    </div>
  );
}
