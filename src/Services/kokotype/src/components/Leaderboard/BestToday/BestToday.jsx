import React, { useEffect, useState, useContext } from 'react';
import { fetchToday } from '../../../http/testAPI'; // Импортируем метод для получения данных на сегодня
import { fetchUsers } from '../../../http/authAPI'; // Импортируем метод для получения пользователей
import Context from '../../../context'; // Импортируем контекст
import styles from './BestToday.module.css'; // Импортируем модульные стили

const BestToday = ({ navigate }) => {
    const context = useContext(Context); // Получаем контекст
    const currentUserId = context.user.user.Id; // Получаем ID текущего пользователя
    const [todayScores, setTodayScores] = useState([]); // Состояние для хранения данных на сегодня
    const [users, setUsers] = useState({}); // Объект для хранения информации о пользователях
    const [userBestScore, setUserBestScore] = useState(null); // Для хранения лучшего результата текущего пользователя

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем данные на сегодня
                const allTodayScores = await fetchToday(navigate);
                // Получаем всех пользователей
                const userList = await fetchUsers(navigate);
                const userMap = userList.reduce((acc, user) => {
                    acc[user.id] = user.userName; // Создаем объект с userId как ключом и userName как значением
                    return acc;
                }, {});
                setUsers(userMap);

                // Подсчитываем количество тестов и сумму expCount для каждого пользователя
                const userScoresMap = allTodayScores.reduce((acc, score) => {
                    const userId = score.userId;
                    if (!acc[userId]) {
                        acc[userId] = {
                            count: 0,
                            totalExp: 0,
                            userName: userMap[userId] || '-',
                        };
                    }
                    acc[userId].count += 1; // Увеличиваем количество тестов
                    acc[userId].totalExp += score.expCount; // Увеличиваем сумму expCount
                    return acc;
                }, {});

                // Преобразуем объект в массив
                const rankedScores = Object.entries(userScoresMap).map(([userId, data]) => ({
                    userId,
                    count: data.count,
                    totalExp: data.totalExp,
                    userName: data.userName,
                }));

                // Сортируем по totalExp (сумма expCount) и присваиваем ранги
                rankedScores.sort((a, b) => b.totalExp - a.totalExp);
                const finalScores = rankedScores.map((score, index) => ({
                    rank: index + 1, // Присваиваем ранг на основе позиции в отсортированном массиве
                    ...score, // Добавляем остальные данные
                }));

                setTodayScores(finalScores);

                // Находим лучший результат текущего пользователя
                const currentUserScore = finalScores.find(score => score.userId === currentUserId);
                setUserBestScore(currentUserScore || null);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchData();
    }, [navigate, currentUserId]);

    const currentDate = new Date().toLocaleDateString('en-EN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className={styles.bestTodayContainer}>
            <h1>{currentDate}</h1> {/* Отображение текущей даты */}
            <div className={styles.bestTodayHeader}>
                <div className={styles.bestTodayColumn}>Rank</div>
                <div className={styles.bestTodayColumn}>Tests today</div>
                <div className={styles.bestTodayColumn}>Exp Count</div>
                <div className={styles.bestTodayColumn}>User</div>
            </div>
            <ul className={styles.bestTodayList}>
                {todayScores.map((score) => (
                    <li key={score.userId} className={styles.bestTodayItem}>
                        <div className={styles.bestTodayRow}>
                            <div className={styles.bestTodayCell}>{score.rank}</div>
                            <div className={styles.bestTodayCell}>{score.count}</div>
                            <div className={`${styles.bestTodayCell} ${styles.levelCell}`}>{score.totalExp}</div>
                            <div className={styles.bestTodayCell}>{score.userName}</div>
                        </div>
                    </li>
                ))}
            </ul>
            {userBestScore && (
                <div className={`${styles.bestTodayRow} ${styles.currentUserRow}`}>
                    <div className={styles.bestTodayCell}>{userBestScore.rank}</div>
                    <div className={styles.bestTodayCell}>{userBestScore.count}</div>
                    <div className={`${styles.bestTodayCell} ${styles.levelCell}`}>{userBestScore.totalExp}</div>
                    <div className={styles.bestTodayCell}>{userBestScore.userName}</div>
                </div>
            )}
        </div>
    );
}

export default BestToday;