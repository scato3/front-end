"use client";

import styles from "@/app/profile/profile.module.css";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProgressBar from "../_component/progress_bar/progressBar";
import myProfile from "../api/myProfile";
import ProfileNav from "./_component/ProfileNav";

export default function Profile() {
  interface IMyStudyCount {}
  interface IMyProfileData {
    email: string;
    nickname: string;
    profile_img: string;
    rating: number;
    user_id: number;
  }

  const [myProfileData, setMyProfileData] = useState<IMyProfileData | null>(null);
  const [profileStudyMenu, setProfileStudyMenu] = useState();

  const { accessToken } = useAuth();

  const fetchProfileData = async (token: string) => {
    const myProfileData = await myProfile(token);
    if (myProfileData) return myProfileData;
  };

  const keyLabels = {
    in_favorite: "찜한 스터디",
    in_proposal: "참여신청 스터디",
    in_progress: "참여중 스터디",
    in_complete: "완료한 스터디",
  };

  const profileMenuLabeling = (data: Object[]) => {
    const orderedKeys = ["in_favorite", "in_proposal", "in_progress", "in_complete"];
    return orderedKeys.map((key: string) => ({
      [key === "in_favorite"
        ? "찜한 스터디"
        : key === "in_proposal"
          ? "참여신청 스터디"
          : key === "in_progress"
            ? "참여중 스터디"
            : "완료한 스터디"]: data[key],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData] = await Promise.all([fetchProfileData(accessToken)]);
        if (profileData) {
          setMyProfileData(profileData?.profile);
          setProfileStudyMenu(profileMenuLabeling(profileData?.study_count));
        }
      } catch (error) {}
    };
    if (accessToken) fetchData();
  }, [accessToken]);

  return (
    <div className={styles.ProfileContainer}>
      <ProfileNav title="마이페이지" />
      <div className={styles.ProfileTop}>
        <div className={styles.ProfileBox}>
          <Image
            src={myProfileData?.profile_img ?? (process.env.NEXT_PUBLIC_UPLOAD_DEFAULT_IMAGE_URL as string)}
            alt={"프로필 이미지"}
            width={62}
            height={62}
            style={{ borderRadius: "100px" }}
          />
          <div className={styles.ProfileEditBox}>
            <p>{myProfileData?.nickname}</p>
            <button>프로필 수정</button>
          </div>
        </div>
        <div className={styles.ProfileRatingBox}>
          <p>나의 스터디 성적표</p>
          <div className={styles.ProfileProgressBox}>
            <ProgressBar
              progress={myProfileData?.rating ?? 0}
              progressStyles={{
                barBackgroundColor: "#E6E6E6",
                barGaugeBackgroundColor: "#666666",
                barWith: 70,
                barHeight: 10,
              }}
            />
            <div className={styles.ProfileRating}>
              {/* 점수별 Svg이미지 추가 */}
              <Image
                alt={"점수 이미지"}
                src={process.env.NEXT_PUBLIC_UPLOAD_DEFAULT_IMAGE_URL}
                width={30}
                height={30}
                style={{ borderRadius: "100px" }}
              />
              <h3>{myProfileData?.rating ?? 0}점</h3>
            </div>
          </div>
        </div>
        <div className={styles.ProfileMenuBox}>
          {profileStudyMenu &&
            profileStudyMenu?.map((menu, idx: number) => {
              const key = Object.keys(menu)[0]; // 요소의 키 추출
              const value = menu[key]; // 요소의 값 추출
              return (
                <Link
                  href={{
                    pathname: `profile/${Object.keys(keyLabels)[idx]}`,
                  }}
                  key={idx}
                  className={styles.ProfileMenu}
                >
                  <div>{key} </div>
                  <div>{value} </div>
                </Link>
              );
            })}
        </div>
      </div>
      <hr />
      <div>서비스 안내</div>
      <button>로그아웃</button>
    </div>
  );
}