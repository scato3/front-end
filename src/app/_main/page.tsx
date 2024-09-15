'use client';

import styles from './main.module.scss';
import MainHeader from '@/component/common/mainHeader';

import { useRouter } from 'next/navigation';

import ButtonBox from '@/component/main/buttonBox';
import { BtnArrowSm } from '../../../public/arrow';
import Image from 'next/image';
import { useGetCard } from '@/apis/card/getCard';
import SpeedMatchingBtn from '@/component/common/speedMathcingBtn';
import { CardType } from '@/types/card/cardType';
import Card from '@/component/card/card';
import NoStudy from '@/component/common/noStudy';

export default function Main() {
  const router = useRouter();

  const data = { orderType: 'recent' };
  const { data: cardData } = useGetCard('recent', data);

  return (
    <div className={styles.Container}>
      <div className={styles.MainSection}>
        <MainHeader />
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
          {cardData && cardData.data.length > 0 ? (
            cardData.data
              .slice(0, 3)
              .map((data: CardType) => <Card data={data} key={data.id} />)
          ) : (
            <div className={styles.NoStudyContainer}>
              <NoStudy />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
