import styles from "./index.module.scss";

const Input = (props) => {
  return (
    <div className={styles.input}>
      {props.label && <label>{props.label}</label>}
      {props.type == "textarea" ? <textarea {...props} /> : <input {...props} />}
    </div>
  );
};

export default Input;
