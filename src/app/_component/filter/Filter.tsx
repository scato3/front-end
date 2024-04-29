import styles from "./filter.module.css";

interface FilterProps {
  size?: "small" | "medium" | "large";
  text: string;
  property?: "deep" | "light" | "disabled";
  onClick: () => void;
}

export default function Filter({ size = "medium", text, property = "deep", onClick }: FilterProps) {
  return (
    <div>
      <button className={`${styles[size]} ${styles[property]}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
