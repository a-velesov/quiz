import React, { Component } from 'react';
import styles from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerStatus: null,
        quiz: [
            {
                question: 'Что вы ответите на вопрос "Кем вы видите себя через 5 лет?"',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    { text: '"Извините, я ослеп от блестящих перспектив"', id: 1 },
                    { text: 'Достанете хрустальный шар и попросите не беспокоить 10 минут', id: 2 },
                    { text: 'Начнете плакать', id: 3 },
                    { text: 'Руководителем', id: 4 },
                ],
            },
            {
                question: 'Какие ваши зарплатные ожидания?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    { text: 'На "Вау, это все мне?"', id: 1 },
                    { text: 'Достанете счетную машинку', id: 2 },
                    { text: 'Скажете, что готовы работать по 12 часов в день за идею', id: 3 },
                    { text: 'Укажете на то, что в резюме указана сумма', id: 4 },
                ],
            },
        ],
    };

    onAnswerClickHandler = (answerId) => {

        const question = this.state.quiz[this.state.activeQuestion];

        if(question.rightAnswerId === answerId) {

            this.setState({
                answerStatus: {[answerId]: 'success'}
            })

            const timeout = window.setTimeout( () => {
                if(this.isQuizFinished()) {
                    console.log( 'Finished' );
                } else {
                    this.setState( {
                        activeQuestion: this.state.activeQuestion + 1,
                        answerStatus: null
                    } );
                }
                window.clearTimeout( timeout );
            }, 1000 );

        } else {
            this.setState({
                answerStatus: {[answerId]: 'error'}
            })
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    render() {
        return (
            <div className={styles.Quiz}>
                <div className={styles.QuizWrapper}>
                    <h1>Ответьте на вопросы</h1>
                    <ActiveQuiz
                        question={this.state.quiz[this.state.activeQuestion].question}
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        answerId={this.onAnswerClickHandler}
                        answerNumber={this.state.activeQuestion + 1}
                        quizLength={this.state.quiz.length}
                        answerStatus={this.state.answerStatus}

                    />
                </div>
            </div>
        );
    }
}


export default Quiz;