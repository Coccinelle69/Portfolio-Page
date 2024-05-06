import React from "react";
import styles from "@/styles/buttons.module.css";

const Button = ({ children, onChange, langAbr }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => onChange(langAbr)}
    >
      <span className={styles.buttonText}>
        {children}
        <span className={styles.reflection}></span>
      </span>
    </button>
  );
};

export default Button;
