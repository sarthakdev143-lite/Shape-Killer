import React, { useState } from 'react';
import './Help.css';

const Help = () => {
    const [isHelpVisible, setHelpVisible] = useState(false);

    const toggleHelp = () => {
        setHelpVisible(!isHelpVisible);
    };

    return (
        <>
            <section id='help-div'>
                <i id='help-icon' className="ri-question-fill" onClick={toggleHelp}></i>
                <div id='help-menu' className={isHelpVisible ? 'visible' : 'hidden'}>
                    <i id='close' className="ri-close-circle-line" onClick={toggleHelp}></i>
                    <h1 id='heading'>Welcome to Shape Killer!</h1>
                    <div id='help-menu-content'>
                        <p>In this game, you are tasked with eliminating shapes that appear on the screen.</p>

                        <h3>Controls</h3>
                        <ul>
                            <li><strong>Move:</strong> Use the arrow keys (or W, A, S, D) to move your character around the screen.</li>
                            <li><strong>Shoot:</strong> Click on anywhere on screen to shoot and destroy shapes.</li>
                        </ul>

                        <h3>Objectives</h3>
                        <p>Your goal is to survive as long as possible while destroying as many shapes as you can. Each shape destroyed will earn you points.</p>

                        <h3>Power-Ups</h3>
                        <p>Collect power-ups to enhance your abilities. These power-ups will randomly appear on the screen and can provide various benefits such as increased speed, improved firepower, and temporary invincibility.</p>

                        <h3>Enemies</h3>
                        <p>Be prepared to face different types of enemies, each with unique behaviors and challenges.</p>

                        <h3>Tips & Tricks</h3>
                        <ul>
                            <li>Keep moving to avoid getting hit by shapes.</li>
                            <li>Try to collect power-ups whenever possible to gain an advantage.</li>
                            <li>Practice your aiming skills to efficiently destroy shapes and earn more points.</li>
                        </ul>

                        <div className='media-container'>
                            <img src='path-to-your-image.jpg' alt='Game Screenshot' />
                            <video controls>
                                <source src='path-to-your-video.mp4' type='video/mp4' />
                            </video>
                        </div>

                        <div className='end-statement'>
                            <p>Stay tuned for updates!</p>
                            <p>Good luck, and have fun playing Shape Killer!</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Help;
