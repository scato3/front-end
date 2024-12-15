import Image from 'next/image';
import styles from '../chat.module.scss';
import { IconMegaPhone } from '../../../../public/icons';
import { ArrowDown } from '../../../../public/arrow';

export const ChatNotice = () => {
  return (
    <div className={styles.noticeContainer}>
      <Image
        src={IconMegaPhone}
        alt="메가폰"
        className={styles.megaPhoneImage}
      />
      <p>채팅창 상단 고정 내용</p>
      <Image src={ArrowDown} alt="메가폰" className={styles.ArrowDownImage} />
    </div>
  );
};
