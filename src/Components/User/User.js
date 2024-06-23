import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './User.css';

const User = () => {
    const [position, setPosition] = useState({ top: 50, left: 50 });
    const [keysPressed, setKeysPressed] = useState({});
    const [speed, setSpeed] = useState(35); // Initial speed (adjust as needed)

    const animationRef = useRef();
    const lastTimestampRef = useRef(performance.now());
    const userRef = useRef();

    const handleKeyDown = (event) => {
        setKeysPressed(prevState => ({ ...prevState, [event.key]: true }));
    };

    const handleKeyUp = (event) => {
        setKeysPressed(prevState => ({ ...prevState, [event.key]: false }));
    };

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
            const boardHeight = 113; // Board height in percentage
            const boardWidth = 116; // Board width in percentage

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
            <div
                ref={userRef}
                className="user"
            ></div>
            <p id='move-with'>
                <span>Move With :</span>
                <p>
                    <span className='highlight'>W, A, S, D</span> or <span className='highlight'>
                        <i className="ri-arrow-up-line"></i>, <i className="ri-arrow-left-line"></i>, <i className="ri-arrow-down-line"></i>, <i className="ri-arrow-right-line"></i>
                    </span>
                </p>
            </p>
        </>
    );
};

export default User;
