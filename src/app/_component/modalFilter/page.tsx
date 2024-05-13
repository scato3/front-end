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

import { useQuery } from "@tanstack/react-query";
import useSortStore from "@/app/studyList/store/useSortModal";
import getFilter from "@/app/api/getFilter";

interface IModelFilterProps {
  handleCloseModal: () => void;
}

export default function ModalFilter({ handleCloseModal }: IModelFilterProps) {
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const { sortSelected } = useSortStore();
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["NEW_STUDY", "MODAL_FILTER"],
    queryFn: async () =>
      getFilter("recent", sortSelected, {
        category: selectedArea,
        startDate: selectedDate,
        duration: selectedDuration,
        minParticipants: parseInt(minCount),
        maxParticipants: parseInt(maxCount),
        tendency: selectedTendency.map((obj) => obj.value).join(","),
      }),
  });

  useEffect(() => {
    if (!isLoading && !error) {
      console.log(data);
    }
  }, [isLoading, error]);

  const handleCloseButton = () => {
    handleCloseModal();
  };

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
      selectedItem !== null ||
      selectedArea !== null ||
      (selectedDate !== null && selectedDuration !== null) ||
      selectedTendency.length > 0 ||
      (minCount !== "" &&
        maxCount !== "" &&
        parseInt(minCount) < parseInt(maxCount) &&
        parseInt(minCount) >= 2 &&
        parseInt(minCount) <= 20 &&
        parseInt(maxCount) >= 2 &&
        parseInt(maxCount) <= 20)
    ) {
      setButtonProperty("confirm");
    } else {
      setButtonProperty("disabled");
    }
  }, [selectedItem, selectedArea, selectedDate, selectedDuration, minCount, maxCount, selectedTendency]);

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
            property={buttonProperty}
          >
            적용하기
          </Button>
        </div>
      </div>
    </div>
  );
}
