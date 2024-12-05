import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react';
import TestWindow from '../components/TestWindow_Components/TestWindow';
import LoadingAnimation from '../components/UI/LoadingAnimation/LoadingAnimation';
import { fetchTest } from '../http/testAPI';

import '../styles/page/TestPage.css';

const TestPage = observer(() => {
    const [text, setText] = useState('');
    const [selectedItems, setSelectedItems] = useState({
        section1: [],
        section2: "words",
        section3: "15",
        selectedLanguage: "English",
        selectedDifficulty: "easy"
    });

    const loadData = async () => {
        const options = {
            Options: selectedItems.section1, // Пример передачи данных
            TextType: selectedItems.section2,
            Limit: selectedItems.section3,
            Language: selectedItems.selectedLanguage,
            Difficulty: selectedItems.selectedDifficulty
        };
        
        console.log(options);
        const data = await fetchTest(options); 
    
        // Проверяем, является ли data массивом и преобразуем его в строку с пробелами
        if (Array.isArray(data)) {
            const formattedText = data.join(' '); // Объединяем элементы массива в строку с пробелами
            setText(formattedText); 
        } else {
            setText(data); 
        }
    };

    useEffect(() => {
        try{
            setText(null);
            loadData(); // Вызываем функцию для загрузки данных
        }
        catch(e){
            console.log('invalid network');
        }
    }, [selectedItems]);

    if(!text)
    {
        return (
            <LoadingAnimation>We are typing your test right now...</LoadingAnimation>
        )
    }

    return (
        <div className='testpage-main'>
            <TestWindow template={{ text: text, selectedItems: selectedItems, setSelectedItems: setSelectedItems }} /> {/* Передаем текст в TestWindow */}
        </div>
    );
});

export default TestPage;