import React, { useState, useEffect, useRef } from 'react';
import './User.css';

const User = () => {
    const [position, setPosition] = useState({ top: 50, left: 50 });
    const [keysPressed, setKeysPressed] = useState({});
    const [speed, setSpeed] = useState(35); // Initial speed (adjust as needed)

    const animationRef = useRef();
    const lastTimestampRef = useRef(performance.now());

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

            // Calculate movement based on keys pressed
            if (keysPressed['w']) {
                top -= speed * dt;
            }
            if (keysPressed['a']) {
                left -= speed * dt;
            }
            if (keysPressed['s']) {
                top += speed * dt;
            }
            if (keysPressed['d']) {
                left += speed * dt;
            }

            setPosition({ top, left });
        };

        animationRef.current = requestAnimationFrame(move);

        return () => cancelAnimationFrame(animationRef.current);
    }, [keysPressed, position, speed]);

    return (
        <div className="board">
            <div
                className="user"
                style={{
                    top: `${position.top}%`,
                    left: `${position.left}%`,
                }}
            ></div>
            <p>Control With W, A, S, D...</p>
        </div>
    );
};

export default User;
