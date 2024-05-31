"use client";

import styles from "./cancelmodal.module.css";
import { IfilterType } from "@/app/type/filterType";
import Button from "@/app/_component/button/Button";
import JoinCancel from "@/app/api/joinCancel";
import useAuth from "@/hooks/useAuth";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface CancelModalProps {
  handleCloseModal: () => void;
  data: IfilterType;
  activeFilter: string;
}

export default function CancelModal({ handleCloseModal, data, activeFilter }: CancelModalProps) {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const CancelData = useMutation({
    mutationFn: () => JoinCancel(data.id, accessToken),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["PROFILE_DETAIL", activeFilter, accessToken] });
    },
  });

  const handleCancel = () => {
    CancelData.mutate();
    handleCloseModal();
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
