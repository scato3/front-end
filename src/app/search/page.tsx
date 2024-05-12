"use client"

import styles from "./search.module.css"
import Search_Input from "../_component/input/Search_Input"
import Navigation from "../_component/navigation/page";
import Footer from "../_component/footer/footer";
import IconBell from "../../../public/icons/_main01/Icon_alert.svg";
import Image from "next/image";
import SearchTag from "./_component/SearchTag";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import PopularKeyword from "./_component/PopularKeyword";

const shortCutIcons = [
    {
        path: "/icons/search/Btn_전체.svg",
        alt: "전체",
    },
    {
        path: "/icons/search/Btn_마감임박.svg",
        alt: "마감임박",
    },
    {
        path: "/icons/search/Btn_신규.svg",
        alt: "신규",
    },
    {
        path: "/icons/search/Btn_승인없는.svg",
        alt: "승인없는",
    },
]

const tags = ["카공", "취준", "영어공부", "영어", "루틴", "습관", "공부"]

export default function Search() {
    return(
        <div className={styles.container}>
            <Navigation dark={true} onClick={()=>{return;}}>
                <Image className={styles.iconBell} src={IconBell} width={58} height={58} alt="bell" />
            </Navigation>
            <div className={styles.searchInputBox}>
                <Search_Input />
            </div>
            <div className={styles.recentSearchBox}>
                <div className={styles.recentBoxTop}>
                    <p>최근 검색어</p>
                    <p className={styles.edit}>edit</p>
                </div>
                <div >
                    <Swiper className={styles.recentKeywordBox}
                            modules={[FreeMode]}
                            slidesPerView={4}
                            spaceBetween={10}
                            >
                            {tags.map((keyword, index) => (
                            <SwiperSlide className={styles.recentKeyword} key={index}>
                                <SearchTag key={index}>{keyword}</SearchTag>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className={styles.hrLine}></div>
            <div className={styles.popularBox}>
                <p>인기 검색어</p>
                <Swiper className={styles.popularSwiper}
                        pagination={true}
                        modules={[Pagination]}
                        >
                    <SwiperSlide>
                        <PopularKeyword slideNum={1}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <PopularKeyword slideNum={2}/>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={styles.hrLine}></div>
            <div className={styles.shortCutBox}>
                <p>바로가기</p>
                <div className={styles.iconBox}>
                    {shortCutIcons.map((icon, index) => (
                        <Image className={styles.icon} key={index} src={icon.path} width={96} height={96} alt={icon.alt} />
                    ))}
                </div>
            </div>
            <div className={styles.footerBox}>
                <Footer selectedIndex={1}/>
            </div>
        </div>
    );
}