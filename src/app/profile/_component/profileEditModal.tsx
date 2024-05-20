"use client";

import styles from "./profileEditModal.module.css";
import Image from "next/image";
import IconClose from "../../../../public/icons/studyInfo/Icon_close.svg";
import Button from "@/app/_component/button/Button";

import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import usedNickname from "../../../../public/Caution_editProfile_used.svg";
import validationNickname from "../../../../public/Caution_editProfile_validation.svg";
import EditProfileImage from "@/app/_component/profile/EditProfileImage";
import checkDupNickname from "../../api/checkDupNickname";
import setProfile from "../../api/setProfile";
import uploadImage from "../../api/uploadImage";
import useEditProfileStore from "../store/editProfile";

interface IProfile {
    nickname: string | null ;
    profileImage: string | ArrayBuffer | null ;
}

interface ImemberModal {
    handleCloseModal: () => void ;
    profileImage: string | ArrayBuffer | null;
}

export default function ProfileEditModal({profileImage, handleCloseModal}:ImemberModal) {
    const { previewImg,  postImg, setPreviewImg } = useEditProfileStore();
    const { accessToken, user } = useAuth();
    const [profileData, setProfileData] = useState<IProfile>({
        nickname: null,
        profileImage: profileImage,
    });

    useEffect(() => {
        setPreviewImg(profileImage);
    }, []);

    const [validation, setValidation] = useState<string>("");

    const handleSetProfile = async () => {
        if (profileData.nickname && validation === "availableNickname") {
        let profileImage = null;

        if (postImg) {
            profileImage = await uploadImage(postImg);
        } else {
            profileImage = previewImg;
        }

        setProfileData({ ...profileData, profileImage });
        const res = await setProfile(profileData, accessToken);
        if (res) console.log(res);
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

    const handleCheckValidate = async () => {
        const nickname = profileData?.nickname;
        const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;

            if(nickname && nickname.length >= 2 && regex.test(nickname)) {
            try {
                const isDuplicate = await checkDupNickname(nickname);
                if (isDuplicate) {
                    setValidation(usedNickname);
                } else {
                    setValidation("availableNickname");
                }
            } catch (error) {
                console.error("Error while checking nickname duplication:", error);
            }
            }  else{
                setValidation(validationNickname);
            }
    
    };
    
    
    const handleEditProfile = async () => {
        setValidation("availableNickname");
        await handleSetProfile();
        handleCloseModal();
        window.location.reload();
    };

    
    return(
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <p className={styles.name}>프로필 편집</p>
                <Image className={styles.closeIcon} src={IconClose} width={36} height={36} alt="close" onClick={handleCloseModal}/>
            </div>
            <div className={styles.profileImageBox}>
                <EditProfileImage />
            </div>
            <div className={styles.inputBox}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="2-10자 사이의 한글, 영문, 숫자만 가능해요"
                    minLength={2}
                    maxLength={20}
                    onChange={(e) => handleInputNickname(e.target.value as string)}
                />
                <Button 
                    size="very_small" 
                    property={validation === "availableNickname" ? "disabled" : "default"} 
                    onClick={handleCheckValidate}
                >{validation === "availableNickname" ? "확인완료" : "중복확인"}</Button>
            </div>
            <div className={styles.cautionBox}>
                {validation && validation != "availableNickname" && <Image className={styles.caution} width={344} height={49} src={validation} alt="validationNickname" /> }
            </div>

            <div className={styles.buttonBox}>
                <Button
                    size="large_main"
                    property={validation === "availableNickname" ? "default" : "disabled"}
                    onClick={handleEditProfile}
                >
                프로필 저장하기
                </Button>
            </div>
        </div>
    );
};




