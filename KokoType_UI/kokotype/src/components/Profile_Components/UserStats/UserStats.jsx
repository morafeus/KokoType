import React from 'react';
import styles from './UserStats.module.css'; // Импортируем модульные стили

const UserStats = ({ userExp, userLvl }) => {
    // Расчет недостающего опыта до следующего уровня
    const experienceToNextLevel = userLvl * 1000 + 1000 - userExp;

    return (
        <div className={styles.userStats}>
            <h3>Statistics</h3>
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
    );
};

export default UserStats;
