import React from "react";
import styles from "./cuatom_input.module.scss";

const CustomInput = ({
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
    <input
      onChange={(e) => {
        onChange(e, e.target.value);
      }}
      value={value}
      placeholder={placeHolder || label}
      type={type}
      required={required}
      {...props}
      className={styles.CustomInput}
    />
  );
};

export default CustomInput;
