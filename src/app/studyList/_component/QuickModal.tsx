import React from "react";
import styles from "./quickModal.module.css";
import Button from "@/app/_component/button/Button";
import { useState } from "react";

interface IQuickModal {
    setQuickMatch: React.Dispatch<React.SetStateAction<boolean>>;
    handleCloseModal: () => void;
}

    const tabs: string[] = ["카테고리", "인원수", "타입"];

export default function QuickModal({ handleCloseModal, setQuickMatch }: IQuickModal) {
    const [ tabSelected, setTabSelected ] = useState<string>("카테고리");

    return (
        <div className={styles.container}>
        <div className={styles.tabBox}>
            {tabs.map((tab, index) => (
            <p
                key={index}
                className={tabSelected === tab ? `${styles.tab} ${styles.tabSelected}` : styles.tab}
                onClick={() => {
                setTabSelected(tab);
                }}
            >
                {tab}
            </p>
            ))}
        </div>
        <div className={styles.filterBox}>ㅇㅇ</div>
        <div className={styles.btnBox}>
            <Button
            size="large"
            onClick={() => {
                setQuickMatch(true);
                handleCloseModal();
            }}
            >
            해당 필터 적용하기
            </Button>
        </div>
        </div>
    );
}
