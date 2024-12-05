import React, { useState, useEffect } from "react";
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

const LanguageSelector = ({ selectedLanguage, selectedDifficulty, setLanguageDifficulty }) => {
    const [searchTerm, setSearchTerm] = useState("");
    
    // Устанавливаем локальные состояния на основе пропсов
    const [localSelectedLanguage, setLocalSelectedLanguage] = useState(selectedLanguage);
    const [localSelectedDifficulty, setLocalSelectedDifficulty] = useState(selectedDifficulty);

    // Эффект для обновления локальных состояний при изменении пропсов
    useEffect(() => {
        setLocalSelectedLanguage(selectedLanguage);
        setLocalSelectedDifficulty(selectedDifficulty);
    }, [selectedLanguage, selectedDifficulty]);

    const filteredLanguages = languages.filter(language =>
        language.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectLanguage = (language) => {
        setLocalSelectedLanguage(language);
        setLanguageDifficulty(prev => ({ ...prev, selectedLanguage: language }));
    };

    const handleSelectDifficulty = (section, item) => {
        setLocalSelectedDifficulty(item);
        setLanguageDifficulty(prev => ({ ...prev, selectedDifficulty: item }));
    };

    return (
        <div>
            <div className={styles.difficultyContainer}>
                <label className={styles.label}>Difficulty:</label>
                <TestSettingsSection 
                    section="difficulty" 
                    items={difficulties} 
                    selectedItem={localSelectedDifficulty} 
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
                        className={`${styles.languageItem} ${language === localSelectedLanguage ? styles.blink : ''}`} 
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