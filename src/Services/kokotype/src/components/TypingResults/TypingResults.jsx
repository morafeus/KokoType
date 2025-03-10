import React, { useContext, useEffect } from 'react';
import Context from '../../context';
import styles from './TypingResults.module.css'; 
import Cookies from 'js-cookie'; 

const TypingResults = ({ text, errors, time, errorWords }) => {
    const context = useContext(Context);

    useEffect(() => {
        if (!context.params.params.speed || !context.params.params.accuracy) {
            const savedSettings = Cookies.get('statisticSettings');
            if (savedSettings) {
                const parsedSettings = JSON.parse(savedSettings);
                context.params.setParams({
                    speed: parsedSettings.find(setting => setting.name === 'Speed params').selected,
                    accuracy: parsedSettings.find(setting => setting.name === 'Accuracy params').selected,
                });
            }
        }
    }, [context.params]);

    const wordsCount = text.split(' ').length;
    let minutes;
    if (context.params.params.speed === 'WPM') {
        minutes = time / 60;
    } else if (context.params.params.speed === 'WPS') {
        minutes = time / 360;
    }
    const wpm = (wordsCount / minutes).toFixed(2); // Скорость печати в WPM

    const totalCharacters = text.length; // Общее количество символов
    let accuracy;
    if (context.params.params.accuracy === 'accuracy') {
        accuracy = totalCharacters > 0 ? ((totalCharacters - errors) / totalCharacters * 100).toFixed(2) : 0; // Точность в %
    } else if (context.params.params.accuracy === 'error count') {
        accuracy = errors;
    }

    return (
        <div className={styles.resultsContainer}>
            <div className={styles.resultsColumn}>
                <div className={styles.resultsItem}>
                    {context.params.params.speed === 'WPM' && (
                        <strong className={styles.resultsValue}>WPM</strong>
                    )}
                    {context.params.params.speed === 'WPS' && (
                        <strong className={styles.resultsValue}>WPS</strong>
                    )}
                    <div className={styles.result}>{wpm}</div>
                </div>
                <div className={styles.resultsItem}>
                    {context.params.params.accuracy === 'accuracy' && (
                        <strong className={styles.resultsValue}>Accuracy:</strong>
                    )}
                    {context.params.params.accuracy === 'accuracy' && (
                        <div className={styles.result}>{accuracy} %</div>
                    )}
                    {context.params.params.accuracy === 'error count' && (
                        <strong className={styles.resultsValue}>Errors:</strong>
                    )}
                    {context.params.params.accuracy === 'error count' && (
                        <div className={styles.result}>{accuracy}</div>
                    )}
                </div>
            </div>
            <div className={`${styles.resultsColumn} ${styles.errorColumn}`}>
                <div className={styles.resultsItem}>
                    <strong className={styles.resultsValue}>Error Words:</strong>
                    <div className={styles.scrollContainer}>
                        <div className={styles.result}>
                            {errorWords.length > 0 ? (
                                <span className={styles.errorText}>
                                    {errorWords.join(', ')} {/* Ошибочные слова */}
                                </span>
                            ) : (
                                'Good Work. No Mistakes!'
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypingResults;
