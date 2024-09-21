'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './manage.module.scss';

type TabType = 'requests' | 'members';

export default function StudyManageClient() {
  const [activeTab, setActiveTab] = useState<TabType>('requests'); // 기본값 설정
  const indicatorRef = useRef<HTMLDivElement>(null); // indicator 참조
  const tabRefs = {
    requests: useRef<HTMLDivElement>(null),
    members: useRef<HTMLDivElement>(null),
  };

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const activeTabRef = tabRefs[activeTab].current;
    if (activeTabRef && indicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeTabRef;
      indicatorRef.current.style.width = `${offsetWidth}px`;
      indicatorRef.current.style.transform = `translateX(${offsetLeft - 36}px)`;
    }
  }, [activeTab]);

  return (
    <>
      <div className={styles.tabContainer}>
        <div
          ref={tabRefs.requests}
          className={`${styles.tab} ${activeTab === 'requests' ? styles.active : ''}`}
          onClick={() => handleTabClick('requests')}
        >
          신청 내역
        </div>
        <div
          ref={tabRefs.members}
          className={`${styles.tab} ${activeTab === 'members' ? styles.active : ''}`}
          onClick={() => handleTabClick('members')}
        >
          참여 멤버
        </div>
        <div ref={indicatorRef} className={styles.indicator}></div>
        <div className={styles.vertical}></div>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.Image}></div>
        <div className={styles.description}>
          <p>닉네임이 스터디에 함께하길 원해요</p>
          <p>03-31 17:00 / 72시간 후 자동 거절</p>
        </div>
        <div className={styles.confirmContainer}>
          <div className={styles.normalBtn}>수락</div>
          <div className={styles.normalBtn}>거절</div>
        </div>
      </div>
    </>
  );
}
