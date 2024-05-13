import styles from "./popularKeyword.module.css";

const tags = ["카공", "취준", "영어공부", "영어", "루틴", "습관", "공부", "취준", "영어공부", "영어", "카공", "취준", "영어공부", "영어","Topcit"]

export default function PopularKeyword({slideNum} : {slideNum: 1 | 2 | 3}) {

    const list1 :string[] = tags.slice( 0 , 6 );
    const list2 :string[] = tags.slice( 6 , 12 );
    const list3 :string[] = tags.slice( 12 , 18 );


    return(
        <div className={styles.container}>
            {slideNum === 1 && (
                list1.map((keyword, index) => (
                    <p className={styles.keyword}>{`${index+1}. ${keyword}`}</p> 
                )
            ))}
            {slideNum === 2 && (
                list2.map((keyword, index) => (
                    <p className={styles.keyword}>{`${index+7}. ${keyword}`}</p> 
                )
            ))}
            {slideNum === 3 && (
                list3.map((keyword, index) => (
                    <p className={styles.keyword}>{`${index+13}. ${keyword}`}</p> 
                ) 
            ))}
        </div>
    );
}