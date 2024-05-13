"use client";
import { useState, useEffect } from "react";
import styles from "./content.module.css";
import useFilterStore from "../store/useFilterStore";

interface Tendency {
  name: string;
}

const tendencies: Tendency[] = [
  { name: "활발한 대화와 동기부여 원해요" },
  { name: "학습 피드백을 주고받고 싶어요" },
  { name: "조용히 집중하고 싶어요" },
];

interface TendencyProps {
  TendencyRef: React.RefObject<HTMLDivElement>;
}

export default function Tendency({ TendencyRef }: TendencyProps) {
  const { selectedTendency, setSelectedTendency } = useFilterStore();

  const handleTendencyClick = (tendency: Tendency) => {
    if (selectedTendency.some((item) => item.name === tendency.name)) {
      setSelectedTendency(selectedTendency.filter((item) => item.name !== tendency.name));
    } else {
      setSelectedTendency([...selectedTendency, tendency]);
    }
  };

  return (
    <div className={styles.Container} ref={TendencyRef}>
      <div className={styles.HeaderContainer}>
        <p className={styles.Header}>성향</p>
        <p className={styles.HeaderSub}>*중복 선택 가능</p>
      </div>
      <div className={styles.TendencyContainer}>
        {tendencies.map((tendency, index) => (
          <div
            key={index}
            className={`${styles.Tendency} ${
              selectedTendency.some((item) => item.name === tendency.name) ? styles.Selected : ""
            }`}
            onClick={() => handleTendencyClick(tendency)}
          >
            {tendency.name}
          </div>
        ))}
      </div>
    </div>
  );
}