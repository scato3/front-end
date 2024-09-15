'use client';

import Image from 'next/image';
import styles from './card.module.scss';
import { CardType } from '@/types/card/cardType';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/dateformat';
import { IconCalendar, IconPeople } from '../../../public/card';

interface CardProps {
  data: CardType;
}

export default function Card({ data }: CardProps) {
  const router = useRouter();

  return (
    <div
      className={styles.container}
      onClick={() => {
        router.push(`/studyInfo?studyId=${data.id}`);
      }}
    >
      <div className={styles.cardBox}>
        <div className={styles.titleBox}>
          <p className={styles.flag}>{data?.category}</p>
          <p className={styles.title}>{data?.title}</p>
        </div>
        <div className={styles.tagBox}>
          {data?.additionalInfos?.map((tag: string) => {
            return (
              <span key={tag} className={styles.tagTitle}>
                # {tag}
              </span>
            );
          })}
        </div>
        <div className={styles.detailBox}>
          <Image src={IconPeople} width={24} height={24} alt="사람아이콘" />
          <p className={styles.detail}>
            {data?.cur_participants_num}/{data?.max_participants_num}
          </p>
          <Image
            src={IconCalendar}
            width={24}
            height={24}
            alt="달력아이콘"
            className={styles.calendarImage}
          />
          <p className={styles.detail}>
            {formatDate(data?.start_date)} - {formatDate(data?.end_date)}
          </p>
        </div>
      </div>
    </div>
  );
}
