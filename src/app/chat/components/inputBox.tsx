import Image from 'next/image';
import styles from '../chat.module.scss';
import { IconBlackAdd } from '../../../../public/icons';

interface InputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputBox = ({ value, onChange, onSend }: InputBoxProps) => {
  return (
    <div className={styles.inputBoxContainer}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onSend}
        className={styles.inputBox}
      />
      <Image
        src={IconBlackAdd}
        alt="이미지 더하기"
        className={styles.inputAddIcon}
      />
    </div>
  );
};
