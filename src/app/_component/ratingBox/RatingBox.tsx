import styles from "./ratingBox.module.css";
import ProgressBar from "../progress_bar/progressBar";
import Icon from "../../../../public/icons/Arrow_down.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import IconA from "../../../../public/icons/studyInfo/Icon_grade_A.svg";
import IconB from "../../../../public/icons/studyInfo/Icon_grade_B.svg";
import Iconc from "../../../../public/icons/studyInfo/Icon_grade_C.svg";

interface IRatingBox {
    user: IUserProfileType;
    type?: "modal" | "myPage";
    isLogin?: boolean;
}

export default function RatingBox({user, type="modal", isLogin=true}:IRatingBox) {
    const [ score, setScore ] = useState<number>(0);
    const [ src, setSrc ] = useState<string>(IconA);

    useEffect(() => {
        setScore(user.rating ?? 0);
        if( score >= 70 ) {
            setSrc(IconA);
        }else if(score >= 41 && score <= 69){
            setSrc(IconB)
        }else if( score >=20 && score <= 40){
            setSrc(Iconc)
        }
    }, []);

    return(
        <div className={type === "modal" ? styles.container : styles.containerMy}>
            {isLogin ?
            <div className={styles.ratingBox}>
                <div className={styles.containerTop}>
                    <p className={styles.title}>쇼터디 성적표</p>
                    <div className={styles.scoreBox}>
                    <Image
                        className={styles.scoreIcon}
                        alt={"점수 이미지"}
                        src={src}
                        width={36}
                        height={36}
                        />
                    <p className={styles.score}>{score}점</p>
                    </div>
                </div>
                <div className={styles.progressBarBox}>
                    <ProgressBar
                        progress={user.rating ?? 0}
                        progressStyles={{
                            barBackgroundColor: "var(--gray-400)",
                            barGaugeBackgroundColor: "var(--main-200)",
                            barWith: 100,
                            barHeight: 12,
                        }} 
                    />
                </div>
            </div>
            : <p className={styles.NoLogin}>로그인하고, 나의 쇼터디 성적표를 확인하세요!</p>
            }
        </div>
    );
}