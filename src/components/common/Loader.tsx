import React from "react";
import "./Loader.css";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  text = "로딩 중...",
}) => {
  return (
    <div className="loader-container">
      <div className={`spinner ${size}`}></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
