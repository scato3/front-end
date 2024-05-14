import ProgressBar from "@/app/_component/progress_bar/progressBar";
import Image from "next/image";
import calendarIcon from "../../../../public/icons/_main01/Icon_calendar.svg";
import peopleIcon from "../../../../public/icons/_main01/Icon_people.svg";
import styles from "./card.module.css";

export default function Card({ data, cardStyles, cardType }: { data: any; cardStyles?: any; cardType?: string }) {
  return (
    <div className={styles.cardWrapper}>
      {cardType == "favorite" ? (
        <div className={styles.container}>
          <div className={styles.cardBox} style={{ width: cardStyles?.width }}>
            <div className={styles.titleBox}>
              <p className={styles.title}>{data.title}</p>
            </div>
            <p className={styles.favoriteDetail}>
              <p className={styles.favoriteFlag}>{data.category}</p>
              <p>
                {data.start_date.substring(5)} ~ {data.end_date.substring(5)}
              </p>
              <p>{data.cur_participants_num}명 참여</p>
            </p>
            <div className={styles.favoriteTodo}>
              <div className={styles.favoriteTodo}>
                <p className={styles.todo}>오늘할일</p>
                <p>갯수1/갯수2</p>
              </div>
              <div>퍼센트</div>
            </div>
            <ProgressBar
              progress={10}
              progressStyles={{
                barBackgroundColor: "#A7A5A4",
                barGaugeBackgroundColor: "#FF6414",
                barWith: 100,
                barHeight: 10,
              }}
            ></ProgressBar>
            <div className={styles.buttonWrapper}>
              <button className={styles.buttonDetail}>스터디 소개</button>
              <button className={styles.buttonFavorite}>채팅방 입장</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.cardBox} style={{ width: cardStyles?.width }}>
            <div>
              <div className={styles.titleBox}>
                <p className={styles.flag}>{data.category}</p>
                <p className={styles.title}>{data.title}</p>
              </div>
              <div className={styles.tagBox}>
                {data.additionalInfos?.map((tag: string) => {
                  return <span className={styles.tagTitle}>#{tag}</span>;
                })}
              </div>
            </div>
            <div className={styles.detailBox}>
              <div className={styles.detailParticipants}>
                <Image src={peopleIcon} width={24} height={24} alt="사람아이콘" />
                <p className={styles.detail}>
                  {data.cur_participants_num}/{data.max_participants_num}
                </p>
              </div>
              <div className={styles.detailDate}>
                <Image src={calendarIcon} width={24} height={24} alt="달력아이콘" />
                <p className={styles.detail}>
                  {data.start_date.substring(5)} ~ {data.end_date.substring(5)}
                </p>
              </div>
              <div>{cardType == "proposal" && <button className={styles.buttonCancel}>신청 취소</button>}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
