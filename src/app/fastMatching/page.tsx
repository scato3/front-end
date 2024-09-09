"use client";

import styles from "./fastmatching.module.css";
import Navigation from "../_component/navigation/page";
import { useState, useEffect } from "react";

import { useModal } from "@/hooks/useModal";
import ModalPortal from "../_component/ModalPortal";
import CreateModalContainer from "../_component/createModalContainer";
import { getFormattedDuration } from "./utils/getFormatDuration";
import useFastStore from "./store/FastStore";
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import GetQuickFiler from "../api/quickFilter";
import { fetchType } from "./type/fastType";
import useFromStore from "@/utils/from";
import useFunnel from "@/hooks/useFunnel";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import LastPage from "./steps/LastPage";

const steps: string[] = ["step1", "step2", "step3", "Last"];

export default function FastMatching() {
  const [Funnel, Step, setStep] = useFunnel(steps[0]);

  const router = useRouter();
  const [pick, setPick] = useState<string>("");
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const [data, setData] = useState<fetchType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  const { selectedDate, selectedDuration, selectedField } = useFastStore();
  const { setSelectedDate, setSelectedDuration, setSelectedField, setRecruitArr, setTendency, setSave } =
    useFastStore();
  const { accessToken } = useAuth();

  const formattedDate = selectedDate ? moment(selectedDate).format("YY.MM.DD") : "시작 날짜 선택하기";
  const formattedDuration = selectedDuration ? getFormattedDuration(selectedDuration) : "학습 기간 선택하기";
  const formattedField = selectedField ? selectedField : "학습 분야 선택하기";

  useEffect(() => {
    if (selectedDate && selectedDuration && selectedField) setButtonProperty("confirm");
    else setButtonProperty("disabled");
  }, [selectedDate, selectedDuration, selectedField]);

  // 초기 데이터 불러오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await GetQuickFiler(accessToken);
        setData(postData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setSave(true);
      setSelectedDate(data.start_date);
      setSelectedDuration(data.duration === "" ? "미정" : data.duration);
      setSelectedField(data.category);
      setRecruitArr((prevArr) => [...prevArr, ...data.mem_scope]);
      setTendency((prevArr) => [...prevArr, ...data.tendency]);
    } else {
      setSave(false);
      setSelectedDate(null);
      setSelectedDuration(null);
      setSelectedField(null);
      setRecruitArr(() => []);
      setTendency(() => []);
    }
  }, [data]);

  return (
    <>
      {!isLoading && (
        <div className={styles.FastContainer}>
          <div className={styles.ContentContainer}>
            <Funnel>
              <Step name="step1">
                <Step1 onNext={() => setStep("step2")}></Step1>
              </Step>
              <Step name="step2">
                <Step2 onNext={() => setStep("step3")} onBefore={() => setStep("step1")}></Step2>
              </Step>
              <Step name="step3">
                <Step3 onNext={() => setStep("Last")} onBefore={() => setStep("step2")}></Step3>
              </Step>
              <Step name="Last">
                <LastPage onBefore={() => setStep("step3")}></LastPage>
              </Step>
            </Funnel>
          </div>
        </div>
      )}
    </>
  );
}
