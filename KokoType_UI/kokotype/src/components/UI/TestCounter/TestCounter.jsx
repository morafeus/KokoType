import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import classes from './TestCounter.module.css';

const TestCounter = observer(({ selectedItems, wordCount, refreshText, resetTimer, startTyping }) => {
    const [timeRemaining, setTimeRemaining] = useState(null);
    const section2 = selectedItems.section2;
    const section3Value = selectedItems.section3;

    useEffect(() => {
        let timer;
        if (startTyping && section2 === "time" && section3Value) {
            const timerValue = parseInt(section3Value, 10);
            setTimeRemaining(timerValue);
            timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        refreshText();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setTimeRemaining(null);
        }
        
        return () => clearInterval(timer); // Очистка интервала при размонтировании или изменении зависимостей
    }, [startTyping, section2, section3Value, refreshText, resetTimer]);

    useEffect(() => {
        if (section3Value && wordCount >= parseInt(section3Value, 10)) {
            refreshText();
            resetTimer(); // Сброс таймера
        }
    }, [wordCount, section3Value, refreshText, resetTimer]);

    const renderCounter = () => {
        if (section2 === "words") {
            return `${wordCount}/${section3Value}`;
        } else if (section2 === "time") {
            return `${timeRemaining == null ? section3Value : timeRemaining}`;
        } else if (section2 === "text") {
            return wordCount; // Скрыть TestCounter
        }
    };

    return (
        <div className={classes.counterContainer}>
            {renderCounter()}
        </div>
    );
});

export default TestCounter;