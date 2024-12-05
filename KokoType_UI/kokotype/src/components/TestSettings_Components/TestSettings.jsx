import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import TestSettingsSection from '../UI/SettingBar/TextSettingsSection';
import '../../styles/component/TestSettings.css';
import LanguageButton from "../UI/LanguageButton/LanguageButton";
import MyModal from "../UI/ModalWindow/MyModal";
import LanguageSelector from "../UI/LanguageSelector/LanguageSelector";
import CustomButton from "../UI/CustomButton/CustomButton"; 
import TestCounter from "../UI/TestCounter/TestCounter";
import WordCountSelector from "../UI/WordCountSelector/WordCountSelector"; 

const TestSettings = observer(({ wordCount, refreshText, testStatus, startTyping, selectedItems, setSelectedItems }) => {
    const [modal, setModal] = useState(false);
    const [wordCountModal, setWordCountModal] = useState(false);
    const [localWordCount, setLocalWordCount] = useState('');

    // Состояние для языка и уровня сложности
    const [languageDifficulty, setLanguageDifficulty] = useState({
        selectedLanguage: null,
        selectedDifficulty: "easy",
    });

    const sectionConfig = {
        section1: { items: ["punctuation", "numbers"], multiple: true },
        section2: { items: ["words", "time", "text"], multiple: false },
        section3: {
            words: ["15", "20", "25"],
            time: ["15", "45", "60"],
            text: ["long", "short", "lyric"]
        }
    };

    const handleSelectItem = (section, item) => {
        const isMultiple = sectionConfig[section].multiple;
        setSelectedItems(prev => {
            if (isMultiple) {
                const currentSelection = prev[section];
                if (currentSelection.includes(item)) {
                    return { ...prev, [section]: currentSelection.filter(i => i !== item) };
                } else {
                    return { ...prev, [section]: [...currentSelection, item] };
                }
            } else {
                if (section === "section2") {
                    const firstItem = sectionConfig.section3[item][0];
                    return { ...prev, [section]: item, section3: firstItem };
                }
                return { ...prev, [section]: item };
            }
        });
        refreshText();
        console.log("Выбранный элемент:", item);
    };

    const handleLanguageAndDifficultySelect = (language, difficulty) => {
        setLanguageDifficulty({ selectedLanguage: language, selectedDifficulty: difficulty });
        setSelectedItems(prev => ({
            ...prev,
            selectedLanguage: language,
            selectedDifficulty: difficulty
        }));
    };

    const LanguageButtonClick = () => {
        setModal(true);
    };

    const handleWordCountButtonClick = () => {
        setLocalWordCount(selectedItems.wordCount || ''); // Устанавливаем текущее значение
        setWordCountModal(true);
    };

    const handleWordCountAccept = () => {
        if (localWordCount) {
            console.log("Word count accepted:", localWordCount);
            setSelectedItems(prev => ({ ...prev, section3: localWordCount })); // Сохраняем значение
            setWordCountModal(false);
        }
    };

    const getSection3Items = () => {
        const section2Item = selectedItems.section2;
        return section2Item ? sectionConfig.section3[section2Item] : [];
    };

    const isButtonActive = () => {
        const currentValue = selectedItems.section3;
        const validValues = Object.values(sectionConfig.section3).flat();
        return !validValues.includes(currentValue);
    };

    const isTextSelected = selectedItems.section2 === "text";

    return (
        <div className="mainContainer">
            <div className='test-settings-container'>
                <div className="test-settings-sections">
                    <LanguageButton onClick={LanguageButtonClick}>Language</LanguageButton>
                    <MyModal visible={modal} setVisible={setModal} onAccept={() => handleLanguageAndDifficultySelect(languageDifficulty.selectedLanguage, languageDifficulty.selectedDifficulty)}>
                        <LanguageSelector 
                            selectedLanguage={selectedItems.selectedLanguage || languageDifficulty.selectedLanguage}
                            selectedDifficulty={selectedItems.selectedDifficulty || languageDifficulty.selectedDifficulty}
                            setLanguageDifficulty={setLanguageDifficulty}
                        />
                    </MyModal>
                    <div className="section-divider"></div>
                    <TestSettingsSection 
                        section="section1" 
                        items={sectionConfig.section1.items} 
                        selectedItem={selectedItems.section1}
                        onSelectItem={handleSelectItem} 
                        isMultiple={sectionConfig.section1.multiple} 
                    />
                    <div className="section-divider"></div>
                    <TestSettingsSection 
                        section="section2" 
                        items={sectionConfig.section2.items} 
                        selectedItem={selectedItems.section2}
                        onSelectItem={handleSelectItem} 
                    />
                    <div className="section-divider"></div> 
                    <TestSettingsSection 
                        section="section3" 
                        items={getSection3Items()} 
                        selectedItem={selectedItems.section3}
                        onSelectItem={handleSelectItem} 
                    /> 
                    {!isTextSelected && (
                        <CustomButton onClick={handleWordCountButtonClick} isActive={isButtonActive()} />
                    )}
                </div>
            </div>
            <TestCounter 
                selectedItems={selectedItems}
                wordCount={wordCount}
                refreshText={refreshText}
                testStatus={testStatus}
                startTyping={startTyping}
            />
            <MyModal visible={wordCountModal} setVisible={setWordCountModal} onAccept={handleWordCountAccept}>
                <WordCountSelector wordCount={localWordCount} setWordCount={setLocalWordCount} />
            </MyModal>
        </div>
    );
});

export default TestSettings;