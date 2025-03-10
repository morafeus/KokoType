import React, { useEffect, useState } from 'react';
import styles from './LoadingAnimation.module.css';

const LoadingAnimation = ({ children }) => {
    const text = children; 
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.'],
        [' ']
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeKey, setActiveKey] = useState(null);

    const getCurrentCharKey = (char) => {
        return char.toUpperCase();
    };

    const updateActiveKey = (index) => {
        const currentChar = getCurrentCharKey(text[index]);
        setActiveKey(currentChar);
    };

    useEffect(() => {
        updateActiveKey(currentIndex);

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                return nextIndex < text.length ? nextIndex : 0;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [currentIndex, text.length]);

    return (
        <div className={styles.loadingContainer}>
            <div className={styles.typingAnimation}>
                <div className={styles.keyboard}>
                    {keys.map((row, rowIndex) => (
                        <div className={styles.row} key={rowIndex}>
                            {row.map((key) => (
                                <div
                                    className={`${styles.key} ${activeKey === key ? styles.active : ''} ${key === ' ' ? styles.spaceKey : ''}`}
                                    key={key}
                                >
                                    {key}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <p className={styles.text}>
                {text.split('').map((char, index) => (
                    <span 
                        key={index} 
                        className={index === currentIndex ? styles.highlight : ''}
                    >
                        {char}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default LoadingAnimation;
