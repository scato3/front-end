import styles from "./search_input.module.css";
import Image from "next/image";
import SearchIconDark from "../../../../public/icons/Icon_search.svg";
import SearchIconLight from "../../../../public/icons/Icon_search_light.svg";

export default function Search_Input({dark}:{dark:boolean}) {
    return(
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <Image className={styles.icon} src={dark ? SearchIconDark : SearchIconLight} width={35} height={35} alt="search" /> 
                <input className={styles.input} placeholder="어떤 스터디를 찾으시나요?"></input>
            </div>
            <div className={styles.hrLine}></div>
        </div>
    );
}