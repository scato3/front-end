"use client"

import styles from "./search.module.css"
import Search_Input from "../_component/input/Search_Input"
import Navigation from "../_component/navigation/page";
import Footer from "../_component/footer/footer";
import IconBell from "../../../public/icons/_main01/Icon_alert.svg";
import Image from "next/image";

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

export default function Search() {
    return(
        <div className={styles.container}>
            <Navigation dark={true} onClick={()=>{return;}}>
                <Image className={styles.iconBell} src={IconBell} width={58} height={58} alt="bell" />
            </Navigation>
            <div className={styles.searchInputBox}>
                <Search_Input dark={false}/>
            </div>
            <div className={styles.recentSearchBox}>
                <div className={styles.recentBoxTop}>
                    <p className={styles.subTitle}>최근 검색어</p>
                    <p className={styles.edit}>edit</p>
                </div>
                <div className={styles.recentKeywordBox}>
                    키워드
                </div>
            </div>
            <div className={styles.hrLine}></div>
            <div className={styles.popularBox}>
                <p className={styles.subTitle}>인기 검색어</p>
                <div className={styles.popularKeywordBox}>
                    키워드
                </div>
            </div>
            <div className={styles.hrLine}></div>
            <div className={styles.shortCutBox}>
                <p className={styles.subTitle}>바로가기</p>
                <div className={styles.iconBox}>
                    {shortCutIcons.map((icon, index) => (
                        <Image className={styles.icon} key={index} src={icon.path} width={96} height={96} alt={icon.alt} />
                    ))}
                </div>
            </div>
            <Footer selectedIndex={1}/>
        </div>
    );
}