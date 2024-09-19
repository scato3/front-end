import styles from './bubbleCard.module.scss';
import Image from 'next/image';
import { IconPeople, IconCalendar } from '../../../public/card';
import { useEffect, useState } from 'react';
import { StudyCardType } from '@/types/card/getCardType';
import { formatDate } from '@/utils/dateformat';
import { formatToTwoDigits } from '@/utils/formatTwoDigit';
import { RightArrow } from '../../../public/arrow';
import { useRouter } from 'next/navigation';

export default function BubbleCard({ data }: StudyCardType) {
  const router = useRouter();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setRating(data.progress_todo.percent);
    }, 200);

    return () => {
      setRating(0);
    };
  }, []);

  return (
    <div className={styles.Container}>
      <h2>{data.title}</h2>
      <div className={styles.infoContainer}>
        <div className={styles.people}>
          <Image src={IconPeople} alt="사람 이미지" />
          <p>
            {data.cur_participants_num}/{data.max_participants_num}
          </p>
        </div>
        <div className={styles.date}>
          <Image src={IconCalendar} alt="달력 이미지" />
          <p>
            {formatDate(data.start_date)} ~ {formatDate(data.end_date)}
          </p>
        </div>
      </div>
      <div className={styles.successContainer}>
        <div className={styles.success}>
          <p>오늘 완료</p>
          <span>{formatToTwoDigits(data.progress_todo.complete_num)}</span>
        </div>
        <div className={styles.success}>
          <p>미완료</p>
          <span>
            {formatToTwoDigits(
              data.progress_todo.total_num - data.progress_todo.complete_num
            )}
          </span>
        </div>
        <div className={styles.ratingHeader}>
          <p>{data.progress_todo.percent}</p>
        </div>
        <div className={styles.ratingBox}>
          <div
            className={`${styles.ratingBar} ${
              rating > 0 ? styles.ratingBarFilled : ''
            }`}
            style={{ width: `${rating}%` }}
          ></div>
        </div>
      </div>
      <Image
        src={RightArrow}
        alt="화살표"
        className={styles.arrow}
        onClick={() => {
          router.push(`./studyInfo?studyId=${data.id}`);
        }}
      />
    </div>
  );
}
