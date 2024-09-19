'use client';

import styles from './chat_bubble.module.scss';
import MainHeader from '@/component/common/mainHeader';
import { useGetProgressStudy } from '@/apis/study/progress';
import BubbleCard from '@/component/card/bubbleCard';
import NoStudy from '@/component/common/noStudy';
import Button from '@/component/common/button';
import { useRouter } from 'next/navigation';

export default function ChatBubble() {
  const router = useRouter();
  const { data } = useGetProgressStudy();

  return (
    <div className={styles.Container}>
      <MainHeader />
      <div className={styles.section}>
        {data?.data?.length > 0 ? (
          <h2>총 {data?.totalCount}개의 쇼터디에 참여하고 있어요</h2>
        ) : null}
        {data?.data && data.data.length > 0 ? (
          data.data.map((study: any) => (
            <BubbleCard key={study.id} data={study} />
          ))
        ) : (
          <div className={styles.noStudyContainer}>
            <NoStudy type="NoProgress" />
            <div className={styles.buttonContainer}>
              <Button
                onClick={() => {
                  router.push('./studyList');
                }}
              >
                쇼터디 둘러보기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
