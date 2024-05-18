"use client";

import styles from "./mystudy.module.css";
import Footer from "../_component/footer/footer";
import Navigation from "../_component/navigation/page";
import Image from "next/image";
import IconBell from "../../../public/icons/_main01/Icon_alert.svg";
import useAuth from "@/hooks/useAuth";
import MyStudyList from "../api/myStudyList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IMyStudyType } from "./type/myStudyType";
import moment from "moment";
import useFromStore from "@/utils/from";
import NoStudy from "../search_result/_component/NoStudy";

export default function MyStudy() {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [studyData, setStudyData] = useState<IMyStudyType[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const { setFrom } = useFromStore();

  useEffect(() => {
    setFrom("myStudy");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await MyStudyList(accessToken);
        setStudyData(data.data);
      } catch (error) {
        console.error("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(studyData);
  }, [studyData]);

  const handleGoInfo = (page: number) => {
    router.push(`./studyInfo?studyId=${page}`);
  };

  const handleGoList = () => {
    router.push("./studyList");
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.Container}>
            <Navigation dark={true} onClick={() => {}}>
              <Image className={styles.iconBell} src={IconBell} width={48} height={48} alt="bell" />
            </Navigation>
            <p className={styles.Header}>총 {studyData.length}개의 쇼터디에 참여중이에요!</p>
            {studyData.length === 0 ? (
              <>
                <NoStudy>모집중인 쇼터디가 없어요</NoStudy>
                <div className={styles.NoContainer}>
                  <div className={styles.NoStudyBtn} onClick={handleGoList}>
                    쇼터디 둘러보기
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.CardBox}>
                {studyData.map((data, index) => (
                  <div
                    key={index}
                    className={`${styles.CardContainer} ${index === studyData.length - 1 ? styles.LastCard : ""}`}
                  >
                    <div className={styles.ContentContainer}>
                      <p className={styles.CardHeader}>{data.title}</p>
                      <div className={styles.SubObject}>
                        <div className={styles.Category}>{data.category}</div>
                        <div>
                          {moment(data.start_date).format("MM.DD")} - {moment(data.end_date).format("MM.DD")}
                        </div>
                        <div>{data.cur_participants_num}명 참여</div>
                      </div>
                      <div className={styles.TargetContainer}>
                        <p>오늘완료</p>
                        <p>03/</p>
                        <p className={styles.TargetNumber}>02</p>
                        <p className={styles.Percent}>33%</p>
                      </div>
                      <div className={styles.ProgressBar}>
                        <div className={styles.SuccessProgress} style={{ width: "33%" }}></div>
                      </div>
                    </div>
                    <div className={styles.ButtonContainer}>
                      <button className={styles.InfoButton} onClick={() => handleGoInfo(data.id)}>
                        스터디 소개
                      </button>
                      <button className={styles.JoinButton}>채팅방 입장</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.FooterContainer}>
            <Footer selectedIndex={2} />
          </div>
        </>
      )}
    </>
  );
}
