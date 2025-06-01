import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import TestWindow from '../components/TestWindow/TestWindow';
import LoadingAnimation from '../components/UI/LoadingAnimation/LoadingAnimation';
import Context from '../context';
import { fetchTest } from '../http/testAPI';
import Cookies from 'js-cookie'; 
import '../styles/page/TestPage.css';

const TestPage = observer(() => {
    const context = useContext(Context);
    const [text, setText] = useState('');
    const [selectedItems, setSelectedItems] = useState({
        section1: [],
        section2: "words",
        section3: "15",
        selectedLanguage: "English",
        selectedDifficulty: "medium"
    });

    const [isCookiesLoaded, setIsCookiesLoaded] = useState(false); 

    const loadData = async () => {
        const options = {
            Options: selectedItems.section1,
            TextType: selectedItems.section2,
            Limit: selectedItems.section3,
            Language: selectedItems.selectedLanguage,
            Difficulty: selectedItems.selectedDifficulty
        };
        let data;
        if (context.test.testStats.text != null) {
            data = context.test.testStats.text;
            context.test.setTestStats({});
        } else {
            data = await fetchTest(options); 
        }

        if (Array.isArray(data)) {
            const formattedText = data.join(' ');
            setText(formattedText); 
        } else {
            setText(data); 
        }
    };

    useEffect(() => {
        const savedSelectedItems = Cookies.get('selectedItems');
        if (savedSelectedItems) {
            const parsedItems = JSON.parse(savedSelectedItems);
            if (JSON.stringify(parsedItems) !== JSON.stringify(selectedItems)) {
                setSelectedItems(parsedItems);
            }
        }
        setIsCookiesLoaded(true); 
    }, []);

    useEffect(() => {
        if (selectedItems) {
            Cookies.set('selectedItems', JSON.stringify(selectedItems), { expires: 7 }); 
        }
    }, [selectedItems]); 

    useEffect(() => {
        if (isCookiesLoaded) { 
            try {
                setText('');
                loadData(); 
            } catch (e) {
                console.log('Invalid network');
            }
        }
    }, [selectedItems, isCookiesLoaded]); 

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
