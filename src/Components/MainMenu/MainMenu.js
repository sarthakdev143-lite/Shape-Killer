import React from 'react';
import './MainMenu.css';
import Help from '../Help/Help';

const MainMenu = ({ startGame }) => {
    return (
        <div className="main-menu">
            <h1 id='heading'>Welcome to Shape Killer!</h1>
            <button id='start' onClick={startGame}>Start Game</button>
            <Help />
        </div>
    );
};

export default MainMenu;
