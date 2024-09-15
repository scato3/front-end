'use client';

import Navigation from '@/component/common/navigation';
import styles from './searchResult.module.scss';

import FilterOpenBtn from '@/component/filter/filterOpenBtn';
import StudyOverView from '@/component/studyList/studyOverView';
import FilterSwiper from '@/component/filter/filterSwiper';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { defaultCardData } from '@/data/cardInitialData';
import { useSearchParams } from 'next/navigation';
import { useGetCard } from '@/apis/card/getCard';
import Card from '@/component/card/card';
import { CardType } from '@/types/card/cardType';
import NoStudy from '@/component/common/noStudy';
import { GetCardType } from '@/types/card/getCardType';
import SearchBox from '@/component/search/searchBox';

export default function SearchResult() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('전체');

  const tab = searchParams.get('tab');
  const searchQuery = searchParams.get('search');

  const initialData = {
    ...defaultCardData,
    category: tab === '전체' ? '' : tab || defaultCardData.category,
    search: searchQuery || '',
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
    ],
  });

  const { data, refetch } = useGetCard(orderType, {
    quickMatch,
    category,
    startDate,
    duration,
    minParticipants,
    maxParticipants,
    tendency,
    orderType,
    search: searchQuery || '',
  });

  useEffect(() => {
    setActiveTab(tab === null ? '전체' : tab);
    methods.setValue(
      'category',
      tab === '전체' ? '' : tab || defaultCardData.category
    );
  }, [tab, methods]);

  useEffect(() => {
    refetch();
  }, [
    orderType,
    quickMatch,
    category,
    startDate,
    duration,
    minParticipants,
    maxParticipants,
    tendency,
    refetch,
  ]);

  return (
    <FormProvider {...methods}>
      <div className={styles.Container}>
        <Navigation title="신규 쇼터디" />
        <div className={styles.TopSection}>
          <SearchBox />
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
