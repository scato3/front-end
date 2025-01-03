'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../chat.module.scss';
import { IconMegaPhone } from '../../../../public/icons';
import { ArrowDown } from '../../../../public/arrow';
import { IconSearchCheck } from '../../../../public/footer';
import { useGetFindChat } from '@/apis/chat/chat';
import { useChatStore } from '@/store/chatStore';

interface ChatNoticeProps {
  isSearchActive: boolean;
  studyId: number;
  handleSearchClick: (targetIndex: number) => Promise<void>;
  refetchTargetData: (options?: any) => Promise<any>;
}

export const ChatNotice = ({
  isSearchActive,
  studyId,
  handleSearchClick,
  refetchTargetData,
}: ChatNoticeProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    setSearchResults,
    setCurrentSearchIndex,
    searchResults,
    currentSearchIndex,
  } = useChatStore();

  const { refetch } = useGetFindChat(studyId, {
    findText: searchQuery,
    startIndex: searchResults[currentSearchIndex] || 0,
  });

  const handleSearchSubmit = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const result = await refetch();

      if (result.data?.indexList && result.data.indexList.length > 0) {
        // 검색 결과 저장
        setSearchResults(result.data.indexList);
        setCurrentSearchIndex(0);

        // 가장 큰 인덱스부터 0까지 모든 데이터를 한 번에 로드
        const maxIndex = Math.max(...result.data.indexList);
        await refetchTargetData({
          startIndex: maxIndex,
          findIndex: 0,
        }).then(() => {
          // 데이터 로드가 완료되면 첫 번째 검색 결과로 스크롤
          handleSearchClick(result.data.indexList[0]);
        });
      }
    }
  };

  const handleArrowClick = async (direction: 'up' | 'down') => {
    if (direction === 'up' && currentSearchIndex < searchResults.length - 1) {
      const nextIndex = currentSearchIndex + 1;
      setCurrentSearchIndex(nextIndex);
      const targetIndex = searchResults[nextIndex];
      await handleSearchClick(targetIndex);
    } else if (direction === 'down' && currentSearchIndex > 0) {
      const nextIndex = currentSearchIndex - 1;
      setCurrentSearchIndex(nextIndex);
      const targetIndex = searchResults[nextIndex];
      await handleSearchClick(targetIndex);
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            className={styles.searchInput}
          />
          <div className={styles.searchArrows}>
            <Image
              src={ArrowDown}
              alt="위로"
              className={`${styles.arrowUp} ${currentSearchIndex >= searchResults.length - 1 ? styles.disabled : ''}`}
              onClick={() => handleArrowClick('up')}
            />
            <Image
              src={ArrowDown}
              alt="아래로"
              className={`${styles.arrowDown} ${currentSearchIndex <= 0 ? styles.disabled : ''}`}
              onClick={() => handleArrowClick('down')}
            />
          </div>
        </div>
      )}
    </div>
  );
};
