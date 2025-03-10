import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ControlPanel from "../components/UI/ControlPanel/ControlPanel";
import TypingResults from "../components/TypingResults/TypingResults";
import StatisticList from "../components/StatisticList/StatisticList";
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
    const [params, setParams] = useState('')

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
                const id = context.user.user.Id; 

                if (id) {
                    try {
                        const data = await fetchResults({ id, decription }, navigate);
                        if (data) {
                            setStatistics(data);
                            setParams(`Test: ${parsedItems.section2} (${parsedItems.section3}); 
                            Language: ${parsedItems.selectedLanguage} | ${parsedItems.selectedDifficulty}
                            `);
                        }
                    } catch (error) {
                        console.error('Error fetching results:', error);
                    }
                    } else {
                        console.error('User ID not found.');
                    }
            }
        };

        fetchData(); 
    }, [context.user.user]); 

    const handleRestart = () => {
        navigate(All_Routes.TEST_PAGE);
    };

    const handleNext = () => {
        context.test.setTestStats({}); 
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
                        <StatisticList stats={statistics} params= {params}/>
                    </div>
                )}
            </div>
            <div className="panel">
                <ControlPanel onRestart={handleRestart} onNext={handleNext}/>
            </div>
        </div>
    );
});

export default ResultPage;
