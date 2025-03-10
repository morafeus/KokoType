import React from 'react';
import NextButton from '../NextButton/NextButton';
import ResetButton from '../ResetButton/ResetButton';
import styles from './ControlPanel.module.css'; 

const ControlPanel = ({ onRestart, onNext }) => {
    return (
        <div className={styles.controlPanel}>
            <ResetButton onClick={onRestart} className={styles.resetButton} tabIndex={0}>Restart</ResetButton>
            <NextButton onClick={onNext} tabIndex={1}>Next</NextButton>
        </div>
    );
};

export default ControlPanel;