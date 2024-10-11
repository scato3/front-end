import styles from './profile.module.scss';
import ProfileClient from './profileClient';

export default async function Profile() {
  return (
    <div className={styles.Container}>
      <ProfileClient />
    </div>
  );
}
