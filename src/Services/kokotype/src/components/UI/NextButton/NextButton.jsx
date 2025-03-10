// NextButton.js
import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { ReactComponent as NextIcon } from '../../../assets/icons/NextIcon.svg'; // Импортируем иконку
import styles from './NextButton.module.css'; // Импортируем CSS-модуль

const NextButton = observer((props) => {
    const buttonRef = useRef(null);

    const handleClick = () => {
        if (buttonRef.current) {
            buttonRef.current.blur(); // Убираем фокус с кнопки
        }
        props.onClick();
    };

    return (
        <button
            style={props.style}
            ref={buttonRef}
            onClick={handleClick}
            className={styles.iconButton} // Используем стили из модуля
        >
            <NextIcon />
            {props.children && <span className={styles.buttonText}>{props.children}</span>} {/* Отображаем текст */}
        </button>
    );
});

export default NextButton;