import {
  수능,
  대학생,
  취업,
  전문직,
  어학,
  자격증,
  코딩,
  공무원,
  임용,
  모각공,
  기타,
} from '../../../public/category';

import styles from './categoryBox.module.scss';
import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';

const icons = [
  { icon: 수능, alt: '수능' },
  { icon: 대학생, alt: '대학생' },
  { icon: 취업, alt: '취업' },
  { icon: 전문직, alt: '전문직' },
  { icon: 어학, alt: '어학' },
  { icon: 자격증, alt: '자격증' },
  { icon: 코딩, alt: '코딩' },
  { icon: 공무원, alt: '공무원' },
  { icon: 임용, alt: '임용' },
  { icon: 모각공, alt: '모각공' },
  { icon: 기타, alt: '기타' },
];

export default function CategoryBox() {
  const { setValue, control } = useFormContext();

  // useWatch로 form의 'category' 값을 실시간으로 감시
  const watchedCategory = useWatch({ control, name: 'category' });

  // 상태로 관리하는 활성화된 카테고리
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // 카테고리 변경 시 상태 업데이트
  const handleClick = (alt: string) => {
    setActiveCategory(alt);
    setValue('category', alt); // form 값도 업데이트
  };

  // form에 저장된 값이 있을 경우, 해당 값을 active 상태로 설정
  useEffect(() => {
    if (watchedCategory) {
      setActiveCategory(watchedCategory);
    }
  }, [watchedCategory]);

  return (
    <div className={styles.gridContainer}>
      {icons.map((icon) => (
        <div key={icon.alt} className={styles.iconContainer}>
          <div
            className={`${styles.iconBox} ${activeCategory === icon.alt ? styles.active : ''}`}
            onClick={() => handleClick(icon.alt)}
          >
            <Image
              src={icon.icon}
              alt={icon.alt}
              className={styles.iconImage}
            />
          </div>
          <p
            className={`${styles.category} ${activeCategory === icon.alt ? styles.active : ''}`}
          >
            {icon.alt}
          </p>
        </div>
      ))}
    </div>
  );
}
