const { Container } = require("react-bootstrap");
import styles from "./custom_container.module.scss";

const CustomContainer = ({ children, ...props }) => {
  return <Container className={styles.CustomContainer}>{children}</Container>;
};

export default CustomContainer;
