import styles from "./navigation.module.css";
import Arrow from "../../../../public/icons/Btn_arrow.svg";
import Search from "../../../../public/icons/Icon_search.svg";
import Image from "next/image";

interface INavigaionProps {
  children: React.ReactNode;
  onClick: () => void;
  isSearch?: boolean;
}

export default function Navigation({ children, onClick, isSearch }: INavigaionProps) {
  return (
    <div className={styles.Container}>
      <div className={styles.BackButton}>
        <Image src={Arrow} alt="뒤로가기 버튼" width={48} height={48} onClick={onClick} />
      </div>
      {children}
      {isSearch && (
        <div className={styles.SearchButton}>
          <Image src={Search} alt="검색 버튼" width={48} height={48} onClick={onClick} />
        </div>
      )}
    </div>
  );
}
