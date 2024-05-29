"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import proposerStudy from "@/app/api/proposerStudy";
import registeredStudy from "@/app/api/registeredStudy";
import useAuth from "@/hooks/useAuth";
import DetailCard from "./_component/DetailCard";
import Navigation from "@/app/_component/navigation/page";
import styles from "./detail.module.css";
import NoStudy from "@/app/search_result/_component/NoStudy";
import { IfilterType } from "@/app/type/filterType";
import useDetailActiveStore from "../store/detailActive";
import useFromStore from "@/utils/from";
import Loading from "@/app/_component/Loading";

const FILTERS = ["참여신청", "참여대기", "참여중", "참여완료"];

export default function ProfileDetail() {
  const router = useRouter();
  const { accessToken } = useAuth();
  const { selectedInfo } = useDetailActiveStore();
  const [activeFilter, setActiveFilter] = useState<string>(FILTERS[selectedInfo - 1] || FILTERS[0]);
  const [postData, setPostData] = useState<IfilterType[]>([]);
  const [isCancel, setIsCancel] = useState<boolean>(activeFilter === "참여신청");
  const { setFrom } = useFromStore();

  useEffect(() => {
    setActiveFilter(FILTERS[selectedInfo - 1] || FILTERS[0]);
  }, [selectedInfo]);

  useEffect(() => {
    setIsCancel(activeFilter === "참여신청");
  }, [activeFilter]);

  useEffect(() => {
    setFrom("profile/profileDetail");
  }, []);

  const { isLoading } = useQuery({
    queryKey: ["PROFILE_DETAIL", activeFilter, accessToken],
    queryFn: async () => {
      let fetchData;
      if (activeFilter === "참여신청") {
        fetchData = await proposerStudy(accessToken);
      } else if (activeFilter === "참여중") {
        fetchData = await registeredStudy(accessToken, null);
      } else if (activeFilter === "참여완료") {
        fetchData = await registeredStudy(accessToken, "done");
      } else if (activeFilter === "참여대기") {
        fetchData = await registeredStudy(accessToken, "before");
      }

      setPostData(fetchData.data);
      return fetchData.data;
    },
    enabled: true,
  });

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const getSeparatorPosition = () => {
    const index = FILTERS.indexOf(activeFilter);
    return `${(index / FILTERS.length) * 100}%`;
  };

  const getSeparatorWidth = () => {
    return `${100 / FILTERS.length}%`;
  };

  return (
    <div className={styles.Container}>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Navigation
            dark={false}
            isBack={true}
            onClick={() => {
              router.push("../profile");
            }}
          >
            나의 쇼터디 현황
          </Navigation>
          <div className={styles.DetailContainer}>
            {FILTERS.map((filter) => (
              <div
                key={filter}
                className={`${styles.FilterItem} ${activeFilter === filter ? styles.active : ""}`}
                onClick={() => handleFilterClick(filter)}
              >
                <p>{filter}</p>
              </div>
            ))}
          </div>
          <div className={styles.Separator}>
            <div
              className={styles.ActiveSeparator}
              style={{
                width: getSeparatorWidth(),
                left: getSeparatorPosition(),
              }}
            ></div>
          </div>
          <div className={styles.ContentContainer}>
            <div className={styles.InfoContainer}>
              <p className={styles.InfoHeader}>총 {postData?.length}개의 쇼터디에 신청했어요</p>
            </div>
            {postData && postData.length !== 0 ? (
              <div className={styles.CardBox}>
                {postData.map((data: IfilterType, index: number) => {
                  const cancelStatus =
                    activeFilter === "참여신청"
                      ? true
                      : activeFilter === "참여중" || activeFilter === "참여완료"
                        ? false
                        : data.user_relation?.is_owner === false;
                  return <DetailCard key={index} data={data} isCancel={cancelStatus} activeFilter={activeFilter} />;
                })}
              </div>
            ) : (() => {
              const comment =
              activeFilter === "참여신청"
                  ? "신청 중인 쇼터디가 없어요"
                  : activeFilter === "참여대기"
                  ? "대기 중인 쇼터디가 없어요"
                  : activeFilter === "참여중"
                  ? "참여 중인 쇼터디가 없어요"
                  : "참여 완료된 쇼터디가 없어요"
                return <NoStudy>{comment}</NoStudy>;
            }) ()}
          </div>
        </>
      )}
    </div>
  );
}
