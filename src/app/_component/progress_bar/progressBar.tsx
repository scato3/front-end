import styles from "./progressBar.module.css";

interface IProgressStyle {
  barBackgroundColor: string;
  barGaugeBackgroundColor: string;
  barWith: number;
  barHeight: number;
}

const ProgressBar = ({ progress, progressStyles }: { progress: number; progressStyles: IProgressStyle }) => {
  return (
    <div
      className={styles.progressBar}
      style={{
        backgroundColor: progressStyles.barBackgroundColor,
        width: progressStyles.barWith + "%",
        height: progressStyles.barHeight,
      }}
    >
      <div
        className={styles.progress}
        style={{ width: `${progress}%`, backgroundColor: progressStyles.barGaugeBackgroundColor }}
      ></div>
    </div>
  );
};
export default ProgressBar;
