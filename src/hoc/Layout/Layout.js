import React, { Component } from 'react';
import styles from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Nav from '../../components/Navigation/Nav/Nav';


class Layout extends Component {

    state = {
        menu: false,
    };

    toggleMenuHandler = () => {
        this.setState( {
            menu: !this.state.menu,
        } );
    };

    menuCloseHandler = () => {
        this.setState( {
            menu: false,
        } );
    };

    render() {
        return (
            <div className={styles.Layout}>

                <Nav isOpen={this.state.menu}
                     onClose={this.menuCloseHandler}

                />

                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />

                <main>
                    {this.props.children}
                </main>

            </div>
        );
    }
}

export default Layout;