import { useState } from "react";
import styles from "./toggle.module.css";

export default function Toggle() {
  const [toggled, setToggled] = useState(false);

  const containerStyle = {
    backgroundColor: toggled ? "var(--main-100)" : "var(--gray-100)",
  };

  const toggleCircleStyle = {
    backgroundColor: toggled ? "var(--main-200)" : "var(--gray-400)",
    transform: toggled ? "translateX(24px)" : "translateX(0)",
  };

  const handleToggle = () => {
    setToggled((prevState) => !prevState);
  };

  return (
    <div className={styles.Container} style={containerStyle} onClick={handleToggle}>
      <div className={`${styles.toggleCircle} ${toggled ? styles.animate : ""}`} style={toggleCircleStyle}></div>
    </div>
  );
}
