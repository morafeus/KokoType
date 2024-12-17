import React from 'react';
import styles from './TypingResults.module.css'; // Импортируем стили

const TypingResults = ({ text, errors, time, errorWords }) => {
    // Вычисляем скорость печати
    const wordsCount = text.split(' ').length; // Количество слов
    const minutes = time / 60; // Время в минутах
    const wpm = (wordsCount / minutes).toFixed(2); // Скорость печати в WPM

    // Вычисляем точность
    const totalCharacters = text.length; // Общее количество символов
    const accuracy = totalCharacters > 0 ? ((totalCharacters - errors) / totalCharacters * 100).toFixed(2) : 0; // Точность в %

    return (
        <div className={styles.resultsContainer}>
            <div className={styles.resultsColumn}>
                <div className={styles.resultsItem}>
                    <strong className={styles.resultsValue}>WPM:</strong> 
                    <div className={styles.result}> {wpm}</div>
                </div>
                <div className={styles.resultsItem}>
                    <strong className={styles.resultsValue}>Accuracy:</strong>
                    <div className={styles.result}> {accuracy} %</div>
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
                                "Good Work. No Mistakes!"
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TypingResults;