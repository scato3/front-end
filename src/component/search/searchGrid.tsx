import {
  IconAll,
  IconClock,
  IconCheckMark,
  IconRecentCalendar,
} from '../../../public/recent';
import Image from 'next/image';
import styles from './searchGrid.module.scss';
import { useRouter } from 'next/navigation';

export default function SearchGrid() {
  const router = useRouter();

  const icons = [
    { src: IconAll, alt: '전체', path: '/studyList?type=all' },
    { src: IconClock, alt: '마감임박', path: '/studyList?type=deadline' },
    {
      src: IconCheckMark,
      alt: '승인없는',
      path: '/studyList?type=quick',
    },
    { src: IconRecentCalendar, alt: '신규', path: '/studyList?type=recent' },
  ];

  return (
    <div className={styles.gridContainer}>
      {icons.map((icon, index) => (
        <div key={index} onClick={() => router.push(icon.path)}>
          <div className={styles.imageContainer}>
            <Image src={icon.src} alt={icon.alt} width={33} height={33} />
          </div>
          <div>
            <p className={styles.altText}>{icon.alt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
