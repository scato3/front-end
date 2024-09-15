import styles from './popularBox.module.scss';
import { useRouter } from 'next/navigation';

interface DataType {
  id: number;
  keyword: string;
}

type PopularBoxProps = {
  data: DataType[];
};

export default function PopularBox({ data }: PopularBoxProps) {
  const router = useRouter();
  const maxItems = 6;
  const emptyData = new Array(maxItems).fill(null);

  const displayData = emptyData.map((_, index) => data[index] || null);

  return (
    <div className={styles.Container}>
      <h2>인기 검색어</h2>
      <div className={styles.gridContainer}>
        {displayData.map((item, index) => (
          <div
            key={item.keyword}
            className={styles.gridItem}
            onClick={() => {
              if (item) {
                router.push(`./search_result?search=${item.keyword}`);
              }
            }}
          >
            <span>{index + 1}</span>
            <p>{item ? item.keyword : '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
