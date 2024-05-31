import styles from "./component.module.css";
import Image from "next/image";
import IconChecked from "../../../../../public/icons/chatting/Checked_Checkbox.svg";
import IconUnchecked from "../../../../../public/icons/chatting/Unchecked_Checkbox.svg";
import IconEdit from "../../../../../public/icons/chatting/Edit.svg";
import IconClose from "../../../../../public/icons/chatting/Icon_close.svg";

interface ITodos {
    id:number;
    content: string;
    complete: boolean;
}

interface IToDoContent {
    todo: ITodos;
}

export default function ToDoContent({todo}:IToDoContent) {
    return(
        <div className={styles.ToDoContainer}>
        <Image
            className={styles.CheckBox}
            src={IconUnchecked}
            width={24}
            height={24}
            alt="uncheckedBox"
        />
        <p className={styles.TodoContent} key={todo.id}>{todo.content}</p>
        <Image
            src={IconEdit}
            width={16}
            height={16}
            alt="edit"
        />
        <Image
            className={styles.DeleteIcon}
            src={IconClose}
            width={10.5}
            height={10.5}
            alt="DeleteBtn"
        />
        </div>
    )
}