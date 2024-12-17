// ControlPanel.js
import React from 'react';
import NextButton from '../NextButton/NextButton';
import ResetButton from '../ResetButton/ResetButton';
import styles from './ControlPanel.module.css'; // Импортируем стили

const ControlPanel = ({ onRestart, onNext }) => {
    return (
        <div className={styles.controlPanel}>
            <ResetButton onClick={onRestart} className={styles.resetButton} >Restart</ResetButton>
            <NextButton onClick={onNext}>Next</NextButton>
        </div>
    );
};

export default ControlPanel;