"use client";

import React, { useState, useEffect } from "react";
import useFilterStore from "../store/useFilterStore";
import styles from "./content.module.css";
import Image from "next/image";
import Icon_mincaution from "../../../../public/icons/Icon_filtercaution_1.svg";
import Icon_rangecaution from "../../../../public/icons/Icon_filtercaution_2.svg";

interface CountProps {
  CountRef: React.RefObject<HTMLDivElement>;
}

export default function HeadCount({ CountRef }: CountProps) {
  const { minCount, maxCount, setMinCount, setMaxCount } = useFilterStore();

  const [minFulfilled, setMinFulfilled] = useState<boolean>(false);
  const [maxFulfilled, setMaxFulfilled] = useState<boolean>(false);

  useEffect(() => {
    if (minCount === "" && maxCount === "") {
      setMinFulfilled(false);
      setMaxFulfilled(false);
    }
  }, [minCount, maxCount]);

  const handleMinCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input === "" || /^\d+$/.test(input)) {
      setMinCount(input);
    }
  };

  const handleMaxCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input === "" || /^\d+$/.test(input)) {
      setMaxCount(input);
    }
  };

  const handleMinCountBlur = () => {
    if (minCount !== "") {
      setMinFulfilled(true);
    }
  };

  const handleMaxCountBlur = () => {
    if (maxCount !== "") {
      setMaxFulfilled(true);
    }
  };

  const handleMinCountFocus = () => {
    setMinFulfilled(false);
  };

  const handleMaxCountFocus = () => {
    setMaxFulfilled(false);
  };

  const getMinInputValue = () => {
    return minFulfilled ? `최소 ${minCount}명` : minCount;
  };

  const getMaxInputValue = () => {
    return maxFulfilled ? `최대 ${maxCount}명` : maxCount;
  };

  const isMaxLessThanMin = () => {
    return minFulfilled && maxFulfilled && minCount && maxCount && parseInt(maxCount) <= parseInt(minCount);
  };

  const isMinRange = () => {
    return minFulfilled && minCount && (parseInt(minCount) < 2 || parseInt(minCount) > 20);
  };

  const isMaxRange = () => {
    return maxFulfilled && maxCount && (parseInt(maxCount) < 2 || parseInt(maxCount) > 20);
  };

  return (
    <div className={styles.Container} ref={CountRef}>
      <div className={styles.HeaderContainer}>
        <p className={styles.Header}>인원</p>
        <p className={styles.HeaderSub}>*본인포함</p>
      </div>
      <div className={styles.ImageContainer}>
        {(isMaxRange() || isMinRange()) && (
          <Image src={Icon_rangecaution} width={282} height={36} alt="최소 인원 경고 이미지" />
        )}
        {isMaxLessThanMin() && <Image src={Icon_mincaution} width={372} height={36} alt="인원 경고 이미지" />}
      </div>

      <div className={styles.inputContainer}>
        <input
          placeholder="최소 인원수"
          className={`${styles.CountInput} ${minFulfilled ? styles.countInputFilled : ""} ${isMinRange() ? styles.invalidInput : ""}`}
          value={getMinInputValue()}
          onChange={handleMinCountChange}
          onBlur={handleMinCountBlur}
          onFocus={handleMinCountFocus}
        />
        <input
          placeholder="최대 인원수"
          className={`${styles.CountInput} ${maxFulfilled ? styles.countInputFilled : ""} ${isMaxLessThanMin() ? styles.invalidInput : ""} ${isMaxRange() ? styles.invalidInput : ""}`}
          value={getMaxInputValue() || maxCount}
          onChange={handleMaxCountChange}
          onBlur={handleMaxCountBlur}
          onFocus={handleMaxCountFocus}
        />
      </div>
    </div>
  );
}
