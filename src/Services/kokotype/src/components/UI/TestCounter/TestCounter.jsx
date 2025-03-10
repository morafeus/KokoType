import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import Context from "../../../context";
import classes from './TestCounter.module.css';

const TestCounter = observer(({ selectedItems, wordCount, finishText, resetTimer }) => {   
    const context = useContext(Context);

    const [timeRemaining, setTimeRemaining] = useState(null);
    const section2 = selectedItems.section2;
    const section3Value = selectedItems.section3;

    useEffect(() => {
        let timer;
        if (context.test.isTyping === 1 && section2 === "time" && section3Value) {
            const timerValue = parseInt(section3Value, 10);
            setTimeRemaining(timerValue);
            timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        (async () => {
                            await finishText();  // Вызов finishText с await
                        })();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } 
        
    }, [context.test.isTyping, section2, section3Value]);

    

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