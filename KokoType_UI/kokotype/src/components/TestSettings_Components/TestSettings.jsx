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
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";

const TestSettings = observer(({ wordCount, refreshText, finishText, testStatus, selectedItems, setSelectedItems, errorCount }) => {
    const [modal, setModal] = useState(false);
    const [wordCountModal, setWordCountModal] = useState(false);
    const [localWordCount, setLocalWordCount] = useState('');

    // State for language and difficulty level
    const [languageDifficulty, setLanguageDifficulty] = useState({
        selectedLanguage: "",
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
            let newSelection;
            if (isMultiple) {
                const currentSelection = prev[section];
                if (currentSelection.includes(item)) {
                    newSelection = { ...prev, [section]: currentSelection.filter(i => i !== item) };
                } else {
                    newSelection = { ...prev, [section]: [...currentSelection, item] };
                }
            } else {
                if (section === "section2") {
                    const firstItem = sectionConfig.section3[item][0];
                    newSelection = { ...prev, [section]: item, section3: firstItem };
                } else {
                    newSelection = { ...prev, [section]: item };
                }
            }
            refreshText();
            console.log("Selected item:", item);
            return newSelection;
        });
    };

    const LanguageButtonClick = () => {
        setLanguageDifficulty({
            selectedLanguage: selectedItems.selectedLanguage, 
            selectedDifficulty: selectedItems.selectedDifficulty
        });
        setModal(true);
    };

    const handleWordCountButtonClick = () => {
        setLocalWordCount(selectedItems.wordCount || ''); // Set the current word count value
        setWordCountModal(true);
    };

    const handleLanguageAndDifficultySelect = () => {
        const newItems = {
            ...selectedItems,
            selectedLanguage: languageDifficulty.selectedLanguage,
            selectedDifficulty: languageDifficulty.selectedDifficulty
        };
        setSelectedItems(newItems);
        setModal(false);
    };

    const handleWordCountAccept = () => {
        if (localWordCount) {
            console.log("Word count accepted:", localWordCount);
            const newItems = { ...selectedItems, section3: localWordCount }; // Save the value
            setSelectedItems(newItems);
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
                <LanguageButton onClick={LanguageButtonClick}>Language</LanguageButton>
                <MyModal visible={modal} setVisible={setModal} onAccept={handleLanguageAndDifficultySelect}>
                    <LanguageSelector 
                        selectedLanguage={languageDifficulty.selectedLanguage}
                        selectedDifficulty={languageDifficulty.selectedDifficulty}
                        setLanguageDifficulty={setLanguageDifficulty}
                    />
                </MyModal>
                <div className="section-divider"></div>
                {selectedItems.section2 !== "text" && 
                <TestSettingsSection 
                    section="section1" 
                    items={sectionConfig.section1.items} 
                    selectedItem={selectedItems.section1}
                    onSelectItem={handleSelectItem} 
                    isMultiple={sectionConfig.section1.multiple} 
                />
                }
                {selectedItems.section2 !== "text" && 
                    <div className="section-divider"></div>
                }
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
            <div className="counter-container">
                <TestCounter 
                    selectedItems={selectedItems}
                    wordCount={wordCount}
                    finishText={finishText}
                    testStatus={testStatus}
                />
                <ErrorMessage errorCount={errorCount} /> 
            </div>
            <MyModal visible={wordCountModal} setVisible={setWordCountModal} onAccept={handleWordCountAccept}>
                <WordCountSelector wordCount={localWordCount} setWordCount={setLocalWordCount} />
            </MyModal>
        </div>
    );
});

export default TestSettings;