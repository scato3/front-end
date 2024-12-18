'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../chat.module.scss';

import { IconMegaPhone } from '../../../../public/icons';
import { ArrowDown } from '../../../../public/arrow';
import { IconSearchCheck } from '../../../../public/footer';
import { useGetFindChat } from '@/apis/chat/chat';

export const ChatNotice = ({
  isSearchActive,
  studyId,
}: {
  isSearchActive: boolean;
  studyId: number;
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: searchData, refetch } = useGetFindChat(studyId, {
    findText: searchQuery,
    startIndex: 105,
  });

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      refetch();
      console.log(searchData);
    }
  };

  return (
    <div className={styles.noticeContainer}>
      {!isSearchActive ? (
        <>
          <Image
            src={IconMegaPhone}
            alt="메가폰"
            className={styles.megaPhoneImage}
          />
          <p>채팅창 상단 고정 내용</p>
          <Image
            src={ArrowDown}
            alt="아래 화살표"
            className={styles.ArrowDownImage}
          />
        </>
      ) : (
        <div className={styles.expandedContainer}>
          <Image
            src={IconSearchCheck}
            alt="검색 아이콘"
            className={styles.searchIcon}
          />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery} // 상태 연결
            onChange={(e) => setSearchQuery(e.target.value)} // 입력값 업데이트
            onKeyDown={handleSearchSubmit} // 엔터 이벤트 처리
            className={styles.searchInput}
          />
          <Image src={ArrowDown} alt="화살표" className={styles.arrowUp} />
          <Image src={ArrowDown} alt="화살표" className={styles.arrowDown} />
        </div>
      )}
    </div>
  );
};
