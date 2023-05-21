import styles from "./index.module.scss";

const Select = (props) => {
  const listOptions = props.options?.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  return (
    <div className={styles.select}>
      {props.label && <label>{props.label}</label>}
      <select {...props}>
        <option value="Default" disabled hidden>
          Select your option
        </option>
        {listOptions}
      </select>
    </div>
  );
};

export default Select;
