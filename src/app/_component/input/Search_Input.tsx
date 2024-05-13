import styles from "./search_input.module.css";

interface ISearchInput {
    handleEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Search_Input({handleEnter}:ISearchInput) {
    return(
        <div className={styles.container}>
            <input 
                className={styles.input} 
                type="text" 
                name="최근검색어"
                onKeyDown={handleEnter}
                placeholder="20글자까지 작성할 수 있어요!" />
        </div>
    );
}