import React from 'react';
import styles from './BestStats.module.css'; // Если есть модульные стили

const BestStats = ({ accuracy, speed, testCount }) => {
    return (
        <div className={styles.bestStats}>
            <h3>Best Stats</h3>
            <div className={styles.statItem}>
                <strong>Accuracy:</strong> <span>{accuracy}%</span>
            </div>
            <div className={styles.statItem}>
                <strong>Speed:</strong> <span>{speed} wpm</span>
            </div>
            <div className={styles.statItem}>
                <strong>Test Count:</strong> <span>{testCount}</span>
            </div>
        </div>
    );
};

export default BestStats;
