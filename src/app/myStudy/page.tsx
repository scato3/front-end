"use client";

import styles from "./mystudy.module.css";
import Footer from "../_component/footer/footer";
import Navigation from "../_component/navigation/page";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import MyStudyList from "../api/myStudyList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IMyStudyType } from "./type/myStudyType";
import moment from "moment";
import useFromStore from "@/utils/from";
import NoStudy from "../_component/noStudy/NoStudy";
import Loading from "../_component/Loading";

export default function MyStudy() {
  const router = useRouter();
  const { accessToken, isLogin } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.Container}>
            <Navigation dark={true} onClick={() => {}}></Navigation>
            {studyData.length === 0 && isLogin ? (
              <div className={styles.NoContainer}>
                <NoStudy>참여중인 쇼터디가 없어요</NoStudy>
                <div className={styles.NoStudyBtn} onClick={() => router.push("./studyList")}>
                  쇼터디 둘러보기
                </div>
              </div>
            ) : isLogin === false ? (
              <div className={styles.NoContainer}>
                <NoStudy type="NoLogin">로그인이 필요해요</NoStudy>
                <div className={styles.NoStudyBtn} onClick={() => router.push("./login")}>
                  로그인 / 회원가입
                </div>
              </div>
            ) : (
              <>
                <p className={styles.Header}>총 {studyData.length}개의 쇼터디에 참여중이에요!</p>
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
                            {moment(data.start_date).format("MM.DD")} -{" "}
                            {data.end_date ? moment(data.end_date).format("MM.DD") : "미정"}
                          </div>
                          <div>{data.cur_participants_num}명 참여</div>
                        </div>
                        <div className={styles.TargetContainer}>
                          <p>오늘완료</p>
                          <p>{data.progress_todo.total_num}/</p>
                          <p className={styles.TargetNumber}>{data.progress_todo.complete_num}</p>
                          <p className={styles.Percent}>{data.progress_todo.percent}%</p>
                        </div>
                        <div className={styles.ProgressBar}>
                          <div
                            className={styles.SuccessProgress}
                            style={{ width: `${data.progress_todo.percent}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className={styles.ButtonContainer}>
                        <button className={styles.InfoButton} onClick={() => handleGoInfo(data.id)}>
                          스터디 소개
                        </button>
                        <button
                          className={styles.JoinButton}
                          onClick={() => {
                            router.push(`../chat?studyId=${data.id}`);
                          }}
                        >
                          채팅방 입장
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
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
