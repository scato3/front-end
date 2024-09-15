import { classnames as cX } from '@/utils/classnames';
import styles from './button.module.scss';
import { PropsWithChildren } from 'react';

interface IButtonProps extends PropsWithChildren {
  size?: 'small' | 'medium' | 'large';
  confirm?: boolean;
  disabled?: boolean;
  cancel?: boolean;
  onClick: () => void;
}

export default function Button({
  cancel = false,
  children,
  confirm = false,
  disabled = false,
  onClick,
  size = 'large',
}: IButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cX(
        styles.Button_primary,
        styles[size],
        confirm && styles.confirm,
        disabled && styles.disabled,
        cancel && styles.cancel
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
