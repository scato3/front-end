import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
import styles from './filterSwiper.module.scss';
import { filterData } from '@/data/filterData';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface FilterSwiperProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FilterSwiper({
  activeTab,
  setActiveTab,
}: FilterSwiperProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sliderRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 300px)': {
        slides: { perView: 4.5, spacing: 10 },
      },
      '(min-width: 390px)': {
        slides: { perView: 5, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams, setActiveTab]);

  return (
    <div className={styles.categoryTabBox}>
      <div ref={sliderRef} className="keen-slider">
        {filterData.map((category, index) => {
          const currentSearchQuery = searchParams.get('search');

          return (
            <div
              key={category.value}
              onClick={() => setActiveTab(category.name)}
              className={`keen-slider__slide ${
                activeTab === category.name ? styles.activeSlide : ''
              }`}
            >
              <Link
                href={{
                  pathname: pathname,
                  query: {
                    tab: category.name,
                    ...(currentSearchQuery && { search: currentSearchQuery }),
                  },
                }}
                key={index}
                className={
                  activeTab === category.name
                    ? styles.categoryActive
                    : styles.category
                }
              >
                <div className={styles.nameContainer}>
                  <p>{category.name}</p>
                  {activeTab === category.name && (
                    <div className={styles.activeLine}></div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
