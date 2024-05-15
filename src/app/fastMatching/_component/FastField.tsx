import styles from "./field.module.css";
import Button from "@/app/_component/button/Button";
import { ICloseModalProps } from "@/app/type/closeModalType";
import { useState, useEffect } from "react";
import useFastStore from "../store/FastStore";

const fields = ["어학", "대학생", "자격증", "공무원", "취업", "임용", "코딩", "전문직", "수능", "모각공"];

export default function FastField({ handleCloseModal }: ICloseModalProps) {
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { setSelectedField } = useFastStore();

  useEffect(() => {
    setButtonProperty(selectedItem ? "confirm" : "disabled");
  }, [selectedItem]);

  const handleFieldClick = (field: string) => {
    setSelectedItem(field);
  };

  const handleClose = () => {
    setSelectedField(selectedItem);
    handleCloseModal();
  };

  return (
    <div className={styles.FieldContainer}>
      <div className={styles.ContentContainer}>
        {fields.map((field, index) => (
          <p
            key={index}
            className={`${styles.Content} ${field === selectedItem ? styles.Selected : ""}`}
            onClick={() => handleFieldClick(field)}
          >
            {field}
          </p>
        ))}
      </div>
      <div className={styles.ButtonContainer}>
        <Button size="large_main" property={buttonProperty} onClick={handleClose}>
          해당 분야로 선택 완료
        </Button>
      </div>
    </div>
  );
}
