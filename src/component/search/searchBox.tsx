import Image from 'next/image';
import { IconActveSearch } from '../../../public/icons';
import styles from './searchBox.module.scss';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SearchBox() {
  const [searchValue, setSearchValue] = useState<string>('');
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('search') || '무엇을 검색할까요?';

  return (
    <div className={styles.container}>
      <form className={styles.inputContainer}>
        <input
          maxLength={20}
          className={styles.input}
          type="text"
          name="search"
          placeholder={searchQuery}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          <Image
            src={IconActveSearch}
            width={18}
            height={18}
            alt="searchIcon"
            className={styles.searchIcon}
          />
        </button>
      </form>
    </div>
  );
}
