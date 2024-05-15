import styles from "./category.module.css";

interface FilterProps {
    children: React.ReactNode;
}

export default function Category({ children }: FilterProps) {
    return (
        <button className={`${styles.small} ${styles.light}`}>
        {children}
        </button>
    );
}
