import styles from './card.module.css'
import Image from 'next/image';
import calendarIcon from '../../../../public/icons/_main01/Icon_calendar.svg'
import peopleIcon from '../../../../public/icons/_main01/Icon_people.svg'


export default function Card() {
    return(
        <div className={styles.container}>
            <div className={styles.cardBox}>
                <div className={styles.titleBox}>
                    <p className={styles.flag}>취업</p>
                    <p className={styles.title}>한국기업 면접 스터디</p>
                </div>
                <div className={styles.tagBox}>
                    <p>#자료 공유 #모의면접 #예상 질문</p>
                </div>
                <div className={styles.detailBox}>
                    <Image
                        src={peopleIcon}
                        width={24}
                        height={24}
                        alt='사람아이콘'
                    />
                    <p className={styles.detail}>3/15</p>
                    <Image
                        src={calendarIcon}
                        width={24}
                        height={24}
                        alt='달력아이콘'
                    />
                    <p className={styles.detail}>23.01 ~ 23.05</p>
                </div>
            </div>
        </div>
    );
}