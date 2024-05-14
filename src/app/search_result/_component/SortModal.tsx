import styles from "./sortModal.module.css";
import { useState } from "react";
import useSearchResultStore from "../store/useSearchResultStore";
import { sortTypes } from "@/utils/sortTypes";

export default function SortModal({ handleCloseModal }: { handleCloseModal: () => void }) {
  const { setSortSelected } = useSearchResultStore();

  const handleSortType = (sortValue: string) => {
    handleCloseModal();
    setSortSelected(sortValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sortTypeBox}>
        {sortTypes.map((sort, index) => (
          <p key={index} className={styles.sortType} onClick={() => handleSortType(sort.value)}>
            {sort.name}
          </p>
        ))}
      </div>
    </div>
  );
}
