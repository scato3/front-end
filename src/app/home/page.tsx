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
import { useEffect, useState } from "react";
import { IfilterType } from "@/app/type/filterType";
import NoStudy from "../search_result/_component/NoStudy";
import getFilter from "../api/getFilter";
import Navigation from "../_component/navigation/page";

export default function Main_home() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [postData, setPostData] = useState<IfilterType[]>([]);
  const { setFrom } = useFromStore();
  const router = useRouter();

  useEffect(() => {
    setFrom("home");
  }, []);

  useEffect(() => {
    const getPopular = async () => {
      try {
        const res = await getFilter("all", "recent");
        setPostData(res.data);
        console.log(res.data);
      } catch (e) {
        console.error("error");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(getPopular, 500);

    return () => clearTimeout(timer);

  }, []);

  return (
    <>
      {!isLoading && (
        <div className={styles.container}>
          <Navigation dark={true} onClick={() => {}}>
            <Image className={styles.iconBell} src={Alert} width={48} height={48} alt="bell" />
            <Image
              className={styles.iconSearch}
              src={Search}
              width={48}
              height={48}
              alt="search"
              onClick={() => {
                router.push("./search");
              }}
            />
          </Navigation>
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
            <div className={styles.card}>
              {postData.length > 0 ? (
                postData.slice(0, 3).map((data, index) => <Card key={index} data={data} />)
              ) : (
                <div className={styles.NoStudy}>
                  <NoStudy>모집중인 쇼터디가 없어요</NoStudy>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className={styles.footerBox}>
        <Footer />
      </div>
    </>
  );
}
