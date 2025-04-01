import React, { useEffect, useState, useContext } from 'react';
import { fetchClassic } from '../../../http/testAPI'; // Импортируем метод для получения данных классических результатов
import { fetchUsers } from '../../../http/authAPI'; // Импортируем метод для получения пользователей
import Context from '../../../context'; // Импортируем контекст
import styles from './BestClassic.module.css'; // Импортируем модульные стили

const BestClassic = ({ navigate }) => {
    const context = useContext(Context); // Получаем контекст
    const currentUserId = context.user.user.Id; // Получаем ID текущего пользователя
    const [classicScores, setClassicScores] = useState([]); // Состояние для хранения классических результатов
    const [users, setUsers] = useState({}); // Объект для хранения информации о пользователях
    const [userBestScore, setUserBestScore] = useState(null); // Для хранения лучшего результата текущего пользователя

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем классические результаты
                const allClassicScores = await fetchClassic(navigate);
                // Получаем всех пользователей
                const userList = await fetchUsers(navigate);
                const userMap = userList.reduce((acc, user) => {
                    acc[user.id] = user.userName; // Создаем объект с userId как ключом и userName как значением
                    return acc;
                }, {});
                setUsers(userMap);

                // Добавляем поля username в результаты
                const classicScoresWithUsernames = allClassicScores.map(score => ({
                    ...score,
                    userName: userMap[score.userId] || '-' // Получаем имя пользователя
                }));

                // Сортируем по expCount и присваиваем ранги
                classicScoresWithUsernames.sort((a, b) => b.expCount - a.expCount);
                const finalScores = classicScoresWithUsernames.map((score, index) => ({
                    rank: index + 1, // Присваиваем ранг на основе позиции в отсортированном массиве
                    ...score // Добавляем остальные данные
                }));

                setClassicScores(finalScores);

                // Находим лучший результат текущего пользователя
                const currentUserScore = finalScores.find(score => score.userId === currentUserId);
                setUserBestScore(currentUserScore || null);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
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
                    <li key={score.userId} className={styles.bestClassicItem}>
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
export default BestClassic;