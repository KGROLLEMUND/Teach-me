import styles from "./index.module.scss";

const Input = ({label, name, type, onChange, value, isRequired, placeholder}) => {
    return (
        <div className={styles.wrapper}>
            {
                label && (
                    <label>{label}</label>
                )
            }

            <input 
            name={name}
            type={type}
            onChange={onChange}
            value={value}
            required={isRequired}
            placeholder={placeholder}
            />
        </div>
    );
}

export default Input;
