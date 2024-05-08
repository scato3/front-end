import styles from "./quickModal.module.css";
import Button from "@/app/_component/button/Button";

const tabs = [
    {
        name: "카테고리"
    },
    {
        name: "인원수"
    },
    {
        name: "타입"
    },
]
export default function QuickModal() {
    return (
        <div className={styles.container}>
            <div className={styles.tabBox}>
                {tabs.map((tab, index) => (
                    <p className={styles.tab} key={index}>{tab.name}</p>
                ))}
            </div>
            <div className={styles.filterBox}>
                
            </div>
            <div className={styles.btnBox}>
                <Button size="large" onClick={()=>{return}}>해당 필터 적용하기</Button>
            </div>
        </div>
    )
}