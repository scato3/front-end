"use client";

import styles from "./content.module.css";
import useSortStore from "@/app/studyList/store/useSortModal";
import { sortTypes } from "@/utils/sortTypes";

interface sortingProps {
  sortingRef: React.RefObject<HTMLDivElement>;
}

export default function Sorting({ sortingRef }: sortingProps) {
  const { sortSelected, setSortSelected } = useSortStore();

  const handleSortType = (sortValue: string) => {
    setSortSelected(sortValue);
  };

  return (
    <div className={styles.Container} ref={sortingRef}>
      <p className={styles.Header}>정렬</p>
      <div className={styles.ItemContainer}>
        {sortTypes.map((item, index) => (
          <div
            key={index}
            className={`${styles.Item} ${sortSelected === item.value ? styles.selected : ""}`}
            onClick={() => handleSortType(item.value)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
