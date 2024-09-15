import { useFormContext, useWatch } from 'react-hook-form';
import styles from './durationBox.module.scss';
import { durationOption } from '@/data/durationData';

export default function DurationBox() {
  const { setValue, control } = useFormContext();

  const selectedKey = useWatch({
    control,
    name: 'duration',
  });

  const handleClick = (key: string) => {
    setValue('duration', key);
  };

  return (
    <div className={styles.optionContainer}>
      {durationOption.map((item) => (
        <div
          key={item.key}
          className={`${styles.optionBox} ${
            selectedKey === item.key ? styles.active : ''
          }`}
          onClick={() => handleClick(item.key)}
        >
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
