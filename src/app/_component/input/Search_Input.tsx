import styles from "./search_input.module.css";
import Image from "next/image";
import Icon_search from "../../../../public/icons/search/Icon_search.svg";

interface ISearchInput {
  handleEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isSearchPage: boolean;
}

const Search_Input: React.FC<ISearchInput> = ({ handleEnter, onChange, value, isSearchPage }) => {
  return (
    <div className={styles.container}>
      <input
        maxLength={20}
        className={`${styles.Input} ${isSearchPage ? styles.searchPage : styles.default}`}
        type="text"
        name="최근검색어"
        onKeyDown={handleEnter}
        onChange={onChange}
        value={value}
        placeholder="무엇을 검색할까요?"
      />
      <Image src={Icon_search} width={18} height={18} alt="searchIcon" className={styles.searchIcon} />
    </div>
  );
};

export default Search_Input;
