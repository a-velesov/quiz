import React from 'react';
import Quiz from '../../containers/quiz/Quiz.module.css'
import styles from './ActiveQuiz.module.css';

const ActiveQuiz = props => {
    return (
        <div className={styles.ActiveQuiz}>
            <p className={styles.Question}>
                <span>
                    <strong>2.</strong>&nbsp;
                    Как дела
                </span>
                <small>2 из 12</small>
            </p>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>

        </div>

    );

}

export default ActiveQuiz;