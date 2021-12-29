import styles from "./InfoBox.module.css";

function InfoBox(props) {
  return (
    <div
      className={`${styles.container} ${
        props.justifyTop === true && styles.justifyTop
      }`}
      style={{ gridArea: props.area }}
    >
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
}

export default InfoBox;
