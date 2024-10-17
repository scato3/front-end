'use client';

import { Suspense, useEffect, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/component/common/navigation';
import FilterOpenBtn from '@/component/filter/filterOpenBtn';
import StudyOverView from '@/component/studyList/studyOverView';
import FilterSwiper from '@/component/filter/filterSwiper';
import { defaultCardData } from '@/data/cardInitialData';
import { useGetCard } from '@/apis/card/getCard';
import Card from '@/component/card/card';
import { CardType } from '@/types/card/cardType';
import NoStudy from '@/component/common/noStudy';
import { GetCardType } from '@/types/card/getCardType';
import styles from './studyList.module.scss';

function StudyListComponent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('전체');

  const tab = searchParams.get('tab');
  const type = searchParams.get('type');

  const initialData = {
    ...defaultCardData,
    category: tab === '전체' ? '' : tab || defaultCardData.category,
    quickMatch: type === 'quick' ? 'quick' : 'approval',
  };

  const methods = useForm<GetCardType>({
    defaultValues: initialData,
  });

  const [
    quickMatch,
    category,
    startDate,
    duration,
    minParticipants,
    maxParticipants,
    tendency,
    orderType,
    recruitStatus,
  ] = useWatch({
    control: methods.control,
    name: [
      'quickMatch',
      'category',
      'startDate',
      'duration',
      'minParticipants',
      'maxParticipants',
      'tendency',
      'orderType',
      'recruitStatus',
    ],
  });

  const getTitle = () => {
    switch (type) {
      case 'quick':
        return '전체';
      case 'recent':
        return '신규 쇼터디';
      case 'deadline':
        return '마감 임박';
      case 'all':
      default:
        return '전체';
    }
  };

  const { data, refetch } = useGetCard(
    type === 'quick' ? 'all' : type || 'all',
    {
      quickMatch,
      category,
      startDate,
      duration,
      minParticipants,
      maxParticipants,
      tendency,
      orderType,
      recruitStatus,
    }
  );

  // tab이 변경되면 category 필드 값을 설정
  useEffect(() => {
    setActiveTab(tab === null ? '전체' : tab);
    methods.setValue(
      'category',
      tab === '전체' ? '' : tab || defaultCardData.category
    );
  }, [tab, methods]);

  // 필터 값이 변경될 때마다 재검색 수행
  useEffect(() => {
    refetch();
    console.log(recruitStatus);
  }, [
    orderType,
    quickMatch,
    category,
    startDate,
    duration,
    minParticipants,
    maxParticipants,
    tendency,
    recruitStatus,
  ]);

  return (
    <FormProvider {...methods}>
      <div className={styles.Container}>
        <Navigation title={getTitle()} />
        <div className={styles.TopSection}>
          <FilterSwiper activeTab={activeTab} setActiveTab={setActiveTab} />
          <FilterOpenBtn />
          <StudyOverView totalCount={data?.totalCount || 0} />
        </div>
        <div className={styles.ItemSection}>
          <div className={styles.CardSection}>
            {data && data.data?.length > 0 ? (
              data.data.map((data: CardType) => (
                <Card data={data} key={data.id} />
              ))
            ) : (
              <div className={styles.NoStudyContainer}>
                <NoStudy />
              </div>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default function StudyList() {
  return (
    <Suspense>
      <StudyListComponent />
    </Suspense>
  );
}
