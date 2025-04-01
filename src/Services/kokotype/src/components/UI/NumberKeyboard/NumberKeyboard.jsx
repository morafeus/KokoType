import React, { useState } from "react";
import MyModal from "../ModalWindow/MyModal";
import styles from './NumberKeyboard.module.css';

const NumberKeyboard = ({ text, currentIndex }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const numberKeys = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        [' ', '0', ' '], // Добавляем пробелы для выравнивания
    ];

    const currentChar = text[currentIndex] || '';

    const getRowClass = (key) => {
        switch (key) {
            case '1':
            case '4':
            case '7':
                return styles.row5;
            case '2':
            case '5':
            case '8':
            case '0':
                return styles.row6;
            case '3':
            case '6':
            case '9':
                return styles.row7;
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
                {numberKeys.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {row.map((key) => (
                            <div
                                key={key}
                                className={`${styles.key} ${getRowClass(key)} ${key === currentChar ? styles.active : ''}`}
                            >
                                {key.trim() === '' ? '' : key} {/* Пропускаем вывод пробела */}
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
                </div>
            </MyModal>
        </div>
    );
};

export default NumberKeyboard;