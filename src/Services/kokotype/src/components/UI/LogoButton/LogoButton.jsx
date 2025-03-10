import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import Context from '../../../context';
import styles from './LogoButton.module.css'; // Импортируем стили

const LogoButton = ({ children }) => {
    const [animationClass, setAnimationClass] = useState('typing');
    const [dynamicState, setDynamicState] = useState({
        disableAnimation: true,
        disableCursor: true,
        changeColor: true,
    });

    const context = useContext(Context);
    let timeoutId; // Переменная для хранения идентификаторов тайм-аутов

    // Используем useLayoutEffect для мгновенного применения изменений
    useLayoutEffect(() => {
        startAnimation(); // Запускаем анимацию снова
    }, []);

    const startAnimation = () => {
        const deletingDuration = 1500; // Длительность анимации удаления
        const waitDuration = 6000; // Время ожидания перед удалением

        const cycleAnimation = () => {
            setAnimationClass('typing');
            timeoutId = setTimeout(() => {
                setAnimationClass('deleting');
                timeoutId = setTimeout(cycleAnimation, deletingDuration); // Запускаем следующий цикл
            }, waitDuration);
        };

        cycleAnimation(); // Запускаем первый цикл
    };

    useEffect(() => {
        return () => clearTimeout(timeoutId); // Очищаем таймеры при размонтировании
    }, []);

    // Условное присваивание классов
    const textClass = dynamicState.changeColor ? styles.textDefault : styles.textAlternative;

    return (
        <div className={styles.typingBorder}>
            <div
                className={`${styles.typingContainer} ${dynamicState.disableAnimation ? styles[animationClass] : ''} ${dynamicState.disableCursor ? '' : styles.noCursor} ${textClass}`}
            >
                <div className={styles.dullText}>{children}</div>
                <div className={styles.typingText}>{children}</div>
            </div>
        </div>
    );
}

export default LogoButton;