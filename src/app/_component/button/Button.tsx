import styles from "./button.module.css";

interface ButtonProps {
  size?: "large" | "small" | "medium" | "large_main" | "very_small";
  property?: "default" | "disabled" | "cancel" | "black" | "disabledColor" | "pressed" | "confirm";
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({ size = "large", property = "default", onClick, children }: ButtonProps) {
  const isDisabled = property === "disabled";

  return (
    <button
      className={`${styles[size]} ${styles[property]} ${!isDisabled ? styles.pointer : ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
