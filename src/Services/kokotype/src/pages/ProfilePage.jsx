import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import Context from '../context';
import { addUserAchive, getMe, logout } from '../http/authAPI';
import { fetchAllResults, getBest } from '../http/testAPI';
import UserInfo from '../components/Profile/UserInfo/UserInfo';
import UserStats from '../components/Profile/UserStats/UserStats';
import BestStats from '../components/Profile/BestStats/BestStats';
import StatsList from '../components/Profile/StatsList/StatsList'; 
import ActivityCalendar from '../components/Profile/ActivityCalendar/ActivityCalendar'; // Импортируем новый компонент
import '../styles/page/ProfilePage.css'; 
import LoadingAnimation from '../components/UI/LoadingAnimation/LoadingAnimation';
import All_Routes from '../utils/consts';
import Cookies from 'js-cookie';
import Achievements from '../components/Profile/Achievements/Achievements';

const ProfilePage = observer(() => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);  
    const [bestStats, setBestStats] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [allStats, setAllStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = context.user.user.Id;
                const userName = context.user.user.UserName;
                
                const data = await getMe({ id, userName }, navigate);
                setUserData(data.data);

                const best = await getBest({ id }, navigate);
                setBestStats(best); 
               

                const stats = await fetchAllResults({id}, navigate);
                console.log(stats);
                setAllStats(stats); // Сохраняем все статистики

                setLoading(false);
            } catch (err) {
                console.error("Ошибка загрузки данных: ", err);
                setError("Произошла ошибка при загрузке ваших данных. Пожалуйста, попробуйте еще раз.");
                setLoading(false);
            }
        };

        fetchData();
    }, [context.user.user.Id]);

    if (loading) {
        return <LoadingAnimation>we are loading your information...</LoadingAnimation>;
    }

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
                <div className="userInfoContainer">
                    <UserInfo
                        ident={userData.id}
                        userName={userData.userName}
                        email={userData.email}
                        registrateDate={userData.registrateDate}
                        my={true}
                    />
                </div>
                <Achievements achives={userData.achives} />

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
                <ActivityCalendar stats={allStats} />
                <StatsList stats={allStats} />
                <button className="logOutBtn" onClick={handleLogOut}>
                    Выйти
                </button>
            </div>
        </div>
    );
});

export default ProfilePage;