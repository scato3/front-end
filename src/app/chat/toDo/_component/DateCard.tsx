import styles from "./component.module.css";
import Image from "next/image";
import Icon from "../../../../../public/icons/Icon_calendar.svg";

export default function DateCard({openModal}:{openModal:()=>void}){
    return(
        <div className={styles.DateContainer} onClick={openModal}>
            <Image 
                className={styles.DateIcon} 
                src={Icon} 
                width={24} 
                height={24} 
                alt="calendar" 
            />
            <p className={styles.Date}>2024-05-16</p>
        </div>
    );
}