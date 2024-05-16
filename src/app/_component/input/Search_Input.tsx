import styles from "./search_input.module.css";

interface ISearchInput {
    handleEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string
}

const Search_Input: React.FC<ISearchInput> = ({ handleEnter, onChange, value }) => {
    return(
        <div className={styles.container}>
            <input 
                className={styles.input} 
                type="text" 
                name="최근검색어"
                onKeyDown={handleEnter}
                onChange={onChange}
                value={value}
                placeholder="20글자까지 작성할 수 있어요!" />
        </div>
    );
}

export default Search_Input;