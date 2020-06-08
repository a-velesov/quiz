import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css'
import Input from '../../components/UI/Input/Input';

class Auth extends Component {

    submitHandler = event => {
        event.preventDefault();
    };

    render() {
        return (
            <div className={styles.Auth}>
                <div>
                <h1>Авторизация</h1>

                <form
                    onSubmit={this.submitHandler}
                    className={styles.AuthForm}
                >
                    <Input label='Email' />
                    <Input
                        label='Пароль'
                        errorMessage={'ERROR'}
                    />


                    <Button
                        type='success'
                        onClick={this.loginHandler}
                    >
                        Войти
                    </Button>
                    <Button
                        type='primary'
                        onClick={this.registerHandler}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
                </div>
            </div>
        );
    }
}

export default Auth;