'use client';

import { useEffect, useState } from 'react';
import styles from './situation.module.scss';
import { CardType } from '@/types/card/cardType';
import { useGetRegisteredStudy } from '@/apis/profile/userProfile';
import Card from '@/component/card/card';
import NoStudy from '@/component/common/noStudy';
import { useRouter, useSearchParams, notFound } from 'next/navigation';

const tabs = [
  { label: '참여신청', value: 'before' },
  { label: '참여중', value: 'progress' },
  { label: '완료', value: 'done' },
];

export default function ProfileSitClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get('tab') || 'before';

  const [activeTab, setActiveTab] = useState(initialTab);
  const { data, refetch } = useGetRegisteredStudy(activeTab);

  if (initialTab && !tabs.some((tab) => tab.value === initialTab)) {
    notFound();
  }

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    router.replace(`?tab=${value}`);
  };

  useEffect(() => {
    refetch();
  }, [activeTab]);

  const getNoStudyType = () => {
    switch (activeTab) {
      case 'before':
        return 'NoBefore';
      case 'progress':
        return 'NotProgress';
      case 'done':
        return 'NoDone';
    }
  };

  return (
    <>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={`${styles.tab} ${
              activeTab === tab.value ? styles.active : ''
            }`}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
          </div>
        ))}
        <div
          className={styles.indicator}
          style={{
            transform: `translateX(${
              tabs.findIndex((tab) => tab.value === activeTab) * 100
            }%)`,
          }}
        />
      </div>
      <div className={styles.section}>
        {data?.totalCount > 0 && (
          <h2>총 {data?.totalCount}개의 쇼터디에 신청했어요.</h2>
        )}
        <div className={styles.CardSection}>
          {data && data?.data.length > 0 ? (
            data?.data.map((data: CardType) => (
              <Card data={data} key={data.id} gray={true} />
            ))
          ) : (
            <div className={styles.NoStudyContainer}>
              <NoStudy type={getNoStudyType()} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
