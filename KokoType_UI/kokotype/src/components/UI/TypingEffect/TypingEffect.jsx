import React, { useState, useEffect, useRef } from "react";
import styles from "./TypingEffect.module.css"; // Модульные стили

const TypingEffect = ({ template }) => {
    const [cursorIndex, setCursorIndex] = useState(0);
    const [words, setWords] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const [isErasing, setIsErasing] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false); // Состояние для мигания курсора
    const typingSpeed = 60;
    const erasingSpeed = 30;
    const textContainerRef = useRef(null);
    const cursorRef = useRef(null);

    // Функция для разбивки текста на слова и символы
    const getTemplateWords = () => {
        const templateText = template?.text || '';
        const words = templateText.split(' ').map((word, index) => {
            if (index < templateText.split(' ').length - 1) {
                return word + ' '; // Добавляем пробел к каждому слову, кроме последнего
            }
            return word; // Последнее слово без пробела
        });

        let currentIndex = 0;
        return words.map((word) => {
            return word.split('').map((char) => ({
                char,
                index: currentIndex++, 
                isTyped: false, // По умолчанию символ еще не напечатан
            }));
        });
    };

    // Инициализация текста
    useEffect(() => {
        if (template && template.text) {
            const splitText = getTemplateWords();
            setWords(splitText);
            setIsVisible(false);
            setCursorIndex(0);
            setShowCursor(false);
            setIsTyping(false);
            setIsErasing(false);
            setIsBlinking(false); // Сбрасываем состояние мигания
        }
    }, [template]);

    // Таймер для печати символов
    useEffect(() => {
        if (!isTyping) return;

        const intervalId = setInterval(() => {
            setWords((prevWords) => {
                const newWords = [...prevWords];
                let newCursorIndex = cursorIndex;

                outer: for (let i = 0; i < newWords.length; i++) {
                    for (let j = 0; j < newWords[i].length; j++) {
                        if (!newWords[i][j].isTyped) {
                            newWords[i][j].isTyped = true;
                            newCursorIndex++;
                            break outer;
                        }
                    }
                }

                if (newCursorIndex >= template.text.length) {
                    newCursorIndex = template.text.length; 
                }

                setCursorIndex(newCursorIndex);
                setShowCursor(true);
                return newWords;
            });

            if (cursorIndex >= template.text.length) {
                clearInterval(intervalId);
                setIsTyping(false);
                setTimeout(() => {
                    setIsErasing(true);
                }, 15000);
                
            }
        }, typingSpeed);

        return () => clearInterval(intervalId);
    }, [cursorIndex, isTyping, template.text.length]);

    // Таймер для стирания текста
    useEffect(() => {
        if (!isErasing) return;

        const intervalId = setInterval(() => {
            setWords((prevWords) => {
                const newWords = [...prevWords];
                let newCursorIndex = cursorIndex;

                outer: for (let i = newWords.length - 1; i >= 0; i--) {
                    for (let j = newWords[i].length - 1; j >= 0; j--) {
                        if (newWords[i][j].isTyped) {
                            newWords[i][j].isTyped = false;
                            newCursorIndex--;
                            break outer;
                        }
                    }
                }

                setCursorIndex(newCursorIndex);

                if (newCursorIndex <= 0) {
                    clearInterval(intervalId);
                    resetTyping(); // Сбрасываем состояние для перезапуска анимации
                }
                return newWords;
            });
        }, erasingSpeed);

        return () => clearInterval(intervalId);
    }, [isErasing, cursorIndex]);

    // Функция для сброса состояния
    const resetTyping = () => {
        setCursorIndex(0);
        setIsErasing(false);
        setIsTyping(false); // Остановить печать
        setIsBlinking(false); // Остановить мигание курсора

        setTimeout(() => {
            if (template && template.text) {
                setIsVisible(true);
                setCursorIndex(0); // Сброс курсора
                setTimeout(() => {
                    setIsTyping(true); // Запуск новой анимации
                }, 100);
            }
        }, 1500);
    };

    // Обновление позиции курсора
    useEffect(() => {
        if (cursorRef.current) {
            const charElements = document.querySelectorAll(`.${styles.char}`);
            const lastCharElement = charElements[cursorIndex - 1];

            if (lastCharElement) {
                const rect = lastCharElement.getBoundingClientRect();
                const containerRect = textContainerRef.current.getBoundingClientRect();

                cursorRef.current.style.top = `${rect.top - containerRect.top}px`;
                if(isTyping) {
                    cursorRef.current.style.left = `${rect.left - containerRect.left + rect.width}px`;
                }
                else {
                cursorRef.current.style.left = `${rect.left - containerRect.left}px`;
                }
            } else if (cursorIndex === 0) {
                cursorRef.current.style.top = `0px`;
                cursorRef.current.style.left = `0px`;
            }
        }
    }, [cursorIndex]);

    // Таймер для показа текста
    useEffect(() => {
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 1500); // Задержка 3 секунды

        const fadeInTimer = setTimeout(() => {
            setIsTyping(true);
        }, 3500); // Задержка 5 секунд для начала печати

        return () => {
            clearTimeout(showTimer);
            clearTimeout(fadeInTimer);
        };
    }, []);

    // Управление миганием курсора
    useEffect(() => {
        if (!isTyping && !isErasing) {
            setIsBlinking(true); // Начинаем мигание, когда не печатаем и не стираем
        } else {
            setIsBlinking(false); // Останавливаем мигание при печати или стирании
        }
    }, [isTyping, isErasing]);

    return (
        <div
            className={`${styles.textContainer} ${isVisible ? styles.fadeIn : styles.fadeOut}`}
            ref={textContainerRef}
        >
            {showCursor && (
                <span
                    className={`${styles.cursor} ${isBlinking ? '' : styles.hidden}`} // Применяем класс для скрытия курсора
                    ref={cursorRef}
                ></span>
            )}
            {isVisible && (
                <div className={styles.typingText}>
                    {words.map((word, wordIndex) => (
                        <span key={wordIndex} className={styles.word}>
                            {word.map((letterData, charIndex) => (
                                <span
                                    key={charIndex}
                                    className={`${styles.char} ${letterData.isTyped ? styles.typed : styles.untyped}`}
                                >
                                    {letterData.char}
                                </span>
                            ))}
                            <span className={styles.space}> </span> {/* Пробел между словами */}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TypingEffect;