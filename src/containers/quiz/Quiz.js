import React, { Component } from 'react';
import styles from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
    state = {
        results: {}, // {[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerStatus: null, // {[id]: 'success' 'error'}
        quiz: [
            {
                question: 'Что вы ответите на вопрос "Кем вы видите себя через 5 лет?"',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    { text: '"Извините, я ослеп от блестящих перспектив"', id: 1 },
                    { text: 'Достанете хрустальный шар и попросите не беспокоить 10 минут', id: 2 },
                    { text: '"Вашим директором"', id: 3 },
                    { text: 'Начнете плакать', id: 4 },
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

        if(this.state.answerStatus) {
            console.log(Object.keys(this.state.answerStatus)[0])

            const key = Object.keys(this.state.answerStatus)[0]
            if (this.state.answerStatus[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if(question.rightAnswerId === answerId) {

            if(!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerStatus: { [answerId]: 'success' },
                results
            })

            const timeout = window.setTimeout( () => {
                if(this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState( {
                        activeQuestion: this.state.activeQuestion + 1,
                        answerStatus: null
                    } );
                }
                window.clearTimeout( timeout );
            }, 1000 );

        } else {
            results[question.id] = 'error'
            this.setState({
                answerStatus: { [answerId]: 'error' },
                results
            })
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerStatus: null,
        })
    }

    render() {
        return (
            <div className={styles.Quiz}>
                <div className={styles.QuizWrapper}>
                    <h1>Ответьте на вопросы</h1>

                    { this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}

                        />
                    :<ActiveQuiz
                        question={this.state.quiz[this.state.activeQuestion].question}
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        answerId={this.onAnswerClickHandler}
                        answerNumber={this.state.activeQuestion + 1}
                        quizLength={this.state.quiz.length}
                        answerStatus={this.state.answerStatus}
                    />
                    }
                </div>
            </div>
        );
    }
}


export default Quiz;