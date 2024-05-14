import styles from "./navigation.module.css";
import Arrow from "../../../../public/icons/Btn_arrow.svg";
import ArrowDark from "../../../../public/icons/Btn_arrow_dark.svg";
import Search from "../../../../public/icons/Icon_search.svg";
import Image from "next/image";

interface INavigationProps {
  children?: React.ReactNode;
  onClick: () => void;
  isSearch?: boolean;
  dark: boolean;
  isBack?: boolean;
}

export default function Navigation({ children, onClick, isSearch, dark, isBack }: INavigationProps) {
  return (
    <div
      className={styles.Container}
      style={{
        background: dark ? "var(--gray-800)" : "var(--gray-50)",
        color: dark ? "var(--gray-200)" : "var(--gray-800)",
      }}
    >
      {isBack && (
        <div className={styles.BackButton}>
          <Image src={dark ? Arrow : ArrowDark} alt="뒤로가기 버튼" width={36} height={36} onClick={onClick} />
        </div>
      )}
      {children}
      {isSearch && (
        <div className={styles.SearchButton}>
          <Image src={Search} alt="검색 버튼" width={36} height={36} onClick={onClick} />
        </div>
      )}
    </div>
  );
}
