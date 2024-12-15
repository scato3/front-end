import Image from 'next/image';
import styles from '../chat.module.scss';
import { IconAdd, IconOut } from '../../../../public/icons';
import { RightArrow } from '../../../../public/arrow';
import { menuItems } from '@/data/menu';

interface MenuOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export const ChatMenu = ({ visible, onClose }: MenuOverlayProps) => {
  return (
    <div
      className={`${styles.menuOverlay} ${
        visible ? styles.visible : styles.unvisible
      }`}
      onClick={onClose}
    >
      <div
        className={`${styles.menuContent} ${
          visible ? styles.visible : styles.unvisible
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.menuHeaderWrapper}>
          <h2>스터디 캔버스</h2>
          <Image
            src={IconAdd}
            alt="X 아이콘"
            className={styles.IconAdd}
            width={16.4}
            height={16.4}
            onClick={onClose}
          />
        </div>
        <section className={styles.menuSection}>
          {menuItems.map((item) =>
            item.isSectionHeader ? (
              <div key={item.label} className={styles.sectionHeader}>
                {item.label}
              </div>
            ) : (
              <div key={item.label} className={styles.menuItem}>
                <span>{item.label}</span>
                {item.hasMemberIcons && (
                  <div className={styles.memberIcons}>
                    <div className={styles.memberCircle} />
                    <div className={styles.memberCircle} />
                    <div className={styles.memberCircle} />
                  </div>
                )}
                <Image
                  src={RightArrow}
                  alt="Right Arrow Icon"
                  className={styles.arrowIcon}
                />
              </div>
            )
          )}
        </section>
        <div className={styles.buttonWrapper}>
          <Image src={IconOut} alt="나가기 아이콘" />
          <button className={styles.button}>스터디 나가기</button>
        </div>
      </div>
    </div>
  );
};
