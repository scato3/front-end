import styles from "./filter.module.css";

interface FilterProps {
  size?: "small" | "medium" | "large";
  property?: "deep" | "light" | "disabled";
  onClick: () => void;
  children?: React.ReactNode;
}

export default function Filter({ size = "medium", property = "deep", onClick, children }: FilterProps) {
  return (
    <div>
      <button className={`${styles[size]} ${styles[property]}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
