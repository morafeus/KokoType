import React, { useState, useEffect } from "react";
import styles from './LessonDetails.module.css';
import MyModal from "../../UI/ModalWindow/MyModal";
import Keyboard from "../../UI/Keyboard/Keyboard";
import NumberKeyboard from "../../UI/NumberKeyboard/NumberKeyboard"; // Import your NumberKeyboard
import DescriptionModal from "../DescriptionModal/DescriptionModal";

const LessonDetails = ({ lesson, pages, onBackToList, onError, resetPageErrors, complete, userInput, setUserInput }) => {
    const [cursorIndex, setCursorIndex] = useState(0);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [currentPages, setCurrentPages] = useState(pages);
    const [completedPages, setCompletedPages] = useState([]);
    const [showLesson, setShowLesson] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    const currentPage = currentPages[currentPageIndex];

    useEffect(() => {
        setCurrentPages(pages);
        const textarea = document.querySelector("textarea");
        if (textarea) {
            textarea.focus();
        }
    }, [pages, currentPageIndex]);

    useEffect(() => {
        if (currentPage.description) {
            setShowDescription(true);
            setShowLesson(false);
        } else {
            setShowLesson(true);
            setShowDescription(false);
        }
    }, [currentPageIndex]);

    const handleStartLesson = () => {
        setShowLesson(true);
        setShowDescription(false);
    };

    const handleKeyDown = (e) => {
        if (!showLesson || isTestFinished) return;

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
                onError(lesson.id, currentPage.id);
            } else {
                onError(lesson.id, currentPage.id);
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
        resetPageErrors(lesson.id, currentPage.id);
    };

    const checkInput = () => {
        let userIndex = 0;
        return currentPage.text.split(" ").map((word, wordIndex) => {
            const wordWithSpace = wordIndex < currentPage.text.split(" ").length - 1 ? word + " " : word;
            return wordWithSpace.split("").map((char) => {
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
                {wordIndex < wordsWithStyles.length - 1 && (
                    <span className={styles.space}> </span>
                )}
            </span>
        ));
    };

    const hasErrorsOnPage = () => {
        const fullText = currentPage.text.split(" ").join(" ");
        return fullText !== userInput;
    };

    const goToNextPage = () => {
        if (hasErrorsOnPage()) {
            return;
        }

        if (currentPageIndex < currentPages.length - 1) {
            setCurrentPageIndex((prevIndex) => prevIndex + 1);
            setUserInput("");
            setCursorIndex(0);
            setIsTestFinished(false);
            resetPageErrors(lesson.id, currentPage.id);
        } else {
            setIsTestFinished(true);
            setModalVisible(true);
        }
    };

    useEffect(() => {
        if (cursorIndex >= currentPage.text.length && currentPage.currentErrors <= currentPage.errorCount) {
            setCompletedPages((prev) => [...prev, currentPageIndex]);
            goToNextPage();
        }
    }, [cursorIndex]);

    const handleBack = () => {
        resetPageErrors(lesson.id, currentPage.id);
        onBackToList();
    };

    const checkEnd = () => {
        return currentPageIndex === currentPages.length - 1 && (currentPage.currentErrors === 0 || currentPage.currentErrors <= currentPage.errorCount);
    };

    return (
        <div className={styles.container}>
            {showDescription ? (
                <DescriptionModal text={currentPage.description} onClose={handleStartLesson}/>
            ) : (
                <>
                    <div className={styles.sidebar}>
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
                                Errors Left: {currentPage.errorCount >= currentPage.currentErrors ? currentPage.errorCount - currentPage.currentErrors : 0}
                            </div>
                        </div>

                        {lesson.language === 'Numbers' ? (
                            <NumberKeyboard
                                text={currentPage.text} // Pass the text from the current page
                                currentIndex={cursorIndex} // Pass the current index
                                onNumberClick={(num) => {
                                    setUserInput((prev) => prev + num);
                                    setCursorIndex((prev) => prev + 1);
                                }}
                            />
                        ) : (
                            <Keyboard text={currentPage.text} currentIndex={cursorIndex} language={lesson.language} />
                        )}
                    </div>

                    <MyModal
                        visible={modalVisible}
                        setVisible={setModalVisible}
                        onAccept={() => {
                            setModalVisible(false);
                            restartTest();
                            if (isTestFinished && checkEnd()) {
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
                </>
            )}
        </div>
    );
};

export default LessonDetails;