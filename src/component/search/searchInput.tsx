import styles from './searchInput.module.scss';
import Image from 'next/image';
import { IconActveSearch } from '../../../public/icons';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { encodeForUrl } from '@/utils/urlEncode';

export default function SearchInput() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search_result?search=${encodeForUrl(searchValue)}`);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <input
          maxLength={20}
          className={styles.input}
          type="text"
          name="search"
          placeholder="무엇을 검색할까요?"
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
