import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../../http/authAPI';
import { fetchAllResults, getBest } from '../../../http/testAPI';
import UserInfo from '../UserInfo/UserInfo';
import UserStats from '../UserStats/UserStats';
import BestStats from '../BestStats/BestStats';
import '../../../styles/page/ProfilePage.css';
import LoadingAnimation from '../../UI/LoadingAnimation/LoadingAnimation';
import StatsList from '../StatsList/StatsList';

const UserProfilePage = ({ id, userName, onBackClick }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);  // Хранение данных пользователя
    const [bestStats, setBestStats] = useState(null);  // Хранение статистики best
    const [loading, setLoading] = useState(true);  // Флаг для индикации загрузки
    const [error, setError] = useState(null);  // Для обработки ошибок
    const [allStats, setAllStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMe({ id, userName }, navigate);
                setUserData(data.data);

                // Запрос лучших статистик
                const best = await getBest({ id }, navigate);
                setBestStats(best); // Убедитесь, что данные в best.data

                
                const stats = await fetchAllResults({id}, navigate);
                setAllStats(stats); 

                // По завершении загрузки выключаем лоадер
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError("There was an error loading your data. Please try again.");
                setLoading(false);
            }
        };

        fetchData();
    }, [id, userName, navigate]);

    // Если данные еще загружаются, показываем лоадер
    if (loading) {
        return <LoadingAnimation>We are fetching your information...</LoadingAnimation>;
    }

    // Если ошибка, показываем сообщение
    if (error) {
        return <div>{error}</div>;
    }

    // Обработчик для кнопки "Back"
    const handleBackClick = () => {
        if (onBackClick) {
            onBackClick();  // Выполнение функции, переданной через пропсы
        } else {
            navigate(-1);  // Возвращаемся на предыдущую страницу, если функция не передана
        }
    };

    return (
        <div className="profilePage">
            <div className="profileContainer">
                {/* Контейнер для UserInfo, занимающий всю строку */}
                <div className="userInfoContainer">
                    <UserInfo
                        ident = {id}
                        userName={userData.userName}
                        email={userData.email}
                        registrateDate={userData.registrateDate}
                        my={false}
                    />
                </div>

                {/* Контейнер для статистики */}
                <div className="statsContainer">
                    <div className="userStats">
                        <UserStats
                            userExp={userData.userExp}
                            userLvl={userData.userLvl}
                            testCount={bestStats.testCount}
                            testStart={userData.testStarted}
                        />
                    </div>
                    <div className="bestStats">
                        <BestStats
                            accuracy={bestStats.accuracy}
                            speed={bestStats.speed}
                            expCount={bestStats.expCount}
                        />
                    </div>
                </div>
                <StatsList stats={allStats} />

                {/* Кнопка для возврата */}
                <button className="logOutBtn" onClick={handleBackClick}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default UserProfilePage;
