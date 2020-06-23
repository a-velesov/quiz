import React, { Component } from 'react';
import styles from './Nav.module.css';
import Background from '../../UI/Background/Background';
import { NavLink } from 'react-router-dom';


class Nav extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks(links) {
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
        const links = [
            { to: '/', label: 'Список', exact: true }
        ];

        if(this.props.isAuthenticated){
            links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false })
            links.push({ to: '/logout', label: 'Выйти', exact: false })
        } else {
            links.push({ to: '/auth', label: 'Авторизация', exact: false })
        }

        return (
            <React.Fragment>
                <nav className={cls.join( ' ' )}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Background onClick={this.props.onClose} /> : null}
            </React.Fragment>
        );
    }
}

export default Nav;