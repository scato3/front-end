import { useState } from 'react';
import styles from './studyOverView.module.scss';
import Image from 'next/image';
import { ArrowDown } from '../../../public/arrow';
import { useWatch, useFormContext } from 'react-hook-form';
import { sortOption } from '@/data/filterData';
import { GetCardType } from '@/types/card/getCardType';

interface ViewProps {
  totalCount: number;
}

export default function StudyOverView({ totalCount }: ViewProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { control, setValue } = useFormContext<GetCardType>();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const orderType = useWatch({
    control,
    name: 'orderType',
  });

  const selectedLabel = sortOption.find(
    (option) => option.key === orderType
  )?.label;

  const handleSelectOption = (key: string) => {
    setValue('orderType', key);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Section}>
        <p>총 {totalCount}개의 쇼터디를 찾았어요</p>
        <div className={styles.filterDropDown} onClick={toggleDropdown}>
          <p>{selectedLabel}</p>
          <Image
            src={ArrowDown}
            width={12}
            height={12}
            alt="화살표"
            className={`${styles.arrow} ${isDropdownOpen ? styles.arrowUp : ''}`}
          />
        </div>
        {isDropdownOpen && (
          <ul className={styles.dropdownMenu}>
            {sortOption.map((option) => (
              <li
                key={option.key}
                className={orderType === option.key ? styles.active : ''}
                onClick={() => handleSelectOption(option.key)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
