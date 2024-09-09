"use client";

import FilterNav from "./_component/FilterNav";
import SettingNav from "./_component/SettingNav";
import Sorting from "./_component/Sorting";
import Area from "./_component/Area";
import Duration from "./_component/Duration";
import Tendency from "./_component/Tendency";
import styles from "./filter.module.css";
import HeadCount from "./_component/HeadCount";
import Button from "../button/Button";
import { useState, useEffect, useRef } from "react";
import useFilterStore from "./store/useFilterStore";
import useSortStore from "@/app/studyList/store/useSortStore";

interface IModalFilterProps {
  handleCloseModal: () => void;
}

export default function ModalFilter({ handleCloseModal }: IModalFilterProps) {
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const { sortSelected, setSortSelected } = useSortStore();

  const areaRef = useRef(null);
  const durationRef = useRef(null);
  const headCountRef = useRef(null);
  const tendencyRef = useRef(null);
  const sortingRef = useRef(null);

  const {
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

  const handleCloseButton = () => {
    handleCloseModal();
  };

  const Reset = () => {
    setSortSelected("recent");
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
      (sortSelected !== null ||
        selectedArea !== null ||
        (selectedDate !== null && selectedDuration !== null) ||
        selectedTendency.length > 0) &&
      ((minCount !== "" &&
        maxCount !== "" &&
        parseInt(minCount) >= 2 &&
        parseInt(maxCount) <= 20 &&
        parseInt(minCount) <= parseInt(maxCount)) ||
        (minCount === "" && maxCount === ""))
    ) {
      setButtonProperty("confirm");
    } else {
      setButtonProperty("disabled");
    }
  }, [selectedArea, selectedDate, selectedDuration, selectedTendency, minCount, maxCount]);

  return (
    <div className={styles.FilterContainer}>
      <FilterNav handleCloseModal={handleCloseModal} />
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
          <Button
            size="medium"
            onClick={() => {
              handleCloseButton();
            }}
          >
            적용하기
          </Button>
        </div>
      </div>
    </div>
  );
}
