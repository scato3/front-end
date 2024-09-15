import { useFormContext, useWatch } from 'react-hook-form';
import styles from './tendencyBox.module.scss';
import { tendencyOption } from '@/data/filterData';
import { useEffect } from 'react';

export default function TendencyBox() {
  const { setValue, control, getValues } = useFormContext();

  // useWatch로 'tendency' 값을 배열로 감시, 값이 없으면 빈 배열로 초기화
  const selectedArray: string[] = useWatch({
    control,
    name: 'tendency',
  });

  useEffect(() => {
    console.log(getValues());
  }, [getValues]);

  const handleClick = (key: string) => {
    let updatedArray;

    if (selectedArray.includes(key)) {
      updatedArray = selectedArray.filter((item: string) => item !== key);
    } else {
      updatedArray = [...selectedArray, key];
    }

    setValue('tendency', updatedArray);
  };

  return (
    <div className={styles.optionContainer}>
      {tendencyOption.map((item) => (
        <div
          key={item.key}
          className={`${styles.optionBox} ${
            selectedArray?.includes(item.key) ? styles.active : ''
          }`}
          onClick={() => handleClick(item.key)}
        >
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
