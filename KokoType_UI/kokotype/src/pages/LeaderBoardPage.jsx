import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../http/authAPI';
import { getBest } from '../http/testAPI';
import '../styles/page/LeaderBoardPage.css';  // Подключаем файл стилей

const LeaderBoradPage = observer(() => {
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState([]);  // Состояние для хранения данных leaderboard
    const [sortConfig, setSortConfig] = useState({
        key: 'rank',  // Столбец по умолчанию, по которому сортируем
        direction: 'asc',  // Направление сортировки (по возрастанию)
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchUsers(navigate);

                // Массив для хранения всех результатов с порядковыми номерами и данными
                const leaderboardData = [];

                // Перебираем всех пользователей
                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    const id = user.id;
                    // Получаем данные о лучшем результате для каждого пользователя
                    let best = await getBest({ id }, navigate);
                    best = { ...best, level: user.userLvl };

                    // Создаем объект с порядковым номером, именем и данными best
                    leaderboardData.push({
                        rank: i + 1,  // Порядковый номер (начинаем с 1)
                        userName: user.userName,  // Имя пользователя
                        best: best,  // Данные best
                    });
                }

                // Обновляем состояние leaderboard с полученными данными
                setLeaderboard(leaderboardData);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchData();
    }, [navigate]);

    // Функция для сортировки данных
    const handleSort = (column) => {
        let direction = 'asc';
        if (sortConfig.key === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: column, direction });
    };

    // Сортировка данных
    const sortedLeaderboard = [...leaderboard].sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Если это вложенный объект, то извлекаем нужное значение
        if (sortConfig.key.includes('.')) {
            const keys = sortConfig.key.split('.');
            aValue = a;
            bValue = b;
            keys.forEach(key => {
                aValue = aValue[key];
                bValue = bValue[key];
            });
        }

        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className="leaderboard-container">
            <h1>Leaderboard</h1>
            <div className="leaderboard-header">
                <div
                    className={`leaderboard-column ${sortConfig.key === 'rank' ? (sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc') : ''}`}
                    onClick={() => handleSort('rank')}
                >
                    Rank
                </div>
                <div
                    className={`leaderboard-column ${sortConfig.key === 'userName' ? (sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc') : ''}`}
                    onClick={() => handleSort('userName')}
                >
                    Username
                </div>
                <div
                    className={`leaderboard-column ${sortConfig.key === 'best.accuracy' ? (sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc') : ''}`}
                    onClick={() => handleSort('best.accuracy')}
                >
                    Accuracy
                </div>
                <div
                    className={`leaderboard-column ${sortConfig.key === 'best.speed' ? (sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc') : ''}`}
                    onClick={() => handleSort('best.speed')}
                >
                    Speed
                </div>
                <div
                    className={`leaderboard-column ${sortConfig.key === 'best.testCount' ? (sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc') : ''}`}
                    onClick={() => handleSort('best.testCount')}
                >
                    Test Count
                </div>
                <div
                    className={`leaderboard-column ${sortConfig.key === 'best.level' ? (sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc') : ''}`}
                    onClick={() => handleSort('best.level')}
                >
                    Level
                </div>
            </div>
            <ul className="leaderboard-list">
                {sortedLeaderboard.map((user, index) => (
                    <li key={index} className="leaderboard-item">
                        <div className="leaderboard-row">
                            <div className="leaderboard-cell">{user.rank}</div>
                            <div className="leaderboard-cell">{user.userName}</div>
                            <div className="leaderboard-cell">{user.best.accuracy}%</div>
                            <div className="leaderboard-cell">{user.best.speed} ms</div>
                            <div className="leaderboard-cell">{user.best.testCount}</div>
                            <div className="leaderboard-cell">{user.best.level}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default LeaderBoradPage;
