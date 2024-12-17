import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ControlPanel from "../components/UI/ControlPanel/ControlPanel";
import TypingResults from "../components/UI/TypingResults/TypingResults";
import Context from "../context";
import '../styles/page/ResultPage.css'; // Импортируем стили
import All_Routes from "../utils/consts";

const ResultPage = observer(() => {
    const navigate = useNavigate();

    const context = useContext(Context);
    const [stats, setStats] = useState({
        text: '',
        errors: 0,
        time: 0,
        errorWords: []
    });

    useEffect(() => {
        // Устанавливаем состояние данными из контекста
        setStats({
            text: context.test.testStats.text || '',
            errors: context.test.testStats.errors || 0,
            time: context.test.testStats.time || 0,
            errorWords: context.test.testStats.errorWords || []
        });

        
    }, []);

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
                    <TypingResults text={stats.text} errors={stats.errors} time={stats.time} errorWords={stats.errorWords} />
                </div>
                {context.user.isAuth && (
                    <div className="result-block stats-block">
                        Stats
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