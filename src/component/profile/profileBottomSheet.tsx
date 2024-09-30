import { useEffect, useState } from 'react';
import styles from './profileBottomSheet.module.scss';
import { IconBlackX } from '../../../public/icons';
import Image from 'next/image';
import Button from '../common/button';
import { usePatchMyProfile } from '@/apis/profile/userProfile';
import { useAlert } from '@/context/alertProvider';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
  onNicknameChange: (newNickname: string) => void;
}

export default function ProfileBottomSheet({
  isOpen,
  onClose,
  nickname,
  onNicknameChange,
}: BottomSheetProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [editedNickname, setEditedNickname] = useState(nickname);
  const { mutate } = usePatchMyProfile();
  const { showAlert } = useAlert();

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

  const handleSave = () => {
    mutate(
      { nickname: editedNickname },
      {
        onSuccess: () => {
          onNicknameChange(editedNickname);
          handleClose();
        },
        onError: (error) => {
          showAlert(error.message);
        },
      }
    );
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
          <div className={styles.imageContainer}></div>
          <div className={styles.inputContainer}>
            <input
              value={editedNickname}
              onChange={(e) => setEditedNickname(e.target.value)}
              className={styles.sheetInput}
            />
            <div className={styles.duplicate}>중복확인</div>
          </div>
        </div>
        <div className={styles.ButtonContainer}>
          <Button onClick={handleSave}>저장</Button>
        </div>
      </div>
    </div>
  );
}
