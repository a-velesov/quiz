import React from 'react';
import styles from './AnswerItem.module.css'

const AnswerItem = props => {
    const cls = [ styles.AnswerItem ];
    if(props.answerStatus) {
        cls.push(styles[props.answerStatus])
    }

    return (
        <li className={cls.join(' ')}
            onClick={() => props.answerId(props.answer.id)}
        >
            {props.answer.text}
        </li>

    )
}
export default AnswerItem;