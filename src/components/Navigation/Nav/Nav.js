import React, { Component } from 'react';
import styles from './Nav.module.css';
import Background from '../../UI/Background/Background';
import { NavLink } from 'react-router-dom';

const links = [
    { to: '/', label: 'Список', exact: true },
    { to: '/auth', label: 'Авторизация', exact: false },
    { to: '/quiz-creator', label: 'Создать тест', exact: false },
];

class Nav extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks() {
        return links.map( (link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={styles.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            );

        } );
    }

    render() {
        const cls = [ styles.Nav ];
        if(!this.props.isOpen) {
            cls.push( styles.close );
        }
        return (
            <React.Fragment>
                <nav className={cls.join( ' ' )}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Background onClick={this.props.onClose} /> : null}
            </React.Fragment>
        );
    }
}

export default Nav;