import React from "react";
import styles from "./button.module.css";
export const CustomButton = ({ text, form, handleCLick, submitButton }) => {
  const Clickhandler = () => {
    handleCLick && handleCLick(true);
  };
  return (
    <div
      onClick={Clickhandler}
      className={`${styles.button} ${form && styles.formButton} ${
        submitButton && styles.submitButton
      }`}
    >
      {text}
    </div>
  );
};
