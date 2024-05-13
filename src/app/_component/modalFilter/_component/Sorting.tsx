"use client";

import styles from "./content.module.css";
import useFilterStore from "../store/useFilterStore";
import useSortStore from "@/app/studyList/store/useSortModal";
import { useEffect } from "react";

type ItemType = "최근등록순" | "인기순" | "마감임박순" | "가나다순";

interface sortingProps {
  sortingRef: React.RefObject<HTMLDivElement>;
}

export default function Sorting({ sortingRef }: sortingProps) {
  const items: ItemType[] = ["최근등록순", "인기순", "마감임박순", "가나다순"];
  const { selectedItem, setSelectedItem } = useFilterStore();
  const { sortSelected, setSortSelected } = useSortStore();

  useEffect(() => {
    const sortItem = getSortSelected(sortSelected);
    setSelectedItem(sortItem);
  }, []);

  const handleItemClick = (item: string) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
      const sortItem = getSortSelectedName(item);
      setSortSelected(sortItem);
    }
  };

  const getSortSelected = (sortSelected: string) => {
    switch (sortSelected) {
      case "popular":
        return "인기순";
      case "recent":
        return "최근등록순";
      case "deadline":
        return "마감임박순";
      case "abc":
        return "가나다순";
      default:
        return sortSelected;
    }
  };

  const getSortSelectedName = (sortSelected: string) => {
    switch (sortSelected) {
      case "인기순":
        return "popular";
      case "최근등록순":
        return "recent";
      case "마감임박순":
        return "deadline";
      case "가나다순":
        return "abc";
      default:
        return sortSelected;
    }
  };

  return (
    <div className={styles.Container} ref={sortingRef}>
      <p className={styles.Header}>정렬</p>
      <div className={styles.ItemContainer}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styles.Item} ${selectedItem === item ? styles.selected : ""}`}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
