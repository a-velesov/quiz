import React, { Component } from 'react';
import styles from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {
    state = {
        results: {}, // {[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerStatus: null, // {[id]: 'success' 'error'}
        quiz: [],
        loading: true,
    };

    onAnswerClickHandler = answerId => {

        if(this.state.answerStatus) {

            const key = Object.keys( this.state.answerStatus )[0];
            if(this.state.answerStatus[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if(question.rightAnswerId === answerId) {

            if(!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState( {
                answerStatus: { [answerId]: 'success' },
                results,
            } );

            const timeout = window.setTimeout( () => {
                if(this.isQuizFinished()) {
                    this.setState( {
                        isFinished: true,
                    } );
                } else {
                    this.setState( {
                        activeQuestion: this.state.activeQuestion + 1,
                        answerStatus: null,
                    } );
                }
                window.clearTimeout( timeout );
            }, 1000 );

        } else {
            results[question.id] = 'error';
            this.setState( {
                answerStatus: { [answerId]: 'error' },
                results,
            } );
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState( {
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerStatus: null,
        } );
    };

    async componentDidMount() {

        try {
            const response = await axios.get( `quiz/${this.props.match.params.id}.json` );
            const quiz = response.data;

            this.setState({
                quiz,
                loading: false
            })
        } catch(e) {
            console.log( e );
        }

        console.log( 'Quiz ID = ', this.props.match.params.id );
    }

    render() {
        return (
            <div className={styles.Quiz}>
                <div className={styles.QuizWrapper}>
                    <h1>Ответьте на вопросы</h1>

                    {
                        this.state.loading
                        ? <Loader />
                        : this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}

                            />
                            : <ActiveQuiz
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