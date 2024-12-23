import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import TestWindow from '../components/TestWindow_Components/TestWindow';
import LoadingAnimation from '../components/UI/LoadingAnimation/LoadingAnimation';
import Context from '../context';
import { fetchTest } from '../http/testAPI';
import Cookies from 'js-cookie'; // Импортируем js-cookie
import '../styles/page/TestPage.css';

const TestPage = observer(() => {
    const context = useContext(Context);
    const [text, setText] = useState('');
    const [selectedItems, setSelectedItems] = useState({
        section1: [],
        section2: "words",
        section3: "15",
        selectedLanguage: "English",
        selectedDifficulty: "easy"
    });

    const [isCookiesLoaded, setIsCookiesLoaded] = useState(false); // Флаг для отслеживания загрузки cookies

    // Функция загрузки данных теста из API или из контекста
    const loadData = async () => {
        const options = {
            Options: selectedItems.section1, // Пример передачи данных
            TextType: selectedItems.section2,
            Limit: selectedItems.section3,
            Language: selectedItems.selectedLanguage,
            Difficulty: selectedItems.selectedDifficulty
        };
        let data;
        if (context.test.testStats.text != null) {
            data = context.test.testStats.text;
            context.test.setTestStats({}); // Очищаем testStats, если текст был найден в контексте
        } else {
            data = await fetchTest(options); 
        }

        // Проверяем, является ли data массивом, и объединяем его в строку
        if (Array.isArray(data)) {
            const formattedText = data.join(' '); // Объединяем элементы массива в строку
            setText(formattedText); 
        } else {
            setText(data); 
        }
    };

    // Загрузка состояния из cookies
    useEffect(() => {
        const savedSelectedItems = Cookies.get('selectedItems');
        if (savedSelectedItems) {
            const parsedItems = JSON.parse(savedSelectedItems);
            // Проверяем, отличается ли сохраненное состояние от текущего состояния
            if (JSON.stringify(parsedItems) !== JSON.stringify(selectedItems)) {
                setSelectedItems(parsedItems);
            }
        }
        setIsCookiesLoaded(true); // Обновляем флаг после загрузки cookies
    }, []); // Пустой массив зависимостей — этот effect выполнится только один раз

    // Сохраняем selectedItems в cookies при их изменении
    useEffect(() => {
        if (selectedItems) {
            Cookies.set('selectedItems', JSON.stringify(selectedItems), { expires: 7 }); // Сохраняем на 7 дней
        }
    }, [selectedItems]); // Этот effect выполнится только при изменении selectedItems

    // Загружаем данные, если selectedItems изменились
    useEffect(() => {
        if (isCookiesLoaded) {  // Проверяем, что cookies загружены
            try {
                setText(''); // Очищаем текст перед новой загрузкой
                loadData(); // Загружаем данные
            } catch (e) {
                console.log('Invalid network');
            }
        }
    }, [selectedItems, isCookiesLoaded]); // Зависимость от selectedItems и флага cookiesLoaded

    // Если cookies еще не загружены или текст не загружен, показываем анимацию загрузки
    if (!isCookiesLoaded || !text) {
        return (
            <LoadingAnimation>We are typing your test right now...</LoadingAnimation>
        );
    }

    return (
        <div className='testpage-main'>
            <TestWindow 
                template={{ text: text, selectedItems: selectedItems, setSelectedItems: setSelectedItems }} 
            />
        </div>
    );
});

export default TestPage;
