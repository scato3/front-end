import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../chat.module.scss';
import { IconArrow, IconMenu } from '../../../../public/icons';
import { IconSearch } from '../../../../public/footer';

interface NavigationBarProps {
  chatName: string;
  onMenuToggle: () => void;
}

export const ChatNavigation = ({
  chatName,
  onMenuToggle,
}: NavigationBarProps) => {
  const router = useRouter();

  return (
    <div className={styles.Navigation}>
      <Image
        src={IconArrow}
        alt="화살표 이미지"
        width={12.67}
        height={22}
        className={styles.arrowImage}
        onClick={() => router.back()}
      />
      <h2>{chatName}</h2>
      <Image
        src={IconMenu}
        alt="메뉴 아이콘"
        className={styles.menuImage}
        onClick={onMenuToggle}
      />
      <Image
        src={IconSearch}
        alt="서치 아이콘"
        width={18}
        height={18}
        className={styles.searchImage}
      />
    </div>
  );
};
