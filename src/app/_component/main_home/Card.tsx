import Image from "next/image";
import calendarIcon from "../../../../public/icons/_main01/Icon_calendar.svg";
import peopleIcon from "../../../../public/icons/_main01/Icon_people.svg";
import styles from "./card.module.css";

export default function Card({ data, cardStyles }: { data: any; cardStyles: any }) {
  return (
    <div className={styles.container}>
      <div className={styles.cardBox} style={{ width: cardStyles?.width }}>
        <div className={styles.titleBox}>
          <p className={styles.flag}>{data.category}</p>
          <p className={styles.title}>{data.title}</p>
        </div>
        <div className={styles.tagBox}>
          {data.additionalInfos?.map((tag: string) => {
            return <span className={styles.tagTitle}>#{tag}</span>;
          })}
        </div>
        <div className={styles.detailBox}>
          <Image src={peopleIcon} width={24} height={24} alt="사람아이콘" />
          <p className={styles.detail}>
            {data.cur_participants_num}/{data.max_participants_num}
          </p>
          <Image src={calendarIcon} width={24} height={24} alt="달력아이콘" />
          <p className={styles.detail}>
            {data.start_date.substring(2)} ~ {data.end_date.substring(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
