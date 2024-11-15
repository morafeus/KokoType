import React, { useEffect, useState } from 'react';
import '../../../styles/component/NavBar.css';

const LogoButton = ({ children, disableAnimation, disableCursor }) => {
    const [animationClass, setAnimationClass] = useState('typing');

    useEffect(() => {
        if (!disableAnimation) return; // Если анимация отключена, выходим

        const typingDuration = 1500; // Длительность анимации печати
        const deletingDuration = 1500; // Длительность анимации удаления
        const waitDuration = 6000; // Время ожидания перед удалением

        const cycleAnimation = () => {
            setAnimationClass('typing');
            setTimeout(() => {
                setAnimationClass('deleting');
                setTimeout(cycleAnimation, deletingDuration); // Запускаем следующий цикл после удаления
            }, waitDuration);
        };

        const initialTimeout = setTimeout(cycleAnimation, 0); // Запускаем первый цикл

        return () => clearTimeout(initialTimeout);
    }, [disableAnimation]); // Добавляем зависимость

    return (
        <div className='typing-border'>
            <div className={`typing-container ${disableAnimation ? animationClass : ''} ${disableCursor ? '' : 'no-cursor' }`}>
                <div className="typing-text">{children}</div>
            </div>
        </div>
    );
}

export default LogoButton;