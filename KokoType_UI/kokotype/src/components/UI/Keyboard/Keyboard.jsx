import React, { useState, useEffect } from "react";
import MyModal from "../ModalWindow/MyModal";
import styles from './Keyboard.module.css';

const Keyboard = ({ text, currentIndex }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '['],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''],
        ['L.Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'], // Перемещаем L.Shift в 3-й ряд
        [' '] // Пробел
    ];

    const currentChar = text[currentIndex] ? text[currentIndex] : '';

    // Функция для проверки, нужно ли использовать Shift для заглавной буквы
    const isShiftActive = (key) => {
        if(currentChar != ' ' && currentChar != '[' && currentChar != '.' && currentChar != ',' && currentChar != '/')
        return currentChar && currentChar === currentChar.toUpperCase();
    }

    // Функция для получения нужного класса для каждого ряда клавиш
    const getRowClass = (key) => {
        switch (key) {
            case 'Q':
            case 'A':
            case 'Z':
                return styles.row1; // Желтый
            case 'W':
            case 'S':
            case 'X':
                return styles.row2; // Красный
            case 'E':
            case 'D':
            case 'C':
                return styles.row3; // Оранжевый
            case 'R':
            case 'F':
            case 'V':
            case 'T':
            case 'G':
            case 'B':
                return styles.row4; // Зеленый
            case 'Y':
            case 'H':
            case 'N':
            case 'U':
            case 'J':
            case 'M':
                return styles.row5; // Синий
            case 'I':
            case 'K':
            case ',':
                return styles.row6; // Фиолетовый
            case 'O':
            case 'L':
            case '.':
                return styles.row7; // Розовый
            case 'P':
            case ';':
            case '/':
            case ']':
            case '[':
            case '\'':
                return styles.row8; // Коричневый
            case ' ':
                return styles.row9; // Белый для пробела
            case 'L.Shift':
                return styles.row1; // Логика для L.Shift, использует стиль row1 (желтый)
            default:
                return ''; // Для других символов
        }
    };

    // Открытие модального окна
    const openModal = () => {
        setIsModalVisible(true);
    };

    // Закрытие модального окна
    const closeModal = () => {
        setIsModalVisible(false);
    };

    // Показать модальное окно при рендере
    useEffect(() => {
        setIsModalVisible(true); // Открыть модальное окно при загрузке
    }, []);

    return (
        <div onClick={openModal}>
            <div className={styles.keyboard}>
                {keys.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={`${styles.row} ${rowIndex === 3 ? styles.spaceRow : ''}`}
                    >
                        {row.map((key) => (
                            <div
                                key={key}
                                className={`${styles.key} ${getRowClass(key)} ${key.toUpperCase() === currentChar.toUpperCase() ? styles.active : ''} ${key === ' ' ? styles.spaceKey : ''} 
                                ${key === 'L.Shift' ? styles.shiftKey : ''} ${key === 'L.Shift' && isShiftActive(key) ? styles.active : ''}`}
                            >
                                {key}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Модальное окно, которое будет показываться сразу и по клику на кнопку */}
            <MyModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
                onAccept={closeModal} // Закрыть модальное окно
            >
                <div className={styles.fingerGuide}>
                    <h2>Hint: Finger Color Guide</h2>
                    <h3 className={styles.modalTitle}>Main rule. DON'T look at your keyboard. Only on the screen</h3>
                    <div className={styles.fingerColor}>
                        <div className={styles.colorBox} style={{ backgroundColor: "#ffeb3b" }}></div>
                        <span>Pinky (Q, A, Z, L.Shift)</span>
                    </div>
                    <div className={styles.fingerColor}>
                        <div className={styles.colorBox} style={{ backgroundColor: "#f44336" }}></div>
                        <span>Ring Finger (W, S, X)</span>
                    </div>
                    <div className={styles.fingerColor}>
                        <div className={styles.colorBox} style={{ backgroundColor: "#ff9800" }}></div>
                        <span>Middle Finger (E, D, C)</span>
                    </div>
                    <div className={styles.fingerColor}>
                        <div className={styles.colorBox} style={{ backgroundColor: "#4caf50" }}></div>
                        <span>Index Finger (R, F, V, T, G, B)</span>
                    </div>
                    <div className={styles.fingerColor}>
                        <div className={styles.colorBox} style={{ backgroundColor: "#2196f3" }}></div>
                        <span>Right Index Finger (Y, H, N, U, J, M)</span>
                    </div>
                    <div className={styles.fingerColor}>
                        <div className={styles.colorBox} style={{ backgroundColor: "#9c27b0" }}></div>
                        <span>Thumb (I, K, ,)</span>
                    </div>
                    <div className={styles.fingerColor}>
                        <div className={styles.colorBox} style={{ backgroundColor: "#e91e63" }}></div>
                        <span>Right Pinky (O, L, .)</span>
                    </div>
                </div>
            </MyModal>
        </div>
    );
};

export default Keyboard;
