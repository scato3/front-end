export const dynamic = 'force-dynamic';

import styles from './main.module.scss';
import MainHeader from '@/component/common/mainHeader';
import { getFirstCard } from '@/apis/card/getCard';
import MainClient from './mainClient';

export default async function Main() {
  const cardData = await getFirstCard();

  return (
    <div className={styles.Container}>
      <MainHeader />
      <MainClient cardData={cardData} />
    </div>
  );
}
