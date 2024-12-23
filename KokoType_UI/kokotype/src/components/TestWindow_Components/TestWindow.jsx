import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../context";
import { updateLvl } from "../../http/authAPI";
import { setResult } from "../../http/testAPI";
import '../../styles/component/TestWindow.css';
import All_Routes from "../../utils/consts";
import TestSettings from "../TestSettings_Components/TestSettings";
import ResetButton from '../UI/ResetButton/ResetButton';

const TestWindow = ({ template }) => {
    const context = useContext(Context);
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState('');
    const [cursorIndex, setCursorIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [errorWords, setErrorWords] = useState([]);

    const cursorRef = useRef(null);
    const textareaRef = useRef(null);
    const charRefs = useRef([]);
    const textContainerRef = useRef(null);
    
    const elapsedTimeRef = useRef(0); // Ссылаемся на время через useRef
    const timerIdRef = useRef(null);  // Храним идентификатор таймера

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.focus();
        }
    }, [userInput]);

    const handleKeyDown = (e) => {
        if (isFinished) return;

        const currentWord = getCurrentWord();

        if (e.key === 'Backspace') {
            if (cursorIndex > 0 && cursorIndex > currentWord.startIndex) {
                setUserInput((prev) => prev.slice(0, -1));
                setCursorIndex((prev) => prev - 1);
            }
        } else if (e.key.length === 1 && cursorIndex < template.text.length) {
            const currentTypingCount = context.test.isTyping; // Получаем текущее значение
            const newTypingCount = updateTypingCount(currentTypingCount);
            context.test.setIsTyping(newTypingCount); // Устанавливаем новое значение

            const correctChar = template.text[cursorIndex];
            const inputChar = e.key;

            if (inputChar === ' ') {
                if (correctChar === ' ') {
                    setUserInput((prev) => prev + inputChar);
                    setCursorIndex((prev) => prev + 1);
                    setWordCount((prev) => prev + 1);
                } else {
                    setErrorCount((prev) => prev + 1);
                    setUserInput((prev) => prev + inputChar);
                    setCursorIndex((prev) => prev + 1);
                    const currentErrorWord = currentWord.word;
                    if (!errorWords.includes(currentErrorWord)) {
                        setErrorWords((prev) => [...prev, currentErrorWord]);
                    }
                }
            } else {
                if (inputChar === correctChar) {
                    setUserInput((prev) => prev + inputChar);
                    setCursorIndex((prev) => prev + 1);
                } else {
                    setErrorCount((prev) => prev + 1); // Увеличиваем счетчик ошибок
                    setUserInput((prev) => prev + inputChar);
                    setCursorIndex((prev) => prev + 1);

                    const currentErrorWord = currentWord.word;
                    if (!errorWords.includes(currentErrorWord)) {
                        setErrorWords((prev) => [...prev, currentErrorWord]);
                    }
                }
            }

            e.preventDefault();
        }
    };

    const updateTypingCount = (prev) => {
        const newValue = prev + 1; 
        if (newValue === 1) {
            startTimer(); // Начинаем таймер при первом вводе
        }
        return newValue;
    };

    const startTimer = () => {
        const startTime = Date.now();
        timerIdRef.current = setInterval(() => {
            elapsedTimeRef.current = Date.now() - startTime; // Обновляем время с использованием useRef
        }, 100);
    };

    const stopTimer = () => {
        if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        }
        console.log(`Time taken: ${elapsedTimeRef.current / 1000} seconds`);
    };

    const getCurrentWord = () => {
        const words = template.text.split(' ');
        let currentIndex = 0;

        for (let i = 0; i < words.length; i++) {
            const wordLength = words[i].length + 1;
            if (cursorIndex < currentIndex + wordLength) {
                return {
                    word: words[i],
                    startIndex: currentIndex,
                    endIndex: currentIndex + wordLength - 1,
                };
            }
            currentIndex += wordLength;
        }

        return { word: '', startIndex: 0, endIndex: 0 };
    };

    const getTemplateWords = () => {
        const templateText = template?.text || '';
        const words = templateText.split(' ').map((word, index) => {
            if (index < templateText.split(' ').length - 1) {
                return word + ' ';
            }
            return word;
        });

        let currentIndex = 0;

        return words.map((word) => {
            return word.split('').map((char) => ({
                char,
                index: currentIndex++,
                isCorrect: null,
            }));
        });
    };

    const checkInput = () => {
        const words = getTemplateWords();
        let userIndex = 0;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            for (let j = 0; j < word.length; j++) {
                if (userIndex < userInput.length) {
                    const currentChar = userInput[userIndex];

                    // Проверка для пробелов
                    if (word[j].char === ' ' && currentChar === ' ') {
                        word[j].isCorrect = 'typed'; // Пробел введен правильно
                    } else if (word[j].char === currentChar) {
                        word[j].isCorrect = 'typed'; // Правильный символ
                    } else {
                        // Если это пробел, который введен неверно
                        if (word[j].char === ' ') {
                            word[j].isCorrect = 'incorrect-space'; // Неверный пробел
                        } else {
                            word[j].isCorrect = 'incorrect'; // Неверный символ
                        }
                    }
                    userIndex++;
                } else {
                    word[j].isCorrect = 'untyped'; // Если символ еще не введен
                }
            }
        }

        return words;
    };

    const renderText = () => {
        const words = checkInput();
        return words.map((wordLetters, wordIndex) => (
            <span key={wordIndex} className="word">
                {wordLetters.map((letterData, charIndex) => (
                    <span
                        key={charIndex}
                        className={`char ${letterData.isCorrect}`}
                        ref={(el) => {
                            charRefs.current[letterData.index] = el;
                        }}
                    >
                        {letterData.char}
                    </span>
                ))}
            </span>
        ));
    };

    const getCursorPosition = () => {
        const words = getTemplateWords();
        let userIndex = cursorIndex;

        for (let i = 0; i < words.length; i++) {
            for (let j = 0; j < words[i].length; j++) {
                if (words[i][j].index === userIndex) {
                    return words[i][j].index;
                }
            }
        }
        return -1;
    };

    useEffect(() => {
        const cursorPosition = getCursorPosition();
        const charElement = charRefs.current[cursorPosition];
        const textContainer = textContainerRef.current;

        if (cursorRef.current && charElement) {
            const rect = charElement.getBoundingClientRect();
            const containerRect = textContainer.getBoundingClientRect();

            cursorRef.current.style.left = `${rect.left - containerRect.left}px`;
            cursorRef.current.style.top = `${rect.top - containerRect.top}px`;
            cursorRef.current.style.top = `${rect.top - containerRect.top + textContainer.scrollTop}px`;
            cursorRef.current.style.visibility = 'visible';

            const threshold = 30;
            const textContainerHeight = textContainer.clientHeight;

            if (rect.top - containerRect.top < threshold) {
                textContainer.scrollTop -= 44;
            }
            if (rect.bottom - containerRect.top > textContainerHeight - threshold) {
                textContainer.scrollTop += 44;
            }

        } else {
            cursorRef.current.style.visibility = 'hidden';
        }

        if (cursorIndex >= template.text.length) {
            end();
        }

    }, [cursorIndex, userInput]);

    const end = async () => {
        setIsFinished(true);
        stopTimer();
        await finishText();
    };

    const refreshText = async () => {
        stopTimer(); // Остановите таймер перед сбросом состояния
        setUserInput('');
        setCursorIndex(0);
        context.test.setIsTyping(0);
        setWordCount(0);
        setErrorCount(0); // Сбрасываем счетчик ошибок
        elapsedTimeRef.current = 0; // Сбрасываем время
        setIsFinished(false);
        textContainerRef.current.scrollTop = 0;
    };

    const finishText = async () => {
        context.test.setTestStats({text: template.text, errors: errorCount, time: elapsedTimeRef.current / 1000, errorWords: errorWords});
        console.log(context.user.isAuth);
        if (context.user.isAuth) {
            const id = context.user.user.Id;
            const value = template.text.length * 2 - errorCount * 5 + elapsedTimeRef.current / 1000;
            let exp;
            if (value < 1) {
                exp = 0;
            } else {
                exp = Math.round(value);
            }
            const data = await updateLvl({ id, exp }, navigate);
            if (data) {
                context.user.setUser({
                    Id: data.Id,
                    UserName: data.UserName,
                    UserLvl: data.UserLvl,
                    UserExp: data.UserExp,
                    MaxExp: data.MaxExp,
                    Role: data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                });
            }

            const totalCharacters = template.text.length;
            const accuracy = totalCharacters > 0 ? ((totalCharacters - errorCount) / totalCharacters * 100).toFixed(2) : 0;
            const wordsCount = template.text.split(' ').length;
            const minutes = elapsedTimeRef.current / 1000 / 60;
            const speed = (wordsCount / minutes).toFixed(2);
            const decription = `${template.selectedItems.section2},${template.selectedItems.section3},${template.selectedItems.selectedLanguage},${template.selectedItems.selectedDifficulty}`;
            const errors = errorWords.join(' ');
            const result = await setResult({ userid: id, accuracy, speed, decription, errors }, navigate);
        }
        navigate(All_Routes.RESULT_PAGE);
        await refreshText();
    };

    return (
        <div className="test-container">
            <TestSettings
                wordCount={wordCount}
                refreshText={refreshText}
                finishText={end}
                testStatus={isFinished}
                selectedItems={template.selectedItems}
                setSelectedItems={template.setSelectedItems}
                errorCount={errorCount}
            />
            <div className="test-window">
                <textarea
                    ref={textareaRef}
                    value={userInput}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    className="textarea"
                />
                <div className="template-text" ref={textContainerRef}>
                    {renderText()}
                    <span className="cursor" ref={cursorRef} />
                </div>
                <ResetButton onClick={refreshText} style={{ marginTop: '30px' }} tabIndex={0} />
            </div>
        </div>
    );
};

export default TestWindow;
