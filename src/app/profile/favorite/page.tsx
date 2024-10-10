import Navigation from '@/component/common/navigation';
import styles from './favorite.module.scss';
import Card from '@/component/card/card';
import { CardType } from '@/types/card/cardType';
import NoStudy from '@/component/common/noStudy';
import { getMyFavoriteStudy } from '@/apis/profile/userProfile';
import { cookies } from 'next/headers';

export default async function ProfileFav() {
  const cookieStore = cookies();
  const token =
    cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string)
      ?.value || '';

  const { data } = await getMyFavoriteStudy(token);

  console.log(data);

  return (
    <div className={styles.Container}>
      <Navigation title="내가 찜한 스터디" />
      <div className={styles.verticalLine}></div>
      <div className={styles.section}>
        <h2>총 {data.length || 0}개의 쇼터디를 찜했어요</h2>
        <div className={styles.CardSection}>
          {data && data?.length > 0 ? (
            data.map((data: CardType) => (
              <Card data={data} key={data.id} gray={true} />
            ))
          ) : (
            <div className={styles.NoStudyContainer}>
              <NoStudy type="NoFavorite" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
