import styles from "./search_input.module.css";

export default function Search_Input() {
    return(
        <div className={styles.container}>
            <input className={styles.input} type="text" placeholder="20글자까지 작성할 수 있어요!"></input>
        </div>
    );
}