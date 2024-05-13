"use client";

import styles from "./studyList.module.css";
import Navigation from "../_component/navigation/page";
import { useRouter } from "next/navigation";
import FilterQuick from "../_component/filter/FilterQuick";
import QuickMatchBtn from "./_component/QuickMatchBtn";
import Image from "next/image";
import Card from "../_component/main_home/Card";
import arrowIcon from "../../../public/icons/Arrow_down.svg";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import SortModal from "./_component/SortModal";
import NoStudy from "./_component/NoStudy";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
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

const filter = [

    {
        filter: "기간",
    },
    {
        filter: "인원수",
    },
    {
        filter: "타입",
    },
    {
        filter: "타입",
    },
]

export default function StudyList() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("전체");
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const [sort, setSort] = useState<boolean>(false);

  const toggleSortModal = () => {
    handleCloseModal();
    setSort(false);
  };

  return (
    <div className={styles.container}>
      <Navigation isBack={true} onClick={() => router.push("./home")} dark={false}>
        <p className={styles.title}>신규 쇼터디</p>
      </Navigation>
      <div className={styles.categoryTabBox}>
        <Swiper modules={[FreeMode]} slidesPerView={5.5} spaceBetween={9}>
          {categories.map((category, index) => (
            <SwiperSlide
              className={activeTab === category.name ? styles.categoryActive : styles.category}
              key={index}
              onClick={() => {
                setActiveTab(category.name);
              }}
            >
              {category.name}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.devider}></div>
      <div className={styles.filterBox}>
        <div className={styles.slideBox}>
          <QuickMatchBtn />
        </div>
        {filter.map((item, index) => (
          <div key={index} className={styles.slideBox}>
            <FilterQuick
              onClick={() => {
                return;
              }}
              arrow={true}
            >
              {item.filter}
            </FilterQuick>
          </div>
        ))}
      </div>
      <div className={styles.infoBox}>
        <p>총 개의 쇼터디가 있어요</p>
        <button className={styles.sortButton} onClick={() => setSort(true)}>
          최근 등록순
          <Image src={arrowIcon} width={20} height={20} alt="arrowBtn" />
        </button>
      </div>
      <div className={styles.cardBox}>
        <NoStudy>모집중인 쇼터디가 없어요</NoStudy>
      </div>
      {sort && (
        <ModalPortal>
          <ModalContainer bgDark={false} handleCloseModal={toggleSortModal}>
            <SortModal handleCloseModal={toggleSortModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
