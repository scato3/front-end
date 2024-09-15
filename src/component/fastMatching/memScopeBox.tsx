import { useFormContext, useWatch } from 'react-hook-form';
import styles from './memScopeBox.module.scss';
import { memscopeOption } from '@/data/memScopeData';

export default function MemScopeBox() {
  const { setValue, control } = useFormContext();

  const selectedValues =
    useWatch({
      control,
      name: 'mem_scope',
    }) || [];

  const selectedArray: number[] = Array.isArray(selectedValues)
    ? selectedValues
    : [];

  const handleClick = (key: number) => {
    let updatedArray;

    if (selectedArray.includes(key)) {
      updatedArray = selectedArray.filter((item: number) => item !== key);
    } else {
      updatedArray = [...selectedArray, key];
    }

    setValue('mem_scope', updatedArray);
  };

  return (
    <div className={styles.optionContainer}>
      {memscopeOption.map((item) => (
        <div
          key={item.key}
          className={`${styles.optionBox} ${
            selectedArray.includes(item.key) ? styles.active : ''
          }`}
          onClick={() => handleClick(item.key)}
        >
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
