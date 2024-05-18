"use client";

import styles from "./studyList.module.css";
import Navigation from "../_component/navigation/page";
import { useRouter, useSearchParams } from "next/navigation";
import FilterQuick from "../_component/filter/FilterQuick";
import QuickMatchBtn from "./_component/QuickMatchBtn";
import Image from "next/image";
import Link from "next/link";
import Card from "../_component/main_home/Card";
import arrowIcon from "../../../public/icons/Arrow_down.svg";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import SortModal from "./_component/SortModal";
import NoStudy from "./_component/NoStudy";
import useFilterStore from "../_component/modalFilter/store/useFilterStore";
import useSortStore from "./store/useSortStore";
import ModalFilter from "../_component/modalFilter/page";
import DisplayDuration from "./_component/utils/displayDuration";
import getFilter from "../api/getFilter";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { IfilterType } from "../type/filterType";
import useFromStore from "@/utils/from";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const categories = [
  {
    value: 0,
    name: "전체",
  },
  {
    value: 1,
    name: "수능",
  },
  {
    value: 2,
    name: "어학",
  },
  {
    value: 3,
    name: "취업",
  },
  {
    value: 4,
    name: "공무원",
  },
  {
    value: 5,
    name: "임용",
  },
  {
    value: 6,
    name: "전문직",
  },
  {
    value: 7,
    name: "대학생",
  },
  {
    value: 8,
    name: "자격증",
  },
  {
    value: 9,
    name: "코딩",
  },
  {
    value: 10,
    name: "모각공",
  },
  {
    value: 11,
    name: "기타",
  },
];

const filter = ["기간", "인원수", "타입", "타입1", "타입2"];

