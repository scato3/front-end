'use client';

import MainHeader from '@/component/common/mainHeader';
import SearchInput from '@/component/search/searchInput';
import styles from './search.module.scss';
import RecentBox from '@/component/search/recentBox';
import PopularBox from '@/component/search/popularBox';
import { useGetRecentSearch, useGetPopularSearch } from '@/apis/search/search';
import SearchGrid from '@/component/search/searchGrid';

export default function Search() {
  const { data: recentData } = useGetRecentSearch();
  const { data: popularData } = useGetPopularSearch();

  return (
    <div className={styles.Container}>
      <MainHeader />
      <div className={styles.searchInputBox}>
        <SearchInput />
      </div>
      {recentData && <RecentBox data={recentData.data} />}
      {popularData && <PopularBox data={popularData.data} />}
      <div className={styles.seperator}></div>
      <SearchGrid />
    </div>
  );
}
