import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ControlPanel from "../components/UI/ControlPanel/ControlPanel";
import TypingResults from "../components/UI/TypingResults/TypingResults";
import StatisticList from "../components/UI/StatisticList/StatisticList";
import Context from "../context";
import '../styles/page/ResultPage.css'; // Импортируем стили
import All_Routes from "../utils/consts";
import Cookies from "js-cookie";
import { fetchResults } from "../http/testAPI";

const ResultPage = observer(() => {
    const navigate = useNavigate();
    const context = useContext(Context);

    const [stats, setStats] = useState({
        text: '',
        errors: 0,
        time: 0,
        errorWords: []
    });

    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        // Асинхронная функция для загрузки статистики
        const fetchData = async () => {
            setStats({
                text: context.test.testStats.text || '',
                errors: context.test.testStats.errors || 0,
                time: context.test.testStats.time || 0,
                errorWords: context.test.testStats.errorWords || []
            });

            // Получаем сохраненные параметры теста из cookies
            const savedSelectedItems = Cookies.get('selectedItems');
            const parsedItems = savedSelectedItems ? JSON.parse(savedSelectedItems) : {};
            const decription = `${parsedItems.section2},${parsedItems.section3},${parsedItems.selectedLanguage},${parsedItems.selectedDifficulty}`;
            if(context.user.isAuth)
            {
            const id = context.user.user.Id; // Пытаемся получить ID из контекста пользователя

            // Если ID существует, делаем запрос на сервер
            if (id) {
                try {
                    const data = await fetchResults({ id, decription }, navigate);
                    if (data) {
                        setStatistics(data); // Если данные получены, обновляем состояние
                    }
                } catch (error) {
                    console.error('Error fetching results:', error);
                }
                } else {
                    console.error('User ID not found.');
                }
            }
        };

        fetchData(); // Вызов асинхронной функции
    }, [context.user.user]); // Зависят от контекста пользователя

    const handleRestart = () => {
        navigate(All_Routes.TEST_PAGE);
    };

    const handleNext = () => {
        context.test.setTestStats({}); // Сбросить статистику теста
        navigate(All_Routes.TEST_PAGE);
    };

    return (
        <div className="result-container">
            <div className="result-row">
                <div className="result-block">
                    <TypingResults 
                        text={stats.text} 
                        errors={stats.errors} 
                        time={stats.time} 
                        errorWords={stats.errorWords} 
                    />
                </div>
                {context.user.isAuth && (
                    <div className="result-block stats-block">
                        <StatisticList stats={statistics} />
                    </div>
                )}
            </div>
            <div className="panel">
                <ControlPanel onRestart={handleRestart} onNext={handleNext} />
            </div>
        </div>
    );
});

export default ResultPage;
