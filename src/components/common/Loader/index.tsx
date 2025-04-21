import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  text = "로딩 중...",
}) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {text && <p className={styles.loaderText}>{text}</p>}
    </div>
  );
};

export default Loader;
