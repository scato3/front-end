import { useState } from "react";
import styles from "./component.module.css";
import Button from "@/app/_component/button/Button";
import useToDoStore from "../../store/useToDoStore";
import moment from "moment";

export default function ToDoInputBox({ onClick }: { onClick: () => void }) {
  const { setToDo, selectedDate } = useToDoStore();
  const [inputValue, setInputValue] = useState("");

  const createToDo = (todo: string) => {
    setToDo(todo);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      createToDo(inputValue);
      onClick();
    }
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== "") {
      createToDo(inputValue);
      onClick();
    }
  };

  const isBeforeToday = moment(selectedDate).isBefore(moment(), "day");

  return (
    <div className={styles.ToDoInputContainer}>
      <input
        className={styles.ToDoInput}
        placeholder="할 일을 입력해 주세요"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        maxLength={20}
        disabled={isBeforeToday}
      />
      <Button size="very_small" property="confirm" onClick={handleButtonClick}>
        등록
      </Button>
    </div>
  );
}
