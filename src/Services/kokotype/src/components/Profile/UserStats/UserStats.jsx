import React from 'react';
import styles from './UserStats.module.css'; // Импортируем модульные стили

const UserStats = ({ userExp, userLvl, testCount, testStart }) => {
    // Расчет недостающего опыта до следующего уровня
    const experienceToNextLevel = userLvl * 1000 + 1000 - userExp;

    return (
        <div className={styles.userStats}>
            <h3>Statistics</h3>
            <div className={styles.statContainer}>
                <div className={styles.leftColumn}>
                    <div className={styles.statItem}>
                        <strong>Experience:</strong> <span>{userExp}</span>
                    </div>
                    <div className={styles.statItem}>
                        <strong>User Level:</strong> <span>{userLvl}</span>
                    </div>
                    <div className={styles.statItem}>
                        <strong>Experience to Next Level:</strong> <span>{experienceToNextLevel}</span>
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <div className={styles.statItem}>
                        <strong className={styles.highlight}>Test Count:</strong> <span className={styles.highlight}>{testCount}</span>
                    </div>
                    <div className={styles.statItem}>
                        <strong>Test Started:</strong> <span >{testStart}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStats;