"use client";

import styles from "./studyList.module.css";
import Navigation from "../_component/navigation/page";
import { useRouter } from "next/navigation";
import Icon_quick from "../../../public/icons/Icon_quick.svg";
import FilterQuick from "../_component/filter/FilterQuick";
import Image from "next/image";
import Card from "../_component/main_home/Card";
import arrowIcon from "../../../public/icons/Arrow_down.svg";
import { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const categories = [
    {
        value: 0,
        name: '전체',
    },
    {
        value: 1,
        name: '수능',
    },
    {
        value: 2,
        name: '어학',
    },
    {
        value: 3,
        name: '취업',
    },
    {
        value: 4,
        name: '공무원',
    },
    {
        value: 5,
        name: '임용',
    },
    {
        value: 6,
        name: '전문직',
    },
    {
        value: 7,
        name: '대학생',
    },
    {
        value: 8,
        name: '자격증',
    },
    {
        value: 9,
        name: '코딩',
    },
    {
        value: 10,
        name: '모각공',
    },
    {
        value: 11,
        name: '기타',
    },
]

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
]

export default function StudyList () {
    const router = useRouter();
    const [ activeTab, setActiveTab ] = useState("전체");
    const [ isQuickMatch, setIsQuickMatch ] = useState(false);

    return (
        <div className={styles.container}>
            <Navigation onClick={()=>router.push("./home")} dark={false}>
                <p className={styles.title}>신규 쇼터디</p>
            </Navigation>
            <div className={styles.categoryTabBox}>
                <div className={styles.swiperBox}>
                    <Swiper 
                        className={styles.swiper}
                        modules={[FreeMode]}
                        slidesPerView={5.5}
                        spaceBetween={9}
                        >
                        {categories.map((category, index) => (
                            <SwiperSlide 
                                className={activeTab === category.name ? styles.categoryActive : styles.category} 
                                key={index} 
                                onClick={()=>{
                                    setActiveTab(category.name)
                                }}>
                                    {category.name}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className={styles.devider}></div>
            <div className={styles.filterBox}>
                <Swiper 
                    slidesPerView={4}
                    modules={[FreeMode]}
                    spaceBetween={15}
                    >
                    <SwiperSlide>
                        <div className={styles.quickMatchBtn}>
                            <Image className={styles.quickIcon} src={Icon_quick} width={25} height={25} alt="quick"/>
                            <FilterQuick onClick={()=>{return}}>
                                빠른매칭
                            </FilterQuick>
                        </div>
                    </SwiperSlide>
                        {filter.map((item)=>(
                            <SwiperSlide>
                                <FilterQuick onClick={()=>{return}} arrow={true}>
                                    {item.filter}
                                </FilterQuick>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
            <div className={styles.infoBox}>
                <p>총 개의 쇼터디가 있어요</p>
                <button className={styles.sortButton}>
                    최근 등록순
                    <Image src={arrowIcon} width={20} height={20} alt="arrowBtn"/>
                </button>
            </div>
            <div className={styles.cardBox}>
                    <Card />
                    <Card />
                    <Card />
            </div>

        </div>
    );
}