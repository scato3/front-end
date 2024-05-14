import React from "react";
import styles from "./content.module.css";
import useFilterStore from "../store/useFilterStore";

type AreaType =
  | "수능"
  | "어학"
  | "취업"
  | "공무원"
  | "임용"
  | "전문직"
  | "대학생"
  | "자격증"
  | "코딩"
  | "모각공"
  | "기타";

interface AreaProps {
  AreaRef: React.RefObject<HTMLDivElement>;
}

export default function Area({ AreaRef }: AreaProps) {
  const Area: AreaType[] = [
    "수능",
    "어학",
    "취업",
    "공무원",
    "임용",
    "전문직",
    "대학생",
    "자격증",
    "코딩",
    "모각공",
    "기타",
  ];
  const { selectedArea, setSelectedArea } = useFilterStore();

  const handleItemClick = (item: string) => {
    if (selectedArea === item) {
      setSelectedArea(null);
    } else {
      setSelectedArea(item);
    }
  };

  return (
    <div className={styles.Container} ref={AreaRef}>
      <p className={styles.Header}>분야</p>
      <div className={styles.ItemContainer}>
        {Area.map((item, index) => (
          <div
            key={index}
            className={`${styles.Item} ${selectedArea === item ? styles.selected : ""}`}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
