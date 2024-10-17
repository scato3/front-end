import styles from './chat.module.scss';
import ChatClient from './chatClient';

export default function Chat() {
  return (
    <div className={styles.Container}>
      <ChatClient />
    </div>
  );
}
