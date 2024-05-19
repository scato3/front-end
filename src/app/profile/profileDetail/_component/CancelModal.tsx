"use client";

import styles from "./cancelmodal.module.css";
import { IfilterType } from "@/app/type/filterType";
import Button from "@/app/_component/button/Button";
import JoinCancel from "@/app/api/joinCancel";
import useAuth from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

interface CancelModalProps {
  handleCloseModal: () => void;
  data: IfilterType;
}

export default function CancelModal({ handleCloseModal, data }: CancelModalProps) {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const CancelData = async () => {
    try {
      await JoinCancel(data.id, accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    queryClient.invalidateQueries({ queryKey: ["PROFILE_DETAIL"] });
    CancelData();
    window.location.reload();
  };

  return (
    <div className={styles.Container}>
      <p>참여 신청을 취소할까요</p>
      <div className={styles.BtnContainer}>
        <Button property="cancel" size="small" onClick={handleCloseModal}>
          돌아가기
        </Button>
        <Button property="default" size="small" onClick={handleCancel}>
          신청취소
        </Button>
      </div>
    </div>
  );
}
