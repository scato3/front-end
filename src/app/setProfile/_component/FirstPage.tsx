"use client";

import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import availableNickname from "../../../../public/Profile_available_nickname_speech_bubble.svg";
import usedNickname from "../../../../public/Profile_used_nickname_speech_bubble.svg";
import validationNickname from "../../../../public/Profile_validation_nickname_speech_bubble.svg";
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
  const [validation, setValidation] = useState<string>(validationNickname);

  const handleSetProfile = async () => {
    if (profileData.nickname && validation === availableNickname) {
      let profileImage = null;

      if (postImg) {
        profileImage = await uploadImage(postImg);
      } else {
        profileImage = previewImg;
      }

      setProfileData({ ...profileData, profileImage });
      const result = await setProfile(profileData, accessToken);
      if (result) return onRegister();
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

      if (profileData?.nickname && profileData?.nickname?.length >= 2 && regex.test(profileData.nickname)) {
        try {
          if (await checkDupNickname(profileData.nickname)) {
            setValidation(usedNickname);
          } else {
            setValidation(availableNickname);
          }
        } catch (error) {
          console.error("Error while checking nickname duplication:", error);
        }
      } else {
        setValidation(validationNickname);
      }
    };

    validateNickname();
  }, [profileData.nickname]);

  const handleRegisterButton = async () => {
    setValidation(availableNickname);
    await handleSetProfile();
  };

  return (
    <div className={styles.container}>
      <Navigation dark={true} onClick={() => router.push("./")}>
        프로필 등록
      </Navigation>
      <UploadProfileImage />

      <Image className={styles.caution} width={344} height={49} src={validation} alt="validationNickname" />
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          type="text"
          placeholder="사용할 이름을 알려주세요!"
          onChange={(e) => handleInputNickname(e.target.value as string)}
        />
      </div>
      <div className={styles.buttonBox}>
        <Button
          size="large"
          property={validation == availableNickname ? "default" : "disabled"}
          onClick={handleRegisterButton}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
