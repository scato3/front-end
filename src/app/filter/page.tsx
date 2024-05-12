"use client";

import FilterNav from "./_component/FilterNav";
import SettingNav from "./_component/SettingNav";
import Sorting from "./_component/Sorting";
import Area from "./_component/Area";
import Duration from "./_component/Duration";
import Tendency from "./_component/Tendency";
import styles from "./filter.module.css";
import HeadCount from "./_component/HeadCount";
import Button from "../_component/button/Button";
import { useState, useEffect, useRef } from "react";
import useFilterStore from "./store/useFilterStore";

export default function Filter() {
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const areaRef = useRef(null);
  const durationRef = useRef(null);
  const headCountRef = useRef(null);
  const tendencyRef = useRef(null);
  const sortingRef = useRef(null);

  const {
    selectedItem,
    setSelectedItem,
    selectedArea,
    setSelectedArea,
    selectedDate,
    setSelectedDate,
    selectedDuration,
    setSelectedDuration,
    minCount,
    setMinCount,
    maxCount,
    setMaxCount,
    selectedTendency,
    setSelectedTendency,
  } = useFilterStore();

  const Reset = () => {
    setSelectedItem(null);
    setSelectedArea(null);
    setSelectedDate(null);
    setSelectedDuration(null);
    setMinCount("");
    setMaxCount("");
    setSelectedTendency([]);
    setButtonProperty("disabled");
  };

  useEffect(() => {
    if (
      selectedItem !== null &&
      selectedArea !== null &&
      selectedDate !== null &&
      selectedDuration !== null &&
      selectedTendency.length > 0 &&
      minCount !== "" &&
      maxCount !== "" &&
      parseInt(minCount) < parseInt(maxCount) &&
      parseInt(minCount) >= 2 &&
      parseInt(minCount) <= 20 &&
      parseInt(maxCount) >= 2 &&
      parseInt(maxCount) <= 20
    ) {
      setButtonProperty("confirm");
    } else {
      setButtonProperty("disabled");
    }
  }, [selectedItem, selectedArea, selectedDate, selectedDuration, selectedTendency, minCount, maxCount]);

  return (
    <div className={styles.FilterContainer}>
      <FilterNav />
      <SettingNav
        sortingRef={sortingRef}
        areaRef={areaRef}
        durationRef={durationRef}
        headCountRef={headCountRef}
        tendencyRef={tendencyRef}
      />
      <div className={styles.ContentContainer}>
        <Sorting sortingRef={sortingRef} />
        <Area AreaRef={areaRef} />
        <Duration DurationRef={durationRef} />
        <HeadCount CountRef={headCountRef} />
        <Tendency TendencyRef={tendencyRef} />
        <div className={styles.ButtonContainer}>
          <Button size="medium" onClick={Reset} property="cancel">
            초기화
          </Button>
          <Button size="medium" onClick={() => {}} property={buttonProperty}>
            적용하기
          </Button>
        </div>
      </div>
    </div>
  );
}
