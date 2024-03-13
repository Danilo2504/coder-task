import rootStyles from "./styles.module.css";

const ScreenContainer = ({ children, style }) => {
  return (
    <div className={rootStyles.container} style={style}>
      {children}
    </div>
  );
};

export default ScreenContainer;
