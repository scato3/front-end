'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './navigation.module.scss';
import { IconArrow } from '../../../public/icons';
import useFromStore from '@/store/userFrom';
import { IconHoriz } from '../../../public/icons';

interface NavigationProps {
  title: string;
  onClick?: () => void;
  horiz?: boolean;
}

export default function Navigation({ title, onClick, horiz }: NavigationProps) {
  const router = useRouter();
  const { from } = useFromStore();

  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else {
      if (from) {
        router.push(from);
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className={styles.Header}>
      <button className={styles.BackBtn} onClick={handleBackClick}>
        <Image alt="화살표" height={24} src={IconArrow} width={24} />
      </button>
      {horiz ? (
        <Image src={IconHoriz} alt="horiz" className={styles.horiz} />
      ) : null}
      <h1 className={styles.Title}>{title}</h1>
    </div>
  );
}
