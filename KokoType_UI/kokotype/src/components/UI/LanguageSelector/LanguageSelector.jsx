import React, { useState } from "react";
import styles from './LanguageSelector.module.css';
import TestSettingsSection from '../SettingBar/TextSettingsSection';

const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Russian",
    "Japanese",
    "Korean",
];

const difficulties = ["easy", "medium", "hard"];

const LanguageSelector = ({ onLanguageSelect, onDifficultySelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

    const filteredLanguages = languages.filter(language =>
        language.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectLanguage = (language) => {
        setSelectedLanguage(language);
        onLanguageSelect(language); // Передаем выбранный язык в родительский компонент
    };

    const handleSelectDifficulty = (section, item) => {
        setSelectedDifficulty(item);
        onDifficultySelect(item); // Передаем выбранный уровень сложности в родительский компонент
    };

    return (
        <div>
            <div className={styles.difficultyContainer}>
                <label className={styles.label}>Difficulty:</label>
                <TestSettingsSection 
                    section="difficulty" 
                    items={difficulties} 
                    selectedItem={selectedDifficulty} 
                    onSelectItem={handleSelectDifficulty} 
                    isMultiple={false} 
                />
            </div>
            <input
                type="text"
                placeholder="Search languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            <ul className={styles.languageList}>
                {filteredLanguages.map((language) => (
                    <li 
                        key={language} 
                        className={`${styles.languageItem} ${language === selectedLanguage ? styles.blink : ''}`} 
                        onClick={() => handleSelectLanguage(language)}
                    >
                        {language}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LanguageSelector;