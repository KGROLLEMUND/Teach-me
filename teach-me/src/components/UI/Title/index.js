import React from 'react';
import styles from "index.module.scss";

const Title = ({title, Level}) => {
    return (
        <div className={styles.wrapper}>
            <Level {title}/>
        </div>
    );
}

export default Title;
