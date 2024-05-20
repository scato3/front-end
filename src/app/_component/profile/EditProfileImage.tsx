import Image from "next/image";
import { useEffect, useRef } from "react";
import Icon from "../../../../public/icons/Icon_set_profile.svg";
import styles from "./editProfile.module.css";
import useEditProfileStore from "@/app/profile/store/editProfile";

export default function EditProfileImage() {
  const { previewImg, setPostImg, setPreviewImg } = useEditProfileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i;
    if (!allowedExtensions.test(file.name)) {
      alert("jpg, jpeg, png, svg 형식의 이미지 파일만 선택할 수 있습니다.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewImg(fileReader.result as string);
      setPostImg(file);
    };
    fileReader.readAsDataURL(file);
  }

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon} onClick={handleIconClick}>
        {Icon && <Image src={Icon} alt="아이콘 이미지" width={36} height={36} />}
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          accept=".jpg, .jpeg, .png, .svg"
          className={styles.uploadInput}
          onChange={handleFileUpload}
        />
      </div>
      {previewImg && (
        <div className={styles.circularImageContainer}>
          <Image
            className={styles.circularImage}
            width={150}
            height={150}
            alt="미리보기 이미지"
            src={previewImg && (previewImg as string)}
            layout="fixed"
          />
        </div>
      )}
    </div>
  );
}
