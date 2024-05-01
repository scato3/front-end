import styles from "./button.module.css";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  property?: "default" | "confirm" | "pressed" | "disabled";
  onClick: () => void;
  children?: React.ReactNode;
}

export default function Button({ size = "medium", property = "default", onClick, children }: ButtonProps) {
  return (
    <button className={`${styles[size]} ${styles[property]}`} onClick={onClick}>
      {children}
    </button>
  );
}
