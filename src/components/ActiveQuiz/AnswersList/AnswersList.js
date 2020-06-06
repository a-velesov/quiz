import React from 'react';
import styles from './AnswersList.module.css'


const AnswersList = props => {
    return(
        <ul className={styles.AnswersList}>
            {props.answers}
        </ul>

    )
}
export default AnswersList;