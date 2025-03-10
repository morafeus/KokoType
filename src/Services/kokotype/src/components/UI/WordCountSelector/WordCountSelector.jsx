import React from 'react';
import styles from './WordCountSelector.module.css'; // Импорт стилей

const WordCountSelector = ({ wordCount, setWordCount }) => {
    const handleChange = (event) => {
        const value = event.target.value;
        if (value === '' || /^[1-9]\d*$/.test(value)) {
            setWordCount(value);
        }
    };

    return (
        <div className={styles.wordCountSelector}>
            <label htmlFor="wordCountInput" className={styles.label}>Enter word count:</label>
            <input
                type="number"
                id="wordCountInput"
                value={wordCount}
                onChange={handleChange}
                min="1"
                placeholder="e.g. 15"
                className={styles.input}
            />
        </div>
    );
};

export default WordCountSelector;