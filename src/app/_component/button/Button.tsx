import styles from "./button.module.css";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  text: string;
  property?: "default" | "confirm" | "pressed" | "disabled";
  onClick: () => void;
}

export default function Button({ size = "medium", text, property = "default", onClick }: ButtonProps) {
  return (
    <div>
      <button className={`${styles[size]} ${styles[property]}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
