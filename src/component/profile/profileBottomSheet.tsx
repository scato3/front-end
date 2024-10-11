import { useEffect, useState } from 'react';
import styles from './profileBottomSheet.module.scss';
import { IconBlackX, IconCamera } from '../../../public/icons';
import Image from 'next/image';
import Button from '../common/button';
import { usePatchMyProfile } from '@/apis/profile/userProfile';
import { useAlert } from '@/context/alertProvider';
import { convertToWebP } from '@/utils/convertToWebP';
import { processImageFile } from '@/utils/processImageFile';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCheckDuplicateProfile } from '@/apis/profile/userProfile';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
  profile_image: string;
}

export default function ProfileBottomSheet({
  isOpen,
  onClose,
  nickname,
  profile_image,
}: BottomSheetProps) {
  const queryClient = useQueryClient();
  const [isAnimating, setIsAnimating] = useState(false);
  const [editedNickname, setEditedNickname] = useState(nickname);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [webpImage, setWebpImage] = useState<File | null>(null);
  const { mutate } = usePatchMyProfile();
  const { showAlert } = useAlert();

  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(false);
  const { refetch } = useGetCheckDuplicateProfile(editedNickname);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsAnimating(true);
      }, 50);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSave = async () => {
    if (!webpImage) {
      showAlert('이미지를 선택해주세요.');
      return;
    }

    try {
      // 이미지 업로드 요청
      const formData = new FormData();
      formData.append('file', webpImage);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
      );
      formData.append(
        'cloud_name',
        process.env.NEXT_PUBLIC_UPLOAD_CLOUD_NAME as string
      );

      const response = await fetch(
        process.env.NEXT_PUBLIC_UPLOAD_API as string,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const result = await response.json();
      const uploadedImageUrl = result.url;

      // 프로필 업데이트 요청
      mutate(
        { nickname: editedNickname, profileImage: uploadedImageUrl },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['myProfile'],
              type: 'all',
            });
            handleClose();
          },
          onError: (error: any) => {
            showAlert(error.message);
          },
        }
      );
    } catch (error: any) {
      showAlert(error.message);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const webpFile = await processImageFile(
        file,
        setProfileImage,
        convertToWebP,
        showAlert
      );
      if (webpFile) {
        setWebpImage(webpFile);
      }
    }
  };

  const handleCheckDuplicate = async () => {
    try {
      const { isFetching, data } = await refetch();
      if (!isFetching && data) {
        setIsDuplicate(data.duplicate);
        setIsDuplicateChecked(true);
      }
    } catch (error) {
      showAlert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div
      className={`${styles.overLay} ${isAnimating ? styles.open : ''}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.bottomSheet} ${isAnimating ? styles.open : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.sheetContent}>
          <h2>프로필 편집</h2>
          <Image
            src={IconBlackX}
            width={16}
            height={16}
            alt="종료 아이콘"
            onClick={handleClose}
            className={styles.iconX}
          />
          <div className={styles.imageContainer}>
            <div className={styles.cameraContainer}>
              <label htmlFor="fileInput">
                <Image src={IconCamera} alt="카메라 사진" />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/webp"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
            {profileImage ? (
              <Image
                src={profileImage}
                alt="프로필 이미지 미리보기"
                width={127}
                height={127}
                className={styles.profileImage}
              />
            ) : (
              <Image
                src={profile_image}
                alt="기존 프로필 이미지"
                width={107}
                height={107}
                className={styles.profileImage}
              />
            )}
          </div>
          <div className={styles.inputContainer}>
            <input
              value={editedNickname}
              onChange={(e) => setEditedNickname(e.target.value)}
              className={styles.sheetInput}
            />
            <div className={styles.duplicate} onClick={handleCheckDuplicate}>
              중복확인
            </div>
            {isDuplicateChecked && (
              <p className={styles.duplicateMessage}>
                {isDuplicate
                  ? '이미 사용 중인 닉네임입니다.'
                  : '사용 가능한 닉네임입니다.'}
              </p>
            )}
          </div>
        </div>
        <div className={styles.ButtonContainer}>
          <Button
            onClick={handleSave}
            disabled={!isDuplicateChecked || isDuplicate === true}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
