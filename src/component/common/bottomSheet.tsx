import { useFormContext, useWatch } from 'react-hook-form';
import styles from './bottomSheet.module.scss';
import { durationOption } from '@/data/durationData';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
  const { setValue, control } = useFormContext();

  const selectedDuration = useWatch({
    control,
    name: 'duration',
  });

  const handleSelectDuration = (value: string) => {
    setValue('duration', value);

    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div
      className={`${styles.overLay} ${isOpen ? styles.open : ''}`}
      onClick={onClose}
    >
      <div
        className={`${styles.bottomSheet} ${isOpen ? styles.open : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.sheetContent}>
          {durationOption.map((option) => (
            <div
              key={option.key}
              className={`${styles.sheetItem} ${
                selectedDuration === option.key ? styles.active : ''
              }`}
              onClick={() => {
                handleSelectDuration(option.key);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
