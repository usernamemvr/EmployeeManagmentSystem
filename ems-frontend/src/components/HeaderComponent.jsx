import React from 'react';

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-light bg-dark'>
                    <a
                        className='navbar-light'
                        href="https://onepiece.fandom.com/"
                        style={{textDecoration: 'none', color: 'white'}}
                        target="_blank"
                        rel="noopener noreferrer">
                        Employee Management System
                    </a>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;