import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './User.css';
import Bullet from '../Bullet/Bullet';
import MainMenu from '../MainMenu/MainMenu'
import Help from '../Help/Help';

const User = () => {
    const [fullScreen, setfullScreen] = useState(false)
    const [position, setPosition] = useState({ top: 50, left: 50 });
    const [keysPressed, setKeysPressed] = useState({});
    const [speed, setSpeed] = useState(35); // Initial speed 
    const [lastBulletTime, setLastBulletTime] = useState(400); // State to track the last bullet fired time

    const animationRef = useRef();
    const lastTimestampRef = useRef(performance.now());
    const userRef = useRef();
    const bulletRef = useRef(null);
    const fullScreenRef = useRef();

    const spawnBullet = (clickEvent) => {
        const currentTime = performance.now();

        // Check if 0.2 seconds have passed since the last bullet was fired
        if (currentTime - lastBulletTime < 400) {
            console.log('Not enough time passed since last bullet fired');
            return;
        } else {
            setLastBulletTime(currentTime);

            const boardRect = clickEvent.currentTarget.getBoundingClientRect();
            const targetX = (clickEvent.clientX - boardRect.left) / boardRect.width * 100;
            const targetY = (clickEvent.clientY - boardRect.top) / boardRect.height * 100;

            // Call shootBullet function on Bullet component
            if (bulletRef.current) {
                bulletRef.current.shootBullet(position.left, position.top, targetX, targetY);
            }
        }
    };

    const handleKeyDown = (event) => {
        setKeysPressed(prevState => ({ ...prevState, [event.key]: true }));
    };

    const handleKeyUp = (event) => {
        setKeysPressed(prevState => ({ ...prevState, [event.key]: false }));
    };

    const startGame = () => {
        if (fullScreenRef.current) {
            fullScreenRef.current.requestFullscreen();
        }
    }

    const checkFullscreen = () => {
        if (document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement) {
            setfullScreen(true);
        } else {
            setfullScreen(false);
        }
    };

    useEffect(() => {
        // Check fullscreen status on mount
        checkFullscreen();

        // Add event listeners to check fullscreen status on change
        document.addEventListener('fullscreenchange', checkFullscreen);
        document.addEventListener('mozfullscreenchange', checkFullscreen);
        document.addEventListener('webkitfullscreenchange', checkFullscreen);
        document.addEventListener('msfullscreenchange', checkFullscreen);

        // Cleanup event listeners on unmount
        return () => {
            document.removeEventListener('fullscreenchange', checkFullscreen);
            document.removeEventListener('mozfullscreenchange', checkFullscreen);
            document.removeEventListener('webkitfullscreenchange', checkFullscreen);
            document.removeEventListener('msfullscreenchange', checkFullscreen);
        };
    }, []);


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const move = (timestamp) => {
            const dt = (timestamp - lastTimestampRef.current) / 1000; // dt in seconds
            lastTimestampRef.current = timestamp;

            animationRef.current = requestAnimationFrame(move);

            let { top, left } = position;
            const userSize = 3; // User size in rem
            const boardHeight = 119; // Board height in percentage
            const boardWidth = 119; // Board width in percentage

            // Calculate movement based on keys pressed
            if (keysPressed['w'] || keysPressed['ArrowUp']) {
                top -= speed * dt;
            }
            if (keysPressed['a'] || keysPressed['ArrowLeft']) {
                left -= speed * dt;
            }
            if (keysPressed['s'] || keysPressed['ArrowDown']) {
                top += speed * dt;
            }
            if (keysPressed['d'] || keysPressed['ArrowRight']) {
                left += speed * dt;
            }

            // Ensure the .user element stays within the .board boundaries
            if (top < 0) top = 0;
            if (top > boardHeight - (userSize / 16 * 100)) top = boardHeight - (userSize / 16 * 100); // userSize in percentage
            if (left < 0) left = 0;
            if (left > boardWidth - (userSize / 16 * 100)) left = boardWidth - (userSize / 16 * 100); // userSize in percentage

            setPosition({ top, left });
        };

        animationRef.current = requestAnimationFrame(move);

        return () => cancelAnimationFrame(animationRef.current);
    }, [keysPressed, position, speed]);

    useEffect(() => {
        if (userRef.current) {
            gsap.to(userRef.current, {
                top: `${position.top}%`,
                left: `${position.left}%`,
                duration: 1.5,
                ease: "back.out(4)",
            });
        }
    }, [position]);

    return (
        <>
            <div ref={fullScreenRef} className="area" onClick={spawnBullet}>
                <div
                    ref={userRef}
                    className="user"
                >
                </div>
                <Bullet ref={bulletRef} />
                {fullScreen &&
                    <>
                        <div id='move-with'>
                            <p>
                                <span>Shoot With :</span>
                                <span class="icon material-symbols-outlined">
                                    left_click
                                </span>
                            </p>
                            <p>
                                Move With :
                                <p className='highlight'>W, A, S, D</p>
                                or
                                <p className='highlight'>
                                    <span><i className="ri-arrow-up-line"></i>, <i className="ri-arrow-left-line"></i>, <i className="ri-arrow-down-line"></i>, <i className="ri-arrow-right-line"></i></span>
                                </p>
                            </p>
                        </div>
                        <Help />
                    </>}
            </div>
            <MainMenu startGame={startGame} />
        </>
    );
};

export default User;