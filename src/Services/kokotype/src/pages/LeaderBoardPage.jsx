import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfilePage from '../components/Profile/UserProfilePage/UserProfilePage';
import Leaderboard from '../components/Leaderboard/Leaderboard/Leaderboard'; // Импортируем компонент Leaderboard
import { fetchUsers } from '../http/authAPI';
import { getBest } from '../http/testAPI';
import '../styles/page/LeaderBoardPage.css'; // Подключаем файл стилей
import BestScore from '../components/Leaderboard/BestScore/BestScore';
import BestToday from '../components/Leaderboard/BestToday/BestToday';
import BestClassic from '../components/Leaderboard/BestClassic/BestClassic';

const LeaderBoradPage = observer(() => {
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState([]);  
    const [sortConfig, setSortConfig] = useState({
        key: 'rank',
        direction: 'asc',
    });
    const [viewMode, setViewMode] = useState('leaderboard'); // Состояние для управления режимом отображения

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
                        rank: i + 1, 
                        userName: user.userName,  
                        best: best,  
                    });
                }

                setLeaderboard(leaderboardData);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchData();
    }, [navigate]);



    // Переключатели режимов
    const handleModeSwitch = (mode) => {
        setViewMode(mode);
    };

    return (
        <div className="leaderboard-container">
            <div className="mode-switcher">
                <button
                    className={viewMode === 'leaderboard' ? 'active' : ''}
                    onClick={() => handleModeSwitch('leaderboard')}
                >
                    Leaderboard
                </button>
                <button
                    className={viewMode === 'bestClassic' ? 'active' : ''}
                    onClick={() => handleModeSwitch('bestClassic')}
                >
                    Best Classic
                </button>
                <button
                    className={viewMode === 'bestScore' ? 'active' : ''}
                    onClick={() => handleModeSwitch('bestScore')}
                >
                    Best Score
                </button>
                <button
                    className={viewMode === 'bestToday' ? 'active' : ''}
                    onClick={() => handleModeSwitch('bestToday')}
                >
                    Best Today
                </button>
            </div>
            <div className="leaderboard-content">
                {viewMode === 'leaderboard' ? (
                    <Leaderboard navigate={navigate} />
                ) : viewMode === 'bestToday' ? (
                    <div>
                        <BestToday navigate={navigate}/>
                    </div>
                ) : (
                    <div> 
                        {viewMode === 'bestClassic' ? (
                            <>
                                <BestClassic navigate={navigate}/>
                            </>
                        ) : (
                            <>
                                <BestScore navigate={navigate}/>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

export default LeaderBoradPage;