import styles from "./sortModal.module.css";
import { useState } from "react";

const sortTypes = [
    {
        value: "popular",
        name: "인기순"
    },
    {
        value: "recent",
        name: "최근등록순"
    },
    {
        value: "deadline",
        name: "마감임박순"
    },
    {
        value: "abc",
        name: "가나다순"
    },
];

export default function SortModal({handleCloseModal}:{handleCloseModal:()=>void}) {
    const [ sortSelected, setSortSelected ] = useState<string>();

    const handleSortType = ({sortName}:{sortName:string}) => {
        setSortSelected(sortName)
    }

    return(
        <div className={styles.container}>
            <p className={styles.title}>정렬방식</p>
            <div className={styles.sortTypeBox}>
                {sortTypes.map((sort, index) => (
                    <p key={index} 
                        className={sortSelected === sort.name ? `${styles.sortType} ${styles.sortSelected}` : styles.sortType}
                        onClick={() => handleSortType({sortName : sort.name})}>
                        {sort.name}
                    </p>
                ))}
            </div>
            <p className={styles.cancelBtn}
                onClick={()=>handleCloseModal()}>
                취소</p>
        </div>
    );
}