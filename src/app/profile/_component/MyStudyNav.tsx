import React, { useEffect, useRef, useState } from "react";
import styles from "./nav.module.css";
const keyLabels = {
  proposal: "참여신청",
  progress: "진행중",
  complete: "참여완료",
};
const FILTERS = ["참여신청", "진행중", "참여완료"];
interface IMyStudyNavProps {
  studyType: string;
  proposalRef: React.RefObject<HTMLDivElement>;
  progressRef: React.RefObject<HTMLDivElement>;
  completeRef: React.RefObject<HTMLDivElement>;
  fetchMenuParam: Function;
}

export default function MyStudyNav({
  studyType,
  proposalRef,
  progressRef,
  completeRef,
  fetchMenuParam,
}: IMyStudyNavProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const activeSeperatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeFilter) {
      setActiveFilter(keyLabels[studyType]);
    }

    if (activeSeperatorRef.current && activeFilter) {
      const index = FILTERS.indexOf(activeFilter);
      activeSeperatorRef.current.style.left = `${33.33 * index}%`;
    }
  }, [activeFilter]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    const ref = getRefByFilter(filter);
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    const index = FILTERS.indexOf(filter);
    fetchMenuParam(Object.keys(keyLabels)[index]);
  };

  const getRefByFilter = (filter: string): React.RefObject<HTMLDivElement> | null => {
    switch (filter) {
      case "참여신청":
        return proposalRef;
      case "진행중":
        return progressRef;
      default:
        return completeRef;
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
              left: `${33.33 * FILTERS.indexOf(activeFilter)}%`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