export default function StudyList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<string | null>("전체");
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const [sort, setSort] = useState<boolean>(false);
  const { selectedArea, selectedDate, selectedDuration, minCount, maxCount, selectedTendency, setSelectedArea } =
    useFilterStore();
  const { quickMatch, sortSelected } = useSortStore();
  const { from, setFrom } = useFromStore();

  useEffect(() => {
    setFrom("studyList");
  }, []);

  useEffect(() => {
    setSelectedArea(category === "전체" ? "" : category);
    console.log(quickMatch);
  }, [category]);

  const {
    data: modalData,
    isLoading: modalIsLoading,
    error: modalError,
  } = useQuery({
    queryKey: [
      "STUDY_LIST",
      sortSelected,
      selectedArea,
      selectedDate,
      selectedDuration,
      minCount,
      maxCount,
      selectedTendency,
      quickMatch,
    ].filter(Boolean),
    queryFn: async () =>
      getFilter("all", sortSelected, "", {
        category: selectedArea,
        startDate: selectedDate,
        duration: selectedDuration,
        minParticipants: parseInt(minCount),
        maxParticipants: parseInt(maxCount),
        tendency: selectedTendency.map((obj) => obj.value).join(","),
        quickMatch: quickMatch ? "quick" : "",
      }),
  });

  useEffect(() => {
    if (modalData) console.log(modalData);
    if (!modalData && !modalIsLoading) {
      console.log(modalError);
    }
  }, [
    modalData,
    modalIsLoading,
    modalError,
    sortSelected,
    selectedArea,
    selectedDate,
    selectedDuration,
    selectedTendency,
  ]);

  // SortModalController
  const toggleSortModal = () => {
    handleCloseModal();
    setSort(false);
  };

  // 새로 고침시 초기화
  useEffect(() => {
    router.push("./studyList");
  }, []);

  // tab
  useEffect(() => {
    if (selectedArea) {
      setActiveTab(selectedArea);
      router.push(`./studyList?tab=${selectedArea}`);

      // 초기화
    } else if (selectedArea === null) {
      setActiveTab("전체");
      router.push(`./studyList`);
    }
  }, [selectedArea]);

  const getSortSelectedName = (sortSelected: string) => {
    switch (sortSelected) {
      case "popular":
        return "인기순";
      case "recent":
        return "최근등록순";
      case "deadline":
        return "마감임박순";
      case "abc":
        return "가나다순";
      default:
        return sortSelected;
    }
  };

  const handleFrom = () => {
    setFrom("studyList");
  };

  return (
    <div className={styles.container}>
      <Navigation isBack={true} onClick={() => router.push("./home")} dark={false}>
        <p className={styles.title}>{getSortSelectedName(sortSelected)}</p>
      </Navigation>
      <div className={styles.categoryTabBox}>
        <Swiper
          modules={[FreeMode]}
          slidesPerView={5.5}
          spaceBetween={9}
          autoHeight={true}
          className={styles.customSwiper}
        >
          {categories.map((category, index) => (
            <SwiperSlide
              key={index}
              onClick={() => {
                setActiveTab(category.name);
              }}
            >
              <Link
                href={{ pathname: "/studyList", query: { tab: category.name } }}
                key={index}
                className={activeTab === category.name ? styles.categoryActive : styles.category}
              >
                <p>{category.name}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.devider}></div>
      <div className={styles.filterBox}>
        <Swiper slidesPerView={4} modules={[FreeMode]} spaceBetween={15} className={styles.SwipperContainer}>
          <SwiperSlide className={styles.slideBox}>
            <QuickMatchBtn />
          </SwiperSlide>
          {filter.map((item, index) => (
            <SwiperSlide key={index} className={`${styles.slideBox} ${selectedDuration ? styles.active : ""}`}>
              {item === "기간" && selectedDuration && (
                <FilterQuick
                  property="active"
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  {DisplayDuration(selectedDate, selectedDuration)}
                </FilterQuick>
              )}
              {item === "기간" && !selectedDuration && (
                <FilterQuick
                  arrow={true}
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  {item}
                </FilterQuick>
              )}
              {item === "인원수" && minCount && (
                <FilterQuick
                  property="active"
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  {minCount}인 - {maxCount}인
                </FilterQuick>
              )}
              {item === "인원수" && !minCount && (
                <FilterQuick
                  arrow={true}
                  onClick={() => {
                    handleOpenModal();
                  }}
                >
                  {item}
                </FilterQuick>
              )}
              {item === "타입" && selectedTendency.length > 0 && selectedTendency[0].name && (
                <FilterQuick property="active" onClick={handleOpenModal}>
                  {selectedTendency[0].name}
                </FilterQuick>
              )}
              {item === "타입" && selectedTendency.length === 0 && (
                <FilterQuick arrow={true} onClick={handleOpenModal}>
                  {item}
                </FilterQuick>
              )}
              {item === "타입1" && selectedTendency.length > 1 && selectedTendency[1].name && (
                <FilterQuick property="active" onClick={handleOpenModal}>
                  {selectedTendency[1].name}
                </FilterQuick>
              )}
              {item === "타입2" && selectedTendency.length > 2 && selectedTendency[2].name && (
                <FilterQuick property="active" onClick={handleOpenModal}>
                  {selectedTendency[2].name}
                </FilterQuick>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoBox}>
          {modalData && <p>{`총 ${modalData.totalCount}개의 쇼터디가 있어요`}</p>}
          <button className={styles.sortButton} onClick={() => setSort(true)}>
            {getSortSelectedName(sortSelected)}
            <Image src={arrowIcon} width={20} height={20} alt="arrowBtn" />
          </button>
        </div>
        {modalData && modalData.totalCount !== 0 ? (
          <div
            className={styles.cardBox}
            onClick={() => {
              handleFrom();
            }}
          >
            {modalData.data.map((data: IfilterType, index: number) => (
              <Card key={index} data={data} />
            ))}
          </div>
        ) : (
          <NoStudy />
        )}
      </div>

      {sort && (
        <ModalPortal>
          <ModalContainer bgDark={false} handleCloseModal={toggleSortModal}>
            <SortModal handleCloseModal={toggleSortModal} />
          </ModalContainer>
        </ModalPortal>
      )}
      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <ModalFilter handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
