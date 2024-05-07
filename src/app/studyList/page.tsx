"use client";

import styles from "./studyList.module.css";
import Navigation from "../_component/navigation/page";
import { useRouter } from "next/navigation";

const categories = [
    {
        category: '전체',
    },
    {
        category: '수능',
    },
    {
        category: '어학',
    },
    {
        category: '취업',
    },
    {
        category: '공무원',
    },
    {
        category: '임용',
    },
]

export default function StudyList () {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <Navigation onClick={()=>router.push("./home")} dark={false}>
                <p className={styles.title}>신규 쇼터디</p>
            </Navigation>
            <div className={styles.categoryBox}>

            </div>
            <div className={styles.filter}>

            </div>
            <div className={styles.cardBox}>

            </div>

        </div>
    );
}