"use client"

import styles from './main_home.module.css'
import Footer from '../_component/footer/footer';
import Image from 'next/image';
import Search from "../../../public/icons/Icon_search.svg";
import Alert from "../../../public/icons/_main01/Icon_alert.svg"
import Button from '../_component/button/Button';
import ButtonBox from '../_component/main_home/ButtonBox';
import Card from '../_component/main_home/Card';
import Btn_arrow from '../../../public/icons/Btn_arrow_sm.svg';

const cards : { card: React.ReactNode }[] = [
    {
        card: <Card />
    },
    {
        card: <Card />
    },
    {
        card: <Card />
    }
];

export default function Main_01({onClick}:{onClick:() => void}) {
    return (
    <div className={styles.container}>
        <div className={styles.navBox}>
        <Image className={styles.searchIcon} src={Search} alt="검색 버튼" width={48} height={48} onClick={onClick} />
        <Image className={styles.alertIcon} src={Alert} alt="검색 버튼" width={62} height={62} onClick={onClick} />
        </div>
        <div className={styles.buttonBox}>
        <Button
            size='medium'
            property='confirm'
            onClick={()=>{return;}}
        >빠른 매칭</Button>
        <Button
            size='medium'
            property='confirm'
            onClick={()=>{return;}}
        >쇼터디 운영</Button>
        </div>
        <div className={styles.ButtonBox}>
            <ButtonBox />
        </div>
        <div className={styles.line}></div>
        <div className={styles.titleBox}>
            <p>신규 쇼터디</p>
            <button className={styles.btnMore}>
            더보기
            <Image src={Btn_arrow} width={24} height={24} alt='더보기'></Image>
            </button>
        </div>
        <div className={styles.cardBox}>
            {cards.map((cards, index) => (
                <div className={styles.card} key={index}>
                    {cards.card}
                </div>
            ))}
        </div>
        <Footer />
    </div>
  );
}