import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styles from './recentBox.module.scss';
import { IconX } from '../../../public/icons';
import Image from 'next/image';
import {
  deleteRecentSearch,
  deleteAllRecentSearch,
} from '@/apis/search/search';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface DataType {
  id: number;
  keyword: string;
}

type RecentBoxProps = {
  data: DataType[];
};

export default function RecentBox({ data }: RecentBoxProps) {
  const queryClient = useQueryClient();
  const [sliderRef, slider] = useKeenSlider({
    slides: { perView: 4, spacing: 10 },
    loop: false,
  });

  const [items, setItems] = useState(data);

  useEffect(() => {
    if (slider.current) {
      slider.current.update();
    }
  }, [items, slider]);

  const handleDelete = async (study_id: number) => {
    await deleteRecentSearch(study_id);
    queryClient.invalidateQueries({
      queryKey: ['recentSearch'],
      refetchType: 'all',
    });

    setItems((prevItems) => prevItems.filter((item) => item.id !== study_id));
  };

  const handleAllDelete = async () => {
    await deleteAllRecentSearch();
    queryClient.invalidateQueries({
      queryKey: ['recentSearch'],
      refetchType: 'all',
    });
    setItems([]);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.header}>
        <h2>최근검색어</h2>
        <p onClick={handleAllDelete}>지우기</p>
      </div>

      <div ref={sliderRef} className={`keen-slider ${styles.tagContainer}`}>
        {items.map((item) => (
          <div key={item.id} className={`keen-slider__slide ${styles.tags}`}>
            #{item.keyword}
            <Image
              src={IconX}
              alt="iconX"
              className={styles.iconX}
              onClick={() => handleDelete(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
