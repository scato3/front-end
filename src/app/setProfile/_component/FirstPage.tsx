"use client";

import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import caution from "../../../../public/Caution.svg";
import caution0 from "../../../../public/Caution0.svg";
import caution2 from "../../../../public/Caution2.svg";
import goodName from "../../../../public/goodName.svg";
import Button from "../../_component/button/Button";
import Navigation from "../../_component/navigation/page";
import UploadProfileImage from "../../_component/profile/UploadProfileImage";
import useStore from "../../_component/profile/profileStore";
import checkDupNickname from "../../api/checkDupNickname";
import setProfile from "../../api/setProfile";
import uploadImage from "../../api/uploadImage";
import styles from "./firstPage.module.css";

export default function SetProfile({ onRegister }: { onRegister: () => void }) {
  const router = useRouter();
  const { postImg, previewImg } = useStore();
  const { accessToken } = useAuth();
  interface IProfileData {
    nickname: string | null;
    profileImage: string | ArrayBuffer | null;
  }
  const [profileData, setProfileData] = useState<IProfileData>({
    nickname: null as string | null,
    profileImage: null as string | ArrayBuffer | null,
  });
  const [validation, setValidation] = useState<string>(caution0);

  const handleSetProfile = async () => {
    if (profileData.nickname && validation === goodName) {
      let profileImage = null;

      if (postImg) {
        // 이미지 선택 했을 시 로직
        profileImage = await uploadImage(postImg);
      } else {
        profileImage = previewImg;
      }

      // 이미지 경로를 상태에 저장
      setProfileData({ ...profileData, profileImage });
      const result = await setProfile(profileData, accessToken);
      if (result) onRegister();
      else alert("가입 중 오류 발생");
    }
  };

  useEffect(() => {
    if (profileData.nickname && profileData.profileImage) {
      handleSetProfile();
    }
  }, [profileData.profileImage]);

  const handleInputNickname = async (inputData: string) => {
    setProfileData({ ...profileData, nickname: inputData });
  };

  useEffect(() => {
    const validateNickname = async () => {
      const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
      if (!profileData.nickname) {
        setValidation(caution0);
        return;
      }
      if (profileData.nickname.length >= 2 && regex.test(profileData.nickname)) {
        try {
          const isDuplicate = await checkDupNickname(profileData.nickname);
          if (isDuplicate) {
            setValidation(caution2);
          } else {
            setValidation(goodName);
          }
        } catch (error) {
          console.error("Error while checking nickname duplication:", error);
        }
      } else {
        setValidation(caution);
      }
    };

    validateNickname();
  }, [profileData]);

  return (
    <div className={styles.container}>
      <Navigation onClick={() => router.push("./")}>프로필 등록</Navigation>
      <UploadProfileImage />

      <Image className={styles.caution} width={344} height={49} src={validation} alt="caution" />
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          type="text"
          placeholder="사용할 이름을 알려주세요!"
          onChange={(e) => handleInputNickname(e.target.value as string)}
        />
      </div>
      <div className={styles.buttonBox}>
        <Button size="large" property={validation == goodName ? "confirm" : "disabled"} onClick={handleSetProfile}>
          등록하기
        </Button>
      </div>
    </div>
  );
}
