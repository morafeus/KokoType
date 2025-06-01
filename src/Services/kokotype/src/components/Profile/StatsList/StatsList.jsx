import React from 'react';
import styles from './StatsList.module.css'; // Импортируем стили как модуль

const StatsList = ({ stats }) => {
    // Группируем данные по description
    const groupedStats = stats.reduce((acc, stat) => {
        if (!acc[stat.description]) {
            acc[stat.description] = [];
        }
        acc[stat.description].push(stat);
        return acc;
    }, {});

    // Определяем максимальный speed для каждой группы
    const maxSpeedStats = Object.values(groupedStats).flatMap(group => {
        const maxSpeed = Math.max(...group.map(stat => stat.speed));
        return group.map(stat => ({
            ...stat,
            isBest: stat.speed === maxSpeed,
        }));
    });

    return (
        <div className={styles.statsList}>
            <div className={styles.headerRow}>
                <div className={styles.headerItem}>Accuracy</div>
                <div className={styles.headerItem}>Speed</div>
                <div className={styles.headerItem}>Description</div>
                <div className={styles.headerItem}>Experience</div> 
                <div className={styles.headerItem}>Date</div> 
            </div>
            <div className={styles.statsContainer}>
                {maxSpeedStats.map((stat) => (
                    <div
                        key={stat.id}
                        className={`${styles.statBlock} ${stat.isBest ? styles.bestSpeed : ''}`}
                    >
                        <div className={styles.statItem}>{stat.accuracy}</div>
                        <div className={styles.statItem}>{stat.speed}</div>
                        <div className={styles.statItem}>{stat.description}</div>
                        <div className={styles.statItem}>{stat.expCount}</div>              
                        <div className={styles.statItem}>{new Date(stat.dateTime).toLocaleString()}</div> {/* Дата */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsList;