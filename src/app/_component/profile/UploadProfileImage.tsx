import Image from "next/image";
import { useEffect, useRef } from "react";
import Icon from "../../../../public/icons/Icon_set_profile.svg";
import useStore from "./profileStore";
import styles from "./uploadProfile.module.css";

export default function UploadProfileImage() {
  const { previewImg } = useStore();
  const { setPostImg, setPreviewImg } = useStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultImageSet: Record<string, string> = {
    0: "http://res.cloudinary.com/dsfyp40dr/image/upload/v1714733931/p1zlj1jdedvvglagq9qw.png",
    1: "http://res.cloudinary.com/dsfyp40dr/image/upload/v1714734037/rgueaycfy2gbthrfyunr.png",
    2: "http://res.cloudinary.com/dsfyp40dr/image/upload/v1714734105/in3trdusgoojijksdfks.png",
  };

  function getRandomDefaultImageUrl(): string {
    const keys = Object.keys(defaultImageSet);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    setPreviewImg(defaultImageSet[randomKey]);
    return defaultImageSet[randomKey];
  }

  useEffect(() => {
    const randomImageUrl = getRandomDefaultImageUrl();
    setPreviewImg(randomImageUrl);
  }, []);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/i;
    if (!allowedExtensions.test(file.name)) {
      alert("jpg, jpeg, png, gif, svg 형식의 이미지 파일만 선택할 수 있습니다.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewImg(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);

    setPostImg(file);
  }

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon} onClick={handleIconClick}>
        {Icon && <Image src={Icon} alt="아이콘 이미지" width={64} height={64} />}
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          accept=".jpg, .jpeg, .png, .gif, .svg"
          className={styles.uploadInput}
          onChange={handleFileUpload}
        />
      </div>
      {previewImg && (
        <div className={styles.circularImageContainer}>
          <Image
            className={styles.circularImage}
            width={254}
            height={254}
            alt="미리보기 이미지"
            src={previewImg && (previewImg as string)}
            layout="fixed"
          />
        </div>
      )}
    </div>
  );
}
