import React, { useEffect, useState, useContext } from 'react';
import { fetchAll } from '../../../http/testAPI'; // Импортируем метод для получения всех тестов
import { fetchUsers } from '../../../http/authAPI'; // Импортируем метод для получения пользователей
import Context from '../../../context'; // Импортируем контекст
import styles from './BestScore.module.css'; // Импортируем модульные стили

const BestScore = ({ navigate }) => {
    const context = useContext(Context); // Получаем контекст
    const [scores, setScores] = useState([]);
    const [users, setUsers] = useState({}); // Объект для хранения информации о пользователях
    const [userBestScore, setUserBestScore] = useState(null); // Для хранения лучшего результата текущего пользователя

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем все тесты
                const allScores = await fetchAll(navigate);
                // Получаем всех пользователей
                const userList = await fetchUsers(navigate);
                const userMap = userList.reduce((acc, user) => {
                    acc[user.id] = user.userName; // Создаем объект с userId как ключом и userName как значением
                    return acc;
                }, {});
                setUsers(userMap);

                // Сортируем и присваиваем ранги
                const rankedScores = allScores.map((score) => ({
                    ...score,
                    userName: userMap[score.userId] || '-', // Получаем имя пользователя или ставим по умолчанию
                }));

                rankedScores.sort((a, b) => b.expCount - a.expCount); // Сортировка по expCount
                const rankedScoresWithPosition = rankedScores.map((score, index) => ({
                    ...score,
                    rank: index + 1,
                }));

                setScores(rankedScoresWithPosition);

                // Находим лучший результат текущего пользователя
                const currentUserId = context.user.user.Id; // Получаем ID текущего пользователя
                console.log(currentUserId);
                const userScores = rankedScoresWithPosition.filter(score => score.userId === currentUserId);
                console.log(userScores);
                setUserBestScore(userScores.length > 0 ? userScores[0] : null); // Получаем лучший результат
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchData();
    }, [navigate, context.user.id]);

    return (
        <div className={styles.bestScoreContainer}>
            <div className={styles.bestScoreHeader}>
                <div className={styles.bestScoreColumn}>Rank</div>
                <div className={styles.bestScoreColumn}>Date</div>
                <div className={styles.bestScoreColumn}>Description</div>
                <div className={styles.bestScoreColumn}>Exp Count</div>
                <div className={styles.bestScoreColumn}>User</div>
            </div>
            <ul className={styles.bestScoreList}>
                {scores.map((score) => (
                    <li key={score.id} className={styles.bestScoreItem}>
                        <div className={styles.bestScoreRow}>
                            <div className={styles.bestScoreCell}>{score.rank}</div>
                            <div className={styles.bestScoreCell}>{new Date(score.dateTime).toLocaleDateString()}</div>
                            <div className={styles.bestScoreCell}>{score.description}</div>
                            <div className={`${styles.bestScoreCell} ${styles.levelCell}`}>{score.expCount}</div>
                            <div className={styles.bestScoreCell}>{score.userName}</div>
                        </div>
                    </li>
                ))}
            </ul>
            {userBestScore && (
                <div className={`${styles.bestScoreRow} ${styles.currentUserRow}`}>
                    <div className={styles.bestScoreCell}>{userBestScore.rank}</div>
                    <div className={styles.bestScoreCell}>{new Date(userBestScore.dateTime).toLocaleDateString()}</div>
                    <div className={styles.bestScoreCell}>{userBestScore.description}</div>
                    <div className={`${styles.bestScoreCell} ${styles.levelCell}`}>{userBestScore.expCount}</div>
                    <div className={styles.bestScoreCell}>{userBestScore.userName}</div>
                </div>
            )}
        </div>
    );
};

export default BestScore;   