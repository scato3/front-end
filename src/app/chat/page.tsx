import styles from './chat.module.scss';
import ChatClient from './chatClient';
import { Suspense } from 'react';

export default function Chat() {
  return (
    <Suspense>
      <div className={styles.Container}>
        <ChatClient />
      </div>
    </Suspense>
  );
}
