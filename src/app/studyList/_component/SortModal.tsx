import styles from "./sortModal.module.css";
import { useState } from "react";
import useSortStore from "../store/useSortModal";

const sortTypes = [
  {
    value: "popular",
    name: "인기순",
  },
  {
    value: "recent",
    name: "최근등록순",
  },
  {
    value: "deadline",
    name: "마감임박순",
  },
  {
    value: "abc",
    name: "가나다순",
  },
];

export default function SortModal({ handleCloseModal }: { handleCloseModal: () => void }) {
  const { setSortSelected } = useSortStore();

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
