import styles from './speedMatching.module.scss';
import { IconWhite } from '../../../public/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SpeedMatchingBtn() {
  const router = useRouter();

  return (
    <div
      className={styles.Container}
      onClick={() => {
        router.push('./fastMatching');
      }}
    >
      <p className={styles.TopText}>나에게 맞는 쇼터디를 빠르게 알아봐요!</p>
      <div className={styles.Bottom}>
        <Image src={IconWhite} width={27} height={27} alt="icon_bolt" />
        <p>스피드 매칭</p>
      </div>
    </div>
  );
}
