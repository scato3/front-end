"use client";

import styles from "./main_home.module.css";
import Footer from "../_component/footer/footer";
import Image from "next/image";
import Search from "../../../public/icons/Icon_search.svg";
import Alert from "../../../public/icons/_main01/Icon_alert.svg";
import Button from "../_component/button/Button";
import ButtonBox from "../_component/main_home/ButtonBox";
import Card from "../_component/main_home/Card";
import Btn_arrow from "../../../public/icons/Btn_arrow_sm.svg";
import { useRouter } from "next/navigation";
import useFromStore from "@/utils/from";
import { useEffect } from "react";

export default function Main_home() {
  const { setFrom } = useFromStore();
  const router = useRouter();

  useEffect(() => {
    setFrom("home");
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navBox}>
          <div className={styles.navImageContainer}>
            <Image
              className={styles.searchIcon}
              src={Search}
              alt="검색 버튼"
              width={48}
              height={48}
              onClick={() => {
                router.push("./search");
              }}
            />
            <Image className={styles.alertIcon} src={Alert} alt="검색 버튼" width={48} height={48} />
          </div>
        </div>
        <div className={styles.buttonBox}>
          <Button
            size="medium"
            property="confirm"
            onClick={() => {
              router.push("./fastMatching");
            }}
          >
            빠른 매칭
          </Button>
          <Button
            size="medium"
            property="confirm"
            onClick={() => {
              router.push("./createStudy");
            }}
          >
            쇼터디 운영
          </Button>
        </div>
        <div className={styles.ButtonBox}>
          <ButtonBox />
        </div>
        <div className={styles.ContentContainer}>
          <div className={styles.line}></div>
          <div className={styles.titleBox}>
            <p>신규 쇼터디</p>
            <div className={styles.moreContainer}>
              <div className={styles.btnMore} onClick={() => router.push("./studyList")}>
                더보기
                <Image src={Btn_arrow} width={24} height={24} alt="더보기"></Image>
              </div>
            </div>
          </div>
          <div className={styles.cardBox}>
            <div className={styles.card}></div>
          </div>
        </div>
      </div>

      <div className={styles.footerBox}>
        <Footer />
      </div>
    </>
  );
}
