"use client";

import styles from "./profileEditModal.module.css";
import Image from "next/image";
import IconClose from "../../../../public/icons/studyInfo/Icon_close.svg";
import Button from "@/app/_component/button/Button";
import editProfile from "@/app/api/editProfile";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import usedNickname from "../../../../public/Caution_editProfile_used.svg";
import validationNickname from "../../../../public/Caution_editProfile_validation.svg";
import EditProfileImage from "@/app/_component/profile/EditProfileImage";
import checkDupNickname from "../../api/checkDupNickname";

import uploadImage from "../../api/uploadImage";
import useEditProfileStore from "../store/editProfile";

interface IProfile {
    nickname: string;
    profileImage: string | ArrayBuffer | null;
}

interface ImemberModal {
        nickname: string;
        handleCloseModal: () => void;
        profileImage: string | ArrayBuffer | null;
}

export default function ProfileEditModal({ nickname, profileImage, handleCloseModal }: ImemberModal) {
    const { postImg, setPreviewImg } = useEditProfileStore();
    const { accessToken } = useAuth();
    const currentUser = useAuth((state) => state.user);
    const [profileData, setProfileData] = useState<IProfile>({
        nickname: nickname,
        profileImage: profileImage,
    });

    useEffect(() => {
        setPreviewImg(profileImage);
    }, []);

    const [validation, setValidation] = useState<string>("availableNickname");

    const handleSetProfile = async () => {
        if (profileData.nickname && validation === "availableNickname") {
        let updatedProfileImage = null;

        if (postImg) {
            updatedProfileImage = await uploadImage(postImg);
        } else {
            updatedProfileImage = profileData.profileImage;
        }

        setProfileData({ ...profileData, profileImage: updatedProfileImage });
        const res = await editProfile({ ...profileData, profileImage: updatedProfileImage }, accessToken);
        }
    };

    const handleInputNickname = async (inputData: string) => {
        setValidation("");
        if(inputData === nickname){
            setValidation("availableNickname");
        }else{
            setProfileData({ ...profileData, nickname: inputData });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " ") {
        e.preventDefault();
        }
    };

    const handleCheckValidate = async () => {
        const nickname = profileData?.nickname;
        const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;

        if (nickname && nickname.length >= 2 && regex.test(nickname)) {
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
        } else {
        setValidation(validationNickname);
        }
    };

    const handleEditProfile = async () => {
        await handleSetProfile();
        handleCloseModal();
        window.location.reload();
        if (typeof currentUser?.nickname === "string" && profileData.nickname !== null) {
        useAuth.getState().setUser({ ...currentUser, nickname: profileData.nickname });
        }
    };

    return (
        <div className={styles.container}>
        <div className={styles.containerTop}>
            <p className={styles.name}>프로필 편집</p>
            <Image
            className={styles.closeIcon}
            src={IconClose}
            width={36}
            height={36}
            alt="close"
            onClick={handleCloseModal}
            />
        </div>
        <div className={styles.profileImageBox}>
            <EditProfileImage />
        </div>
        <div className={styles.inputBox}>
            <input
            className={styles.input}
            type="text"
            placeholder="2-10자 사이의 한글, 영문, 숫자만 가능해요"
            defaultValue={nickname}
            minLength={2}
            maxLength={10}
            onKeyDown={handleKeyDown}
            onChange={(e) => handleInputNickname(e.target.value as string)}
            />
            <Button
            size="very_small"
            property={validation === "availableNickname" ? "disabled" : "default"}
            onClick={handleCheckValidate}
            >
            {validation === "availableNickname" ? "확인완료" : "중복확인"}
            </Button>
        </div>
        <div className={styles.cautionBox}>
            {validation && validation !== "availableNickname" && (
                <Image className={styles.caution} width={344} height={49} src={validation} alt="validationNickname" />
            )}
            </div>

            <div className={styles.buttonBox}>
            <Button
                size="large_main"
                property={validation === "availableNickname" && profileData.nickname ? "default" : "disabled"}
                onClick={handleEditProfile}
            >
                프로필 저장하기
            </Button>
            </div>
        </div>
        );
    }
