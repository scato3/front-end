import styles from './step.module.scss';
import Navigation from '../common/navigation';
import { useRouter } from 'next/navigation';
import { IconCheck } from '../../../public/icons';
import Image from 'next/image';
import { FilterDataType } from '@/types/fastMatching/filterType';
import { useEffect } from 'react';
import FilterCard from '../card/filterCard';
import { IconReset } from '../../../public/icons';
import NoStudy from '../common/noStudy';
import Button from '../common/button';

interface ILastPage {
  onBefore: () => void;
  data?: FilterDataType;
}

export default function LastPage({ onBefore, data }: ILastPage) {
  const router = useRouter();

  useEffect(() => {
    console.log(data);
  }, []);

  if (data?.totalCount === 0)
    return (
      <div className={styles.noStudyContainer}>
        <Navigation title="스피드 매칭" onClick={onBefore} />
        <NoStudy type="NoSpeed" />
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => {
              router.push('./');
            }}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    );

  return (
    <div className={styles.Container}>
      <Navigation title="스피드 매칭" onClick={onBefore} />
      <div className={styles.lastSeperator}>
        <div className={styles.LastImageBox}>
          <Image src={IconCheck} width={21.05} height={15.53} alt="check" />
        </div>
      </div>
      <div className={styles.LastTopTextContainer}>
        <p className={styles.LastTopP}>나에게 적합한 스터디들이에요.</p>
        <p className={styles.LastBottomP}>
          옆으로 넘겨 추천 스터디를 확인하고, 원하는 스터디에 바로 입장해볼까요?
        </p>
      </div>
      <div className={styles.resetContainer}>
        <p>다시 추천받기</p>
        <Image src={IconReset} width={25} height={15} alt="이미지" />
      </div>
      <FilterCard data={data} />
      <p
        className={styles.LastTextButton}
        onClick={() => router.push('./studyList')}
      >
        직접 스터디 찾기
      </p>
    </div>
  );
}
