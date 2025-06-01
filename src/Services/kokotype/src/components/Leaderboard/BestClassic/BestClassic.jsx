import React, { useEffect, useState, useContext } from 'react';
import { fetchClassicData } from './fetchClassicData'; // Импортируем новую функцию
import Context from '../../../context'; // Импортируем контекст
import styles from './BestClassic.module.css'; // Импортируем модульные стили

const BestClassic = ({ navigate }) => {
    const context = useContext(Context); // Получаем контекст
    const currentUserId = context.user.user.Id; // Получаем ID текущего пользователя
    const [classicScores, setClassicScores] = useState([]); // Состояние для хранения классических результатов
    const [userBestScore, setUserBestScore] = useState(null); // Для хранения лучшего результата текущего пользователя

    useEffect(() => {
        const fetchData = async () => {
            const { finalScores, currentUserScore } = await fetchClassicData(navigate, currentUserId);

            setClassicScores(finalScores);
            setUserBestScore(currentUserScore || null);
        };

        fetchData();
    }, [navigate, currentUserId]);

    return (
        <div className={styles.bestClassicContainer}>
            <div className={styles.bestClassicHeader}>
                <div className={styles.bestClassicColumn}>Rank</div>
                <div className={styles.bestClassicColumn}>Accuracy</div>
                <div className={styles.bestClassicColumn}>Speed</div>
                <div className={styles.bestClassicColumn}>Exp Count</div>
                <div className={styles.bestClassicColumn}>User</div>
            </div>
        
            <ul className={styles.bestClassicList}>
                {classicScores.map((score) => (
                    <li 
                        key={score.userId} 
                        className={`${styles.bestClassicItem} ${
                            score.rank === 1 ? styles.gold : 
                            score.rank === 2 ? styles.silver : 
                            score.rank === 3 ? styles.bronze : ''
                        }`}>
                        <div className={styles.bestClassicRow}>
                            <div className={styles.bestClassicCell}>{score.rank}</div>
                            <div className={styles.bestClassicCell}>{score.accuracy.toFixed(2)}%</div>
                            <div className={styles.bestClassicCell}>{score.speed.toFixed(2)}</div>
                            <div className={`${styles.bestClassicCell} ${styles.levelCell}`}>{score.expCount}</div>
                            <div className={styles.bestClassicCell}>{score.userName}</div>
                        </div>
                    </li>
                ))}
            </ul>
    
            {/* Дублируем лучший результат текущего пользователя */}
            {userBestScore && (
                <div className={`${styles.bestClassicRow} ${styles.currentUserRow}`}>
                    <div className={styles.bestClassicCell}>{userBestScore.rank}</div>
                    <div className={styles.bestClassicCell}>{userBestScore.accuracy.toFixed(2)}%</div>
                    <div className={styles.bestClassicCell}>{userBestScore.speed.toFixed(2)}</div>
                    <div className={`${styles.bestClassicCell} ${styles.levelCell}`}>{userBestScore.expCount}</div>
                    <div className={styles.bestClassicCell}>{userBestScore.userName}</div>
                </div>
            )}
        </div>
    );

}

export default BestClassic