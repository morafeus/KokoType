import React, { useEffect, useState } from 'react';
import styles from './LoadingAnimation.module.css'; // Импортируем модуль стилей

const LoadingAnimation = ({ children }) => {
    const text = children || "We are typing your test right now..."; // Используем переданный текст или запасной
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.'],
        [' '] // Добавляем пробел и знаки препинания
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeKey, setActiveKey] = useState(null); // Активная клавиша

    // Функция для получения символа клавиши для текста
    const getCurrentCharKey = (char) => {
        return char.toUpperCase(); // Приводим к верхнему регистру для сопоставления
    };

    // Обновляем активную клавишу
    const updateActiveKey = (index) => {
        const currentChar = getCurrentCharKey(text[index]); // Берем символ по текущему индексу
        setActiveKey(currentChar); // Устанавливаем активную клавишу
    };

    // Обновление индекса и активной клавиши с интервалом
    useEffect(() => {
        // Устанавливаем первую клавишу сразу при загрузке компонента
        updateActiveKey(currentIndex);

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                return nextIndex < text.length ? nextIndex : 0; // Если достигнут конец текста, возвращаемся в начало
            });
        }, 150);

        // Очистка интервала при размонтировании компонента
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
