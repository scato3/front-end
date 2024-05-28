"use client";

import styles from "./todo.module.css";
import Image from "next/image";
import Navigation from "@/app/_component/navigation/page";
import { useRouter } from "next/navigation";
import DateCard from "./_component/DateCard";
import Member from "./_component/Member";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useModal } from "@/hooks/useModal";
import Calendar from "./_component/Calendar";
import MemberModal from "@/app/studyInfo/_component/memberModal";
import { useState } from "react";
import ToDoInputBox from "./_component/ToDoInputBox";
import CheckedIcon from "../../../../public/icons/chatting/Checked_Checkbox.svg";
import UncheckedIcon from "../../../../public/icons/chatting/Unchecked_Checkbox.svg";
import EditIcon from "../../../../public/icons/chatting/Edit.svg";
import CloseIcon from "../../../../public/icons/Icon_X.svg";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const MEMBERS = ["나", "너", "우리", "7팀", "스위프", "쇼터디"];
const FILTERS = ["전체", "미완료", "완료"];

export default function Todo(){
    const router = useRouter();
    const { openModal:openCalender , handleOpenModal:handleOpenCalendar, handleCloseModal:handleCloseCalendar} = useModal();
    const { openModal:openProfile , handleOpenModal:handleOpenProfile, handleCloseModal:handleCloseProfile} = useModal();
    const [ activeFilter, setActiveFilter ] = useState<string>(FILTERS[0]);



    return(
        <div className={styles.Container}>
            <Navigation isBack={true} dark={false} onClick={()=>{router.back()}}>목표관리</Navigation>
            <div className={styles.TopContainer}>
                <div className={styles.Top}>
                    <DateCard openModal={handleOpenCalendar}/>
                    <div className={styles.PercentageBox}>
                        <p className={styles.PercentTitle}>팀 평균 달성률<span className={styles.Percent}>100%</span></p>
                        <p className={styles.PercentTitle}>나의 달성률<span className={styles.Percent}>50%</span></p>
                    </div>
                </div>
                <div className={styles.MemberBox}>
                    <Swiper
                        modules={[FreeMode]}
                        slidesPerView={5}
                        spaceBetween={12}
                        autoHeight={true}
                    >
                        {MEMBERS.map((member, index) => (
                            <SwiperSlide><Member key={index} nickname={member}/></SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className={styles.Hr}></div>
            <div className={styles.BottomContainer}>
                <div className={styles.FilterBox}>
                    {FILTERS.map((filter) => (
                        <p className={`${styles.Filter} ${activeFilter === filter ? styles.active : ""}`}
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            >
                            {filter}
                        </p>
                    ))}
                </div>
                <div className={styles.PublicToDoBox}>
                    <p className={styles.ToDoTitle}>공통 할 일</p>
                </div>
                <div className={styles.MyToDoBox}>
                    <p className={styles.ToDoTitle}>나의 할 일</p>
                </div>
                <div className={styles.InputBox}>
                    <ToDoInputBox />
                </div>
            </div>
            
            {openCalender &&
            <ModalPortal>
                <ModalContainer handleCloseModal={handleCloseCalendar}>
                    <Calendar handleCloseModal={handleCloseCalendar}></Calendar>
                </ModalContainer>
            </ModalPortal>
            }

            {/* {openProfile &&
            <ModalPortal>
                <ModalContainer handleCloseModal={handleCloseProfile}>
                    <MemberModal handleCloseModal={handleCloseProfile} user={} study={}></MemberModal>
                </ModalContainer>
            </ModalPortal>

            } */}
        </div>
    );
}