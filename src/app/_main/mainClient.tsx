'use client';

import styles from './main.module.scss';
import { useRouter } from 'next/navigation';
import ButtonBox from '@/component/main/buttonBox';
import { BtnArrowSm } from '../../../public/arrow';
import Image from 'next/image';
import SpeedMatchingBtn from '@/component/common/speedMathcingBtn';
import { CardType } from '@/types/card/cardType';
import Card from '@/component/card/card';
import NoStudy from '@/component/common/noStudy';

interface MainClientProps {
  cardData: { data: CardType[] };
}

export default function MainClient({ cardData }: MainClientProps) {
  const router = useRouter();

  return (
    <>
      <div className={styles.MainSection}>
        <div className={styles.SpeedBtnBox}>
          <SpeedMatchingBtn />
        </div>
        <div className={styles.ButtonBox}>
          <ButtonBox />
        </div>
      </div>
      <div className={styles.ItemSection}>
        <div className={styles.ItemHeader}>
          <h2>신규 쇼터디</h2>
          <div
            className={styles.BtnContainer}
            onClick={() => {
              router.push('./studyList');
            }}
          >
            더보기
            <Image src={BtnArrowSm} width={19} height={19} alt="더보기" />
          </div>
        </div>
        <div className={styles.CardSection}>
          {cardData?.data && cardData.data.length > 0 ? (
            cardData.data.map((data: CardType) => (
              <Card data={data} key={data.id} />
            ))
          ) : (
            <div className={styles.NoStudyContainer}>
              <NoStudy />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
