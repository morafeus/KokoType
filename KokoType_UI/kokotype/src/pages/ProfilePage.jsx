import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Context from '../context';
import { getMe, logout } from '../http/authAPI';
import { getBest } from '../http/testAPI';
import UserInfo from '../components/Profile_Components/UserInfo/UserInfo';
import UserStats from '../components/Profile_Components/UserStats/UserStats';
import BestStats from '../components/Profile_Components/BestStats/BestStats'; // Новый компонент для Best статистики
import '../styles/page/ProfilePage.css'; // Обычные стили
import LoadingAnimation from '../components/UI/LoadingAnimation/LoadingAnimation';
import All_Routes from '../utils/consts';
import Cookies from 'js-cookie';

const ProfilePage = observer(() => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);  // Хранение данных пользователя
    const [bestStats, setBestStats] = useState(null);  // Хранение статистики best
    const [loading, setLoading] = useState(true);  // Флаг для индикации загрузки
    const [error, setError] = useState(null);  // Для обработки ошибок

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = context.user.user.Id;
                const userName = context.user.user.UserName;
                
                // Запрос данных пользователя
                const data = await getMe({ id, userName }, navigate);
                setUserData(data.data);

                // Запрос лучших статистик
                const best = await getBest({ id }, navigate);
                setBestStats(best); // Убедитесь, что данные в best.data

                // По завершении загрузки выключаем лоадер
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError("There was an error loading your data. Please try again.");
                setLoading(false);
            }
        };

        fetchData();
    }, [context.user.user.Id]);

    // Если данные еще загружаются, показываем лоадер
    if (loading) {
        return <LoadingAnimation>We are fetching your information...</LoadingAnimation>;
    }

    // Функция для выхода из системы
    const handleLogOut = async () => {
        context.user.setIsAuth(false); 
        const id = userData.id;
        const userName = userData.userName;
        await logout({ id, userName }, navigate);
        Cookies.remove('selectedItems');
        context.user.setUser(null); 
        localStorage.setItem('token','');
        localStorage.setItem('refresh-token', '');
        navigate(All_Routes.AUTH_PAGE);
    };

    return (
        <div className="profilePage">
            <div className="profileContainer">
                {/* Контейнер для UserInfo, занимающий всю строку */}
                <div className="userInfoContainer">
                    <UserInfo
                        userName={userData.userName}
                        email={userData.email}
                        registrateDate={userData.registrateDate}
                    />
                </div>

                {/* Контейнер для статистики */}
                <div className="statsContainer">
                    <div className="userStats">
                        <UserStats
                            userExp={userData.userExp}
                            userLvl={userData.userLvl}
                        />
                    </div>
                    <div className="bestStats">
                        <BestStats
                            accuracy={bestStats.accuracy}
                            speed={bestStats.speed}
                            testCount={bestStats.testCount}
                        />
                    </div>
                </div>

                {/* Кнопка для выхода */}
                <button className="logOutBtn" onClick={handleLogOut}>
                    Log Out
                </button>
            </div>
        </div>
    );
});

export default ProfilePage;
