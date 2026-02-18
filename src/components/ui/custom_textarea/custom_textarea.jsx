import React from "react";
import styles from "./custom_textarea.module.scss";

const CustomTextArea = ({
  placeHolder,
  value,
  variant = 1,
  type = "text",
  required,
  onChange = () => {},
  error,
  label,
  rightElement,
  noPadding,
  ...props
}) => {
  return (
    <textarea
      onChange={(e) => {
        onChange(e, e.target.value);
      }}
      rows={4}
      className={styles.CustomTextArea}
      value={value}
      placeholder={placeHolder || label}
      type={type}
      required={required}
      {...props}
    />
  );
};

export default CustomTextArea;
