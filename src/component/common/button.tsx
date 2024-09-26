import { classnames as cX } from '@/utils/classnames';
import styles from './button.module.scss';
import { PropsWithChildren } from 'react';

export interface IButtonProps extends PropsWithChildren {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
}

export default function Button({
  children,
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
        disabled && styles.disabled
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
