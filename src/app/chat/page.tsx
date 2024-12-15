import styles from './chat.module.scss';
import ChatClient from './chatClient';
import { Suspense } from 'react';

export default function Chat() {
  return (
    <div className={styles.Container}>
      <Suspense>
        <ChatClient />
      </Suspense>
    </div>
  );
}
