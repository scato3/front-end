import styles from "./component.module.css";
import Button from "@/app/_component/button/Button";

export default function ToDoInputBox() {

    return(
        <div className={styles.ToDoContainer}>
            <input 
                className={styles.ToDoInput}
                placeholder="할 일을 입력해 주세요"
            >

            </input>
            <Button size="very_small" property="confirm" onClick={()=>{return}}>
                등록
            </Button>
        </div>
    );
}