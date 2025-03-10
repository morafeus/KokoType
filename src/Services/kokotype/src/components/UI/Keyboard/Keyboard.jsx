import React, { useState, useEffect } from "react";
import MyModal from "../ModalWindow/MyModal";
import styles from './Keyboard.module.css';

const Keyboard = ({ text, currentIndex, language }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const englishKeys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '['],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''],
        ['L.Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'],
        [' ']
    ];

    const russianKeys = [
        ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', ']', ''],
        ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
        ['L.Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.'],
        [' ']
    ];

    const keys = language === 'Russian' ? russianKeys : englishKeys; // Выбор раскладки на основе языка

    const currentChar = text[currentIndex] ? text[currentIndex] : '';

    const isShiftActive = (key) => {
        if (currentChar !== ' ' && currentChar !== '[' && currentChar !== '.' && currentChar !== ',' && currentChar !== '/')
            return currentChar && currentChar === currentChar.toUpperCase();
    }

    const getRowClass = (key) => {
        switch (key) {
            case 'Q':
            case 'A':
            case 'Z':
            case 'Й':
            case 'Ф':
            case 'Я':
                return styles.row1;
            case 'W':
            case 'S':
            case 'X':
            case 'Ц':
            case 'Ы':
            case 'Ч':
                return styles.row2;
            case 'E':
            case 'D':
            case 'C':
            case 'У':
            case 'В':
            case 'С':
                return styles.row3;
            case 'R':
            case 'F':
            case 'V':
            case 'T':
            case 'G':
            case 'B':
            case 'К':
            case 'А':
            case 'М':
            case 'Е':
            case 'П':
            case 'И':
                return styles.row4;
            case 'Y':
            case 'H':
            case 'N':
            case 'U':
            case 'J':
            case 'M':
            case 'Г':
            case 'О':
            case 'Ь':
            case 'Н':
            case 'Р':
            case 'Т':
                return styles.row5; // Добавлен
            case 'I':
            case 'K':
            case ',':
            case 'Ш':
            case 'Л':
            case 'Б':
                return styles.row6; // Добавлен
            case 'O':
            case 'L':
            case 'Щ':
            case 'Д':
            case 'Ю':
                return styles.row7;
            case 'P':
            case ';':
            case '/':
            case ']':
            case '[':
            case '\'':
            case 'Ж':
            case 'Э':
                return styles.row8;
            case ' ':
                return styles.row9;
            case 'L.Shift':
                return styles.row1;
            case'.':
                return language === 'Russian' ? styles.row8 : styles.row7;
            default:
                return '';
        }
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    

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

            <MyModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
                onAccept={closeModal}
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