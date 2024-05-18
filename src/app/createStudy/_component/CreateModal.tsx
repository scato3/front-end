import styles from "./create.module.css";
import Button from "@/app/_component/button/Button";
import { useRouter } from "next/navigation";
import useCreateStore from "../store/CreateStore";

interface ICreateModal {
  handleCloseModal: () => void;
}

export default function CreateModal({ handleCloseModal }: ICreateModal) {
  const { setSelectedDuration, setSelectedDate } = useCreateStore();
  const router = useRouter();
  const handleCreate = () => {
    setSelectedDuration(null);
    setSelectedDate(null);
    router.push("./home");
    handleCloseModal();
  };

  return (
    <div className={styles.CreateModalContainer}>
      <p className={styles.ModalContent}>쇼터디를 만들었어요</p>
      <div className={styles.BtnContainer}>
        <Button size="small" property="default" onClick={handleCreate}>
          확인
        </Button>
      </div>
    </div>
  );
}
