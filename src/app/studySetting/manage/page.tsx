import Navigation from '@/component/common/navigation';
import styles from './manage.module.scss';
import StudyManageClient from './studyManageClient';

export default function StudyManage() {
  return (
    <div className={styles.Container}>
      <Navigation title="스터디 멤버 관리" />
      <div className={styles.verticalLine}></div>
      <StudyManageClient />
    </div>
  );
}
