import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import Context from '../../../context';
import '../../../styles/component/NavBar.css';

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
      
            setDynamicState({
                disableAnimation: true,
                disableCursor: true,
                changeColor: true, // Восстанавливаем цвет
            });
            startAnimation(); // Запускаем анимацию снова
        
    }, [context.test.isTyping]);

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
    const textClass = dynamicState.changeColor ? 'text-default' : 'text-alternative';

    return (
        <div className='typing-border'>
            <div
                className={`typing-container ${dynamicState.disableAnimation ? animationClass : ''} ${dynamicState.disableCursor ? '' : 'no-cursor'} ${textClass}`}
            >
                <div className="typing-text">{children}</div>
            </div>
        </div>
    );
}

export default LogoButton;
