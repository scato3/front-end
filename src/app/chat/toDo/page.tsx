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
import { useEffect, useState } from "react";
import ToDoInputBox from "./_component/ToDoInputBox";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import GetStudyInfo from "@/app/api/getStudyInfo";
import Loading from "@/app/_component/Loading";
import useAuth from "@/hooks/useAuth";
import useToDoStore from "../store/useToDoStore";
import CheckedIcon from "../../../../public/icons/chatting/Checked_Checkbox.svg";
import UncheckedIcon from "../../../../public/icons/chatting/Unchecked_Checkbox.svg";
import EditIcon from "../../../../public/icons/chatting/Edit.svg";
import CloseIcon from "../../../../public/icons/Icon_X.svg";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const FILTERS = ["전체", "미완료", "완료"];

export default function Todo(){
    const router = useRouter();
    const { openModal:openCalender , handleOpenModal:handleOpenCalendar, handleCloseModal:handleCloseCalendar} = useModal();
    const searchParams = useSearchParams();
    const studyIdString = searchParams.get("studyId");
    const studyId: number = studyIdString ? parseInt(studyIdString) : -1;
    const [ activeFilter, setActiveFilter ] = useState<string>(FILTERS[0]);
    const {activeMember, setActiveMember} = useToDoStore();
    const [memberList, setMemberList] = useState<Imember[]>([]);
    const [ isOwner, setIsOwner ] = useState<boolean>(false);
    const {selectedDate} = useToDoStore();
    const { user } = useAuth();

    const { data:studyData, isLoading, error } = useQuery({
        queryKey: ["STUDY_INFO", studyId],
        queryFn: async () => GetStudyInfo(studyId),
    });


    useEffect(() => {
        if(studyData){
            const members = studyData.membersList;
            members.sort((a:Imember, b:Imember) => {
                if (a.nickname === user?.nickname) {
                    return -1;
                }
                if (b.nickname === user?.nickname) {
                    return 1;
                }
                return 0;
            });
            setMemberList(members);
            setActiveMember(memberList[0]);
            if (members[0]?._owner) setIsOwner(true);
        }
        console.log(memberList, isOwner);

    },[studyData]);

    const handleMemberClick = (member:Imember) => {
        setActiveMember(member);
    };

    return(
        <div className={styles.Container}>
            {isLoading ? <><Loading /></> : <>
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
                        {memberList.map((member, index) => (
                            <SwiperSlide><Member key={index} member={member} handleMemberClick={() => handleMemberClick(member)}/></SwiperSlide>
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
                <div className={styles.ContentBox}>
                    {activeFilter === "전체" && <>
                    <div className={styles.PublicToDoBox}>
                        <p className={styles.ToDoTitle}>공통 할 일</p>
                        {isOwner &&
                            <div className={styles.InputBox}>
                                <ToDoInputBox />
                            </div>
                        }
                    </div>
                    <div className={styles.MyToDoBox}>
                        <p className={styles.ToDoTitle}>나의 할 일</p>
                    </div>
                    <div className={styles.InputBox}>
                        <ToDoInputBox />
                    </div>
                    </>}
                    {activeFilter === "미완료" && <>
                    
                    </>}
                    {activeFilter === "완료" && <>
                    
                    </>}
                </div>
            </div>
            
            {openCalender &&
            <ModalPortal>
                <ModalContainer handleCloseModal={handleCloseCalendar}>
                    <Calendar handleCloseModal={handleCloseCalendar}></Calendar>
                </ModalContainer>
            </ModalPortal>
            }

            </> }
        </div>
    );
}