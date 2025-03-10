import React from "react";
import styles from "./DescriptionModal.module.css"; // Импортируем стили для модального окна

const DescriptionModal = ({ text, onClose }) => {
    return (
        <div className={styles.descriptionContainer}>
            <p className={styles.descriptionText}>{text}</p>
            <button className={styles.closeButton} onClick={onClose}>
                To lesson
            </button>
        </div>
    );
};

export default DescriptionModal;