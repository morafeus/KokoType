import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import TestSettingsSection from '../UI/SettingBar/TextSettingsSection';
import '../../styles/component/TestSettings.css';
import LanguageButton from "../UI/LanguageButton/LanguageButton";
import MyModal from "../UI/ModalWindow/MyModal";
import LanguageSelector from "../UI/LanguageSelector/LanguageSelector";
import CustomButton from "../UI/CustomButton/CustomButton"; 
import TestCounter from "../UI/TestCounter/TestCounter";

const TestSettings = observer(({wordCount, refreshText, testStatus, startTyping}) => {
    const [modal, setModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState({
        section1: [],
        section2: "words",
        section3: "15",
        selectedLanguage: null,
        selectedDifficulty: null
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
                    // Устанавливаем первый элемент из section3 при выборе section2
                    const firstItem = sectionConfig.section3[item][0];
                    return { ...prev, [section]: item, section3: firstItem }; // Сброс section3 и установка первого элемента
                }
                return { ...prev, [section]: item };
            }
        });
        refreshText();
        console.log("Выбранный элемент:", item);
    };

    const handleLanguageSelect = (language) => {
        setSelectedItems(prev => ({ ...prev, selectedLanguage: language }));
    };

    const handleDifficultySelect = (difficulty) => {
        setSelectedItems(prev => ({ ...prev, selectedDifficulty: difficulty }));
        console.log("Выбранный уровень сложности:", difficulty);
    };

    const LanguageButtonClick = () => {
        setModal(true);
    };

    const getSection3Items = () => {
        const section2Item = selectedItems.section2;
        return section2Item ? sectionConfig.section3[section2Item] : [];
    };

    return (
        <div className="mainContainer">
            <div className='test-settings-container'>
                <div className="test-settings-sections">
                    <LanguageButton onClick={LanguageButtonClick}>Language</LanguageButton>
                    <MyModal visible={modal} setVisible={setModal}>
                        <LanguageSelector 
                            onLanguageSelect={handleLanguageSelect} 
                            onDifficultySelect={handleDifficultySelect} 
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
                    <CustomButton />
                </div>
            </div>
            <TestCounter 
                selectedItems={selectedItems}
                 wordCount={wordCount}
                  refreshText={refreshText}
                   testStatus={testStatus}
                   startTyping={startTyping}// Передаем выбранные параметры
            />
        </div>
    );
});

export default TestSettings;