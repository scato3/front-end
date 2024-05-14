import React, { useState, useEffect, useRef } from "react";
import styles from "./nav.module.css";

const FILTERS = ["정렬", "분야", "기간", "인원", "성향"];

interface SettingNavProps {
  sortingRef: React.RefObject<HTMLDivElement>;
  areaRef: React.RefObject<HTMLDivElement>;
  durationRef: React.RefObject<HTMLDivElement>;
  headCountRef: React.RefObject<HTMLDivElement>;
  tendencyRef: React.RefObject<HTMLDivElement>;
}

export default function SettingNav({ sortingRef, areaRef, durationRef, headCountRef, tendencyRef }: SettingNavProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const activeSeperatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSeperatorRef.current && activeFilter) {
      const index = FILTERS.indexOf(activeFilter);
      activeSeperatorRef.current.style.left = `${20 * index}%`;
    }
  }, [activeFilter]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    const ref = getRefByFilter(filter);
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getRefByFilter = (filter: string): React.RefObject<HTMLDivElement> | null => {
    switch (filter) {
      case "분야":
        return areaRef;
      case "기간":
        return durationRef;
      case "인원":
        return headCountRef;
      case "성향":
        return tendencyRef;
      default:
        return sortingRef;
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.SettingContainer}>
        {FILTERS.map((filter) => (
          <div
            key={filter}
            className={`${styles.FilterItem} ${activeFilter === filter ? styles.active : ""}`}
            onClick={() => handleFilterClick(filter)}
          >
            <p>{filter}</p>
          </div>
        ))}
      </div>
      <div className={styles.Seperator}>
        {activeFilter && (
          <div
            ref={activeSeperatorRef}
            className={styles.ActiveSeperator}
            style={{
              left: `${20 * FILTERS.indexOf(activeFilter)}%`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
