// ResetButton.js
import { observer } from "mobx-react-lite";
import React, { useState, useRef } from "react";
import { ReactComponent as ResetIcon } from '../../../assets/icons/ResetIcon.svg';
import styles from './ResetButton.module.css'; // Импортируем CSS-модуль

const ResetButton = observer((props) => {
    const [isRotating, setIsRotating] = useState(false);
    const buttonRef = useRef(null);

    const handleClick = () => {
        if (buttonRef.current) {
            buttonRef.current.blur(); // Убираем фокус с кнопки
        }
        props.onClick();
        setIsRotating(true);
        setTimeout(() => {
            setIsRotating(false);
        }, 1000);
    };

    return (
        <button
            style={props.style}
            ref={buttonRef}
            onClick={handleClick}
            className={`${styles.iconButton} ${isRotating ? styles.rotate : ''}`} // Используем стили из модуля
        >
            <ResetIcon />
            {props.children && <span className={styles.buttonText}>{props.children}</span>} {/* Отображаем текст */}
        </button>
    );
});

export default ResetButton;