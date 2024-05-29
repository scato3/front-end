"use client";

import styles from "@/app/profile/profile.module.css";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import myProfile from "../api/myProfile";
import Footer from "../_component/footer/footer";
import RatingBox from "../_component/ratingBox/RatingBox";
import useFromStore from "@/utils/from";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "../_component/ModalContainer";
import ModalPortal from "../_component/ModalPortal";
import Logout from "../_component/logout/logout";
import useDetailActiveStore from "./store/detailActive";
import ProfileEditModal from "./_component/profileEditModal";
import Loading from "../_component/Loading";

export default function Profile() {
  interface IMyProfileData {
    email: string;
    nickname: string;
    profile_img: string;
    rating: number;
    user_id: number;
  }

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myProfileData, setMyProfileData] = useState<IMyProfileData | null>(null);
  const [profileStudyMenu, setProfileStudyMenu] = useState<{ [key: string]: number }[] | null>(null);
  const { setFrom } = useFromStore();
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  const {
    openModal: openEditModal,
    handleCloseModal: handleCloseEditModal,
    handleOpenModal: handleOpenEditModal,
  } = useModal();
  const { setSelectedInfo } = useDetailActiveStore();
  const { accessToken } = useAuth();

  useEffect(() => {
    setFrom("profile");
  }, []);

  const fetchProfileData = async (token: string) => {
    const myProfileData = await myProfile(token);
    if (myProfileData) {
      console.log(myProfileData);
      return myProfileData;
    }
  };

  const keyLabels = {
    in_favorite: "찜한 스터디",
    in_proposal: "참여신청 스터디",
    in_progress: "참여중 스터디",
    in_complete: "완료한 스터디",
  };

  const profileMenuLabeling = (data: { [key: string]: number }) => {
    const orderedKeys = ["in_favorite", "in_proposal", "in_progress", "in_complete"];
    return orderedKeys.map((key: string) => ({
      [key === "in_favorite" ? "찜" : key === "in_proposal" ? "승인대기" : key === "in_progress" ? "진행중" : "완료"]:
        data[key],
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
      setIsLoading(false);

    };
    if (accessToken) fetchData();
  }, [accessToken]);

  return (
    <>
    {isLoading ? <Loading /> : <>
      <div className={styles.container}>
        <div className={styles.contentsBox}>
          <div className={styles.nav}></div>
          <div className={styles.ProfileTop}>
            <div className={styles.ProfileBox}>
              <Image
                src={myProfileData?.profile_img ?? (process.env.NEXT_PUBLIC_UPLOAD_DEFAULT_IMAGE_URL as string)}
                alt={"프로필 이미지"}
                width={68}
                height={68}
                style={{ borderRadius: "100px" }}
              />
              <div className={styles.ProfileEditBox}>
                <p className={styles.nickname}>{myProfileData?.nickname}</p>
                <p className={styles.editProfile} onClick={handleOpenEditModal}>
                  프로필 편집
                </p>
              </div>
            </div>
            <div className={styles.ProfileRatingBox}>
              <div className={styles.ratingBoxTop}>
                {myProfileData && <RatingBox user={myProfileData} type="myPage" />}
              </div>
            </div>

            <div className={styles.ProfileMenuBox}>
              {profileStudyMenu &&
                profileStudyMenu?.map((menu, idx: number) => {
                  const key = Object.keys(menu)[0];
                  const value = menu[key];
                  const label =
                    key === "찜"
                      ? "favorite"
                      : key === "승인대기"
                        ? "proposal"
                        : key === "진행중"
                          ? "progress"
                          : "complete";
                  const pathname = label === "favorite" ? "profile/favorite" : "profile/profileDetail";
                  return (
                    <Link
                      href={{ pathname }}
                      key={idx}
                      className={styles.ProfileMenu}
                      onClick={() => setSelectedInfo(idx)}
                    >
                      <p className={styles.studyMenuKey}>{key}</p>
                      <p className={styles.studyMenuValue}>{value}</p>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className={styles.hr}></div>
          <div className={styles.serviceInfoBox}>
            <p className={styles.serviceInfo}>서비스 안내</p>
            <p className={styles.service}>이용약관</p>
            <p className={styles.service}>개인정보 처리방침</p>
            <p className={styles.service} onClick={handleOpenModal}>
              로그아웃
            </p>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer selectedIndex={3} />
      </div>
      </>
      }
      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <Logout handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}

      {openEditModal && (
        <ModalPortal>
          <ModalContainer>
            <ProfileEditModal
              handleCloseModal={handleCloseEditModal}
              nickname={myProfileData?.nickname ?? ""}
              profileImage={myProfileData?.profile_img ?? null}
            />
          </ModalContainer>
        </ModalPortal>
      )}
    </>
  );
}
