"use client";
import Button from "@/app/_component/button/Button";
import favoriteStudy from "@/app/api/favoriteStudy";
import proposerStudy from "@/app/api/proposerStudy";
import registeredStudy from "@/app/api/registeredStudy";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import emptyIcon from "../../../../public/icons/profile/Icon_empty_exclamation_mark.svg";
import Card from "../_component/Card";
import MyStudyNav from "../_component/MyStudyNav";
import ProfileNav from "../_component/ProfileNav";
import styles from "./menu.module.css";
import { IMenuDataProps } from "./type/MenuType";

export default function Menu({ params }: { params: { menu: string } }) {
  const proposalRef = useRef(null);
  const progressRef = useRef(null);
  const completeRef = useRef(null);
  const router = useRouter();
  const studyType = params?.menu?.split("_")?.[1];
  const { accessToken } = useAuth();
  const [myStudyData, setMyStudyData] = useState<IMenuDataProps>();
  const [emptyTitle, setEmptyTitle] = useState("");
  
  const fetchMenuData = async (studyType: string) => {
    switch (studyType) {
      case "progress":
        setEmptyTitle("진행 중인");
        return await registeredStudy(accessToken, null);
      case "complete":
        setEmptyTitle("참여 완료인");
        return await registeredStudy(accessToken, "done");
      case "proposal":
        setEmptyTitle("참여 신청인");
        return await proposerStudy(accessToken);
      default:
        return await favoriteStudy(accessToken);
    }
  };

  const handleClickCard = (id: number) => {
    if (params?.menu == "in_proposal") {
    } else {
      return router.push(`/chat?studyId=${id}`);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken) {
          const data = await fetchMenuData(studyType);
          console.log(data);
          setMyStudyData(data);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchData();
  }, [accessToken, studyType]);

  const fetchMenuParam = async (param: string) => {
    return router.push(`/profile/in_${param}`);
  };
  return (
    <div style={{ height: "100vh" }}>
      <ProfileNav title={params?.menu == "in_favorite" ? "찜한 스터디" : "나의 스터디"} />
      {params?.menu == "in_favorite" ? (
        <div></div>
      ) : (
        <MyStudyNav
          studyType={studyType}
          proposalRef={proposalRef}
          progressRef={progressRef}
          completeRef={completeRef}
          fetchMenuParam={fetchMenuParam}
        />
      )}
      <div className={styles.menuContainer}>
        <p className={styles.studyCount}>총 {myStudyData?.totalCount}개의 쇼터디에 신청했어요</p>
        {myStudyData?.totalCount == 0 ? (
          <div className={styles.emptyStudyBox}>
            <Image src={emptyIcon} alt="경고 느낌표"></Image>
            <div className={styles.emptyTitleBox}>
              <h1 className={styles.emptyTitle}>
                {params?.menu == "in_favorite" ? "찜한 " : emptyTitle} 스터디가 없어요
              </h1>
              <p className={styles.emptySubTitle}>직접 스터디를 등록해 보세요!</p>
            </div>
            <Button size="medium" onClick={() => {}}>
              <h5 className={styles.buttonTitle}>쇼터디 둘러보기</h5>
            </Button>
          </div>
        ) : (
          <div className={styles.existStudyBox}>
            {myStudyData?.data?.map((study, idx) => {
              return (
                <div onClick={() => handleClickCard(study.id)} key={idx}>
                  <Card
                    data={study}
                    cardStyles={{
                      width: "100%",
                    }}
                    cardType={studyType}
                  ></Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
