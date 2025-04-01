import React, { useContext, useEffect, useState } from 'react';
import { fetchUsers } from '../../../http/authAPI';
import { getBest } from '../../../http/testAPI';
import UserProfilePage from '../../Profile/UserProfilePage/UserProfilePage';
import Context from '../../../context'; // Импортируем контекст
import styles from './Leaderboard.module.css'; // Импортируем модульные стили

const Leaderboard = ({ navigate }) => {
    const context = useContext(Context); // Получаем контекст
    const [leaderboard, setLeaderboard] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchUsers(navigate);
                const leaderboardData = [];

                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    const id = user.id;
                    let best = await getBest({ id }, navigate);
                    best = { ...best, level: user.userLvl };

                    leaderboardData.push({
                        id: id,
                        userName: user.userName,
                        testCount: best.testCount,
                        userLevel: user.userLvl,
                    });
                }

                // Сортируем пользователей по уровню (от большего к меньшему) и присваиваем ранг
                leaderboardData.sort((a, b) => b.userLevel - a.userLevel);
                const rankedLeaderboardData = leaderboardData.map((user, index) => ({
                    ...user,
                    rank: index + 1,
                }));

                setLeaderboard(rankedLeaderboardData);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchData();
    }, [navigate]);

    const handleRowClick = (user) => {
        setSelectedUser(user);
    };

    if (selectedUser) {
        return <UserProfilePage id={selectedUser.id} userName={selectedUser.userName} onBackClick={() => setSelectedUser(null)} />
    }

    const currentUser = context.user.user; // Получаем информацию о текущем пользователе
    const currentUserData = leaderboard.find(user => user.id === currentUser.Id);

    return (
        <div className={styles.leaderboardContainer}>
            <div className={styles.leaderboardHeader}>
                <div className={styles.leaderboardColumn}>Rank</div>
                <div className={styles.leaderboardColumn}>Name</div>
                <div className={styles.leaderboardColumn}>Test Count</div>
                <div className={styles.leaderboardColumn}>User Level</div>
            </div>
            <ul className={styles.leaderboardList}>
                {leaderboard.map((user, index) => (
                    <li 
                        key={user.id} 
                        className={`${styles.leaderboardItem} ${index === 0 ? styles.gold : index === 1 ? styles.silver : index === 2 ? styles.bronze : ''}`} 
                        onClick={() => handleRowClick(user)}
                    >
                        <div className={styles.leaderboardRow}>
                            <div className={styles.leaderboardCell}>{user.rank}</div>
                            <div className={styles.leaderboardCell}>{user.userName}</div>
                            <div className={styles.leaderboardCell}>{user.testCount}</div>
                            <div className={`${styles.leaderboardCell} ${styles.levelCell}`}>{user.userLevel}</div>
                        </div>
                    </li>
                ))}
            </ul>
            {currentUserData && (
                <div className={`${styles.currentUserRow}`}>
                    <div className={styles.leaderboardRow}>
                        <div className={styles.leaderboardCell}>{currentUserData.rank}</div>
                        <div className={styles.leaderboardCell}>{currentUserData.userName}</div>
                        <div className={styles.leaderboardCell}>{currentUserData.testCount}</div>
                        <div className={`${styles.leaderboardCell} ${styles.levelCell}`}>{currentUserData.userLevel}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;