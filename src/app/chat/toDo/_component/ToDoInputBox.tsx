import styles from "./component.module.css";
import Button from "@/app/_component/button/Button";
import useToDoStore from "../../store/useToDoStore";

export default function ToDoInputBox({onClick}:{onClick:()=>void}) {
    const { toDo, setToDo } = useToDoStore();

    const createToDo = (todo:string) => {
        setToDo(todo);
    };

    return(
        <div className={styles.ToDoInputContainer}>
            <input 
                className={styles.ToDoInput}
                placeholder="할 일을 입력해 주세요"
                onChange={(e) => createToDo(e.target.value as string)}
            >
            </input>
            <Button 
                size="very_small" 
                property="confirm" 
                onClick={onClick}
            >
                등록
            </Button>
        </div>
    );
}