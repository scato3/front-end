'use client';

import styles from './chat_bubble.module.scss';
import MainHeader from '@/component/common/mainHeader';
import { useGetProgressStudy } from '@/apis/study/progress';
import BubbleCard from '@/component/card/bubbleCard';

export default function ChatBubble() {
  const { data } = useGetProgressStudy();

  return (
    <div className={styles.Container}>
      <MainHeader />
      <div className={styles.section}>
        <h2>총 {data?.totalCount}개의 쇼터디에 참여하고 있어요</h2>
        {data?.data?.map((study: any) => (
          <BubbleCard key={study.id} data={study} />
        ))}
      </div>
    </div>
  );
}
