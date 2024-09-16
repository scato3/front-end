import { useFormContext, useWatch } from 'react-hook-form';
import styles from './tendencyBox.module.scss';
import { tendencyOption } from '@/data/filterData';
import { useEffect } from 'react';

interface ITendencyBoxProps {
  type?: string;
}

export default function TendencyBox({ type }: ITendencyBoxProps) {
  const { setValue, control, getValues } = useFormContext();

  const selectedArray = useWatch({
    control,
    name: 'tendency',
  });

  useEffect(() => {
    console.log(getValues());
  }, [getValues]);

  const handleClick = (key: string) => {
    let updatedValue;

    const currentArray = Array.isArray(selectedArray) ? selectedArray : [];

    if (type === 'createStudy') {
      // createStudy일 경우 하나만 선택 가능
      if (currentArray.includes(key)) {
        updatedValue = '';
      } else {
        updatedValue = key;
      }
    } else {
      // 다른 경우는 여러 개 선택 가능 (배열)
      if (currentArray.includes(key)) {
        updatedValue = currentArray.filter((item: string) => item !== key);
      } else {
        updatedValue = [...currentArray, key];
      }
    }

    setValue('tendency', updatedValue);
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
