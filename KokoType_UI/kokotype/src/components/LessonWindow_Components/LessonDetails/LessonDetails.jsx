import React, { useState, useEffect } from "react";
import styles from './LessonDetails.module.css';
import MyModal from "../../UI/ModalWindow/MyModal";
import Keyboard from "../../UI/Keyboard/Keyboard";
import { CompleteLesson } from "../../../http/lessonAPI";

const LessonDetails = ({ lessonId, pages, onBackToList, onError, resetPageErrors, complete }) => {
    const [userInput, setUserInput] = useState(""); 
    const [cursorIndex, setCursorIndex] = useState(0); 
    const [isTestFinished, setIsTestFinished] = useState(false); 
    const [modalVisible, setModalVisible] = useState(false); 
    const [currentPageIndex, setCurrentPageIndex] = useState(0); 
    const [currentPages, setCurrentPages] = useState(pages); // Локальное состояние для текущих страниц
    const [completedPages, setCompletedPages] = useState([]); // Массив для отслеживания завершенных страниц
    const currentPage = currentPages[currentPageIndex]; 

    const words = currentPage.text ? currentPage.text.split(" ") : [];



    useEffect(() => {
        setCurrentPages(pages); // Обновляем локальные страницы, если пропсы изменились
        const textarea = document.querySelector("textarea");
        if (textarea) {
            textarea.focus();
        }
        console.log(currentPage);
    }, [pages]);

    const handleKeyDown = (e) => {
        if (isTestFinished) return;

        const inputChar = e.key;

        if (inputChar === "Backspace") {
            if (cursorIndex > 0) {
                setUserInput((prev) => prev.slice(0, -1)); 
                setCursorIndex((prev) => prev - 1); 
            }
            e.preventDefault(); 
            return;
        }

        if (inputChar.length > 1) return;

        const correctChar = currentPage.text[cursorIndex];

        if (inputChar === correctChar) {
            setUserInput((prev) => prev + inputChar); 
            setCursorIndex((prev) => prev + 1); 
        } else {
            if (currentPage.currentErrors < currentPage.errorCount) {
                onError(lessonId, currentPage.id); // Увеличиваем количество ошибок
            } else {
                onError(lessonId, currentPage.id); 
                setIsTestFinished(true); 
                setModalVisible(true); 
            }
            setUserInput((prev) => prev + inputChar);
            setCursorIndex((prev) => prev + 1); 
        }

        e.preventDefault(); 
    };

    const restartTest = () => {
        setUserInput(""); 
        setCursorIndex(0); 
        setIsTestFinished(false);
        resetPageErrors(lessonId, currentPage.id); // Сбрасываем ошибки в родительском компоненте
    };

    const checkInput = () => {
        let userIndex = 0;
        return words.map((word, wordIndex) => {
            const wordWithSpace = wordIndex < words.length - 1 ? word + " " : word;
            return wordWithSpace.split("").map((char, index) => {
                const isCorrect = userInput[userIndex] === char;
                if (isCorrect) {
                    userIndex++;
                    return { char, isCorrect: "typed" };
                } else if (userInput[userIndex] !== char && userInput[userIndex] !== undefined) {
                    userIndex++;
                    return { char, isCorrect: "incorrect" };
                }
                return { char, isCorrect: "untyped" };
            });
        });
    };

    const renderText = () => {
        const wordsWithStyles = checkInput();
        return wordsWithStyles.map((wordLetters, wordIndex) => (
            <span key={wordIndex} className={styles.word}>
                {wordLetters.map((letterData, charIndex) => (
                    <span
                        key={charIndex}
                        className={`${styles.char} ${styles[letterData.isCorrect]}`}
                    >
                        {letterData.char}
                    </span>
                ))}
                {wordIndex < words.length - 1 && (
                    <span className={styles.space}> </span>
                )}
            </span>
        ));
    };

    // Проверка, есть ли на текущей странице неверные символы
    const hasErrorsOnPage = () => {
        // Объединяем слова в строку с пробелами
        const fullText = words.join(" "); // Добавляем пробел между словами
    
        // Сравниваем полученную строку с userInput
        return fullText !== userInput;
    };
    

    // Функция для перехода на следующую страницу
    const goToNextPage = () => {
       
        if (hasErrorsOnPage()) {
            return;
        }
       

        if (currentPageIndex < currentPages.length - 1) {
            setCurrentPageIndex((prevIndex) => prevIndex + 1);
            setUserInput(""); 
            setCursorIndex(0); 
            setIsTestFinished(false); 
            resetPageErrors(lessonId, currentPage.id); // Сбрасываем ошибки при переходе на новую страницу
        } else {
            // Если это последняя страница, показываем модальное окно с поздравлением
            setIsTestFinished(true);
            setModalVisible(true);
        }
    };

    useEffect(() => {
        if (cursorIndex >= currentPage.text.length && currentPage.currentErrors <= currentPage.errorCount) {
            setCompletedPages((prev) => [...prev, currentPageIndex]); // Добавляем текущую страницу в список завершенных
            goToNextPage();
        }
    }, [cursorIndex]);

    const handleBack = () => {
        restartTest(); // Сброс ошибок перед возвратом
        onBackToList(); // Возвращаем пользователя в список уроков
    };

    const checkEnd = () => {
        if(currentPageIndex === currentPages.length - 1)
        {
            if (currentPage.currentErrors === 0) {
                return true;
            }
        
            if (currentPage.currentErrors <= currentPage.errorCount) {
                return true;
            }
        }

        return false;
    };

    

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.buttonContainer}>
                    <button className={styles.backButton} onClick={handleBack}>Back</button>
                </div>

                {/* Отображаем квадратики для каждой страницы */}
                <div className={styles.pageIndicators}>
                    {currentPages.map((page, index) => (
                        <div
                            key={index}
                            className={`${styles.pageIndicator} 
                                ${completedPages.includes(index) ? styles.completed : ''} 
                                ${currentPageIndex === index ? styles.active : ''}`}/>
                    ))}
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.inputArea}>
                    <div className={styles.templateText}>{renderText()}</div>
                    <textarea
                        value={userInput}
                        onKeyDown={handleKeyDown}
                        rows="4"
                        className={styles.textarea}
                        disabled={isTestFinished}
                    />
                    <div className={styles.errorInfo}>
                        Errors Left: {currentPage.errorCount - currentPage.currentErrors}
                    </div>
                </div>
                <Keyboard text={currentPage.text} currentIndex={cursorIndex} />
            </div>

            <MyModal
                visible={modalVisible}
                setVisible={setModalVisible}
                onAccept={() => {
                    setModalVisible(false);
                    restartTest();
                    if(isTestFinished && checkEnd()){
                        handleBack();
                        complete();
                    }
                }}
            >
                {checkEnd() ? (
                    <h3 className={styles.modalTitleGood}>Congratulations! You finished the lesson!</h3>
                ) : (
                    <h3 className={styles.modalTitle}>Mistake! Try again!</h3>
                )}
            </MyModal>
        </div>
    );
};

export default LessonDetails;
