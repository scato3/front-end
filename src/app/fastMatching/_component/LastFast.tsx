import { useState, useEffect } from "react";
import useFastStore from "../store/FastStore";
import FastSearch from "@/app/api/fastSearch";
import useAuth from "@/hooks/useAuth";
import { IFastType } from "../type/fastType";
import Navigation from "@/app/_component/navigation/page";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import NoStudy from "@/app/search_result/_component/NoStudy";

import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./last.module.css";
import people from "../../../../public/icons/Icon_people.svg";
import calendarImg from "../../../../public/icons/Icon_calendar.svg";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ko";
import Button from "@/app/_component/button/Button";
import JoinStudy from "@/app/api/joinStudy";
import { useMutation } from "@tanstack/react-query";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import AlredyJoinModal from "@/app/_component/modal/alredayJoinModal";

export default function LastFast() {
  const router = useRouter();
  const { save, selectedDuration, selectedField, selectedDate, recruitArr, tendency } = useFastStore();
  const { accessToken } = useAuth();
  const [postData, setPostData] = useState<IFastType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayedIndex, setDisplayedIndex] = useState<number>(0);
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const [totalCount, setTotalCount] = useState<number>(0);
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let duration = selectedDuration !== "미정" ? selectedDuration : "";
        const data = await FastSearch(
          {
            save,
            category: selectedField,
            startDate: selectedDate,
            duration,
            mem_scope: recruitArr,
            tendency,
          },
          accessToken,
        );
        setPostData(data.data);
        setIsLoading(false);
        setDisplayedIndex(0);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [save, selectedDuration, selectedField, selectedDate, recruitArr, tendency, accessToken]);

  useEffect(() => {
    if (totalCount !== 0) setButtonProperty("confirm");
    if (totalCount < 3) setButtonProperty("disabled");
  }, [totalCount]);

  function calculateEndDate(start_date: string, duration: string) {
    if (duration === "1w") {
      return moment(start_date).add(7, "days").format("MM.DD");
    } else if (duration === "1m") {
      return moment(start_date).add(1, "months").format("MM.DD");
    } else if (duration === "3m") {
      return moment(start_date).add(3, "months").format("MM.DD");
    } else if (duration === "6m") {
      return moment(start_date).add(6, "months").format("MM.DD");
    } else if (duration === "") {
      return "미정";
    }
  }

  function calculateDday(start_date: string, duration: string) {
    const endDate = moment(start_date).add(duration, "days");
    const today = moment().startOf("day");

    const diffDays = endDate.diff(today, "days");

    if (endDate.isSame(today, "day")) {
      return "오늘 시작";
    } else if (endDate.isAfter(today, "day")) {
      return `D-${endDate.diff(today, "days")}`;
    } else {
      return "";
    }
  }

  const check = () => {
    console.log(postData);
    console.log(save, selectedDuration, selectedField, selectedDate, recruitArr, tendency);
  };

  const mutateData = useMutation({
    mutationFn: (id: number) => JoinStudy(id, accessToken),
    onSuccess: (data) => {
      if (data.message) {
        handleOpenModal();
        setErrorMsg(data.message);
      } else {
        router.push("./myStudy");
      }
    },
    onError: () => {
      console.error("error");
    },
  });

  const handleReg = (study_id: number) => {
    return mutateData.mutate(study_id);
  };

  useEffect(() => {
    if (displayedIndex === 6) setButtonProperty("disabled");
    if (displayedIndex + 3 >= totalCount) setButtonProperty("disabled");
  }, [displayedIndex]);

  const handleNextClick = () => {
    setDisplayedIndex((prev) => prev + 3);
  };

  const handleGoInfo = (study_id: number) => {
    router.push(`./studyInfo?studyId=${study_id}`);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.FastContainer}>
          <Navigation
            dark={false}
            isBack={true}
            onClick={() => {
              router.push("./fastMatching?step=2");
            }}
          >
            빠른 매칭
          </Navigation>
          <div className={styles.seperator} onClick={check}>
            <div className={styles.progressBar}></div>
          </div>
          <div className={styles.ContentContainer}>
            {totalCount !== 0 && (
              <>
                <p className={styles.Content}>옆으로 넘겨 추천 스터디를 확인하고,</p>
                <p className={styles.Content}>원하는 스터디를 클릭해서 바로 입장하세요</p>
              </>
            )}
            <div className={styles.SwipeContainer}>
              {totalCount !== 0 ? (
                <Swiper effect={"cards"} grabCursor={true} loop={true}>
                  {postData.slice(displayedIndex, displayedIndex + 3).map((item: IFastType, index: number) => (
                    <SwiperSlide key={index}>
                      <div className={styles.ListBox}>
                        <div className={styles.ListHeader}>
                          <div className={styles.ListCategory}>{item.category}</div>
                          <p className={styles.ListTitle}>{item.title}</p>
                        </div>
                        <div className={styles.PeopleContainer}>
                          <Image src={people} width={24} height={24} alt="사람 이미지" />
                          <div className={styles.participantContainer}>
                            <div className={styles.participant}>{item.cur_participants_num}</div>
                            <div className={styles.maxParticipant}>/{item.max_participants_num}</div>
                          </div>
                        </div>
                        <div className={styles.DayContainer}>
                          <div className={styles.CalendarContainer}>
                            <Image src={calendarImg} width={24} height={24} alt="달력 이미지" />
                            <div className={styles.dateContainer}>
                              <p>
                                {moment(item.start_date).format("MM.DD")} -{" "}
                                {calculateEndDate(item.start_date, item.duration)}
                              </p>
                            </div>
                            <div className={styles.Dday}>{calculateDday(item.start_date, item.duration)}</div>
                          </div>
                        </div>
                        <div className={styles.tagsContainer}>
                          {item.additional_infos.map((tag, index) => (
                            <div key={index} className={styles.tag}>
                              #{tag}
                            </div>
                          ))}
                        </div>
                        <p className={styles.Description}>{item.description}</p>
                        <div className={styles.SmallBtnContainer}>
                          <Button
                            size="very_small"
                            property="black"
                            onClick={() => (item.is_member ? handleGoInfo(item.study_id) : handleReg(item.study_id))}
                          >
                            {item.is_member ? "입장하기" : "가입하기"}
                          </Button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <NoStudy>조건에 맞는 쇼터디가 없어요</NoStudy>
              )}
            </div>
            <div className={styles.ButtonContainer}>
              {totalCount !== 0 && (
                <>
                  <Button
                    size="medium"
                    property="confirm"
                    onClick={() => {
                      router.push("./studyList");
                    }}
                  >
                    직접 찾기
                  </Button>
                  <Button size="medium" property={buttonProperty} onClick={handleNextClick}>
                    다른 추천
                  </Button>
                </>
              )}
            </div>
            <div className={styles.goHomeBtnContainer}>
              {totalCount === 0 && (
                <Button
                  size="small"
                  property="black"
                  onClick={() => {
                    router.push("./home");
                  }}
                >
                  홈으로 돌아가기
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <AlredyJoinModal handleCloseModal={handleCloseModal}>{errorMsg}</AlredyJoinModal>
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
