"use client";

import styles from "./favorite.module.css";
import Navigation from "../../_component/navigation/page";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FavoriteStudy from "@/app/api/favoriteStudy";
import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import Card from "@/app/_component/main_home/Card";
import { IfilterType } from "@/app/type/filterType";
import NoStudy from "@/app/_component/noStudy/NoStudy";

export default function Favorite() {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [postData, setPostData] = useState<IfilterType[]>([]);

  const { data } = useQuery({
    queryKey: ["MY_FAVORITE", accessToken],
    queryFn: async () => {
      const result = await FavoriteStudy(accessToken);
      return result;
    },
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (data) {
      setPostData(data.data);
    }
  }, [data]);

  return (
    <div className={styles.Container}>
      <Navigation
        isBack={true}
        dark={false}
        onClick={() => {
          router.push("../profile");
        }}
      >
        내가 찜한 쇼터디
      </Navigation>

      {postData && postData.length !== 0 ? (
        <div className={styles.ContentContainer}>
          <p className={styles.Header}>총 {postData?.length}개의 스터디를 찜했어요</p>
          <div className={styles.CardBox}>
            {postData.map((data: IfilterType, index: number) => (
              <Card key={index} data={data} />
            ))}
          </div>
        </div>
      ) : (
        <NoStudy>찜한 스터디가 없어요!</NoStudy>
      )}
    </div>
  );
}
