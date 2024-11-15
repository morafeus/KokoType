import React, { useState, useRef, useEffect } from "react";
import '../../styles/component/TestWindow.css';
import ResetButton from '../UI/ResetButton/ResetButton';

const TestWindow = ({ template }) => {
  const [userInput, setUserInput] = useState('');
  const [cursorIndex, setCursorIndex] = useState(0); // Индекс текущего символа
  const [isFinished, setIsFinished] = useState(false); // Статус окончания ввода
  const cursorRef = useRef(null);
  const textareaRef = useRef(null);
  const charRefs = useRef([]); // Массив для рефов символов
  const textContainerRef = useRef(null); // Ссылка на контейнер с текстом (template-text)

  // Скрытое поле ввода
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.focus();
    }
  }, []);

  // Обработка клавиш
  const handleKeyDown = (e) => {
    if (isFinished) return; // Если ввод завершен, игнорируем дальнейшие действия

    if (e.key === 'Backspace') {
      if (cursorIndex > 0) {
        setUserInput((prev) => prev.slice(0, -1)); // Удаление последнего символа
        setCursorIndex((prev) => prev - 1);
      }
    } else if (e.key.length === 1 && cursorIndex < template.text.length) {
      setUserInput((prev) => prev + e.key); // Добавление символа
      setCursorIndex((prev) => prev + 1);
      e.preventDefault(); // Остановка дефолтного поведения
    }
  };

  // Функция для разделения текста на слова и буквы, включая пробелы
  const getTemplateWords = () => {
    const templateText = template?.text || '';
    const wordsWithSpaces = templateText.split(/(\s+)/); // Разбиваем на слова и пробелы

    let currentIndex = 0;  // Для уникальной индексации каждого символа

    // Преобразуем каждое слово в массив символов и пробелов
    return wordsWithSpaces.map((word) => {
      return word.split('').map((char) => ({
        char,
        index: currentIndex++,  // Уникальный индекс для каждого символа
        isCorrect: null, // По умолчанию символ еще не проверен
      }));
    });
  };

  // Функция для проверки символов и обновления их состояния
  const checkInput = () => {
    const words = getTemplateWords();
    let userIndex = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      for (let j = 0; j < word.length; j++) {
        if (userIndex < userInput.length) {
          if (word[j].char === ' ' && userInput[userIndex] !== ' ') {
            // Если пробел введен неверно
            word[j].isCorrect = 'incorrect-space';
          } else {
            word[j].isCorrect = word[j].char === userInput[userIndex] ? 'typed' : 'incorrect';
          }
          userIndex++;
        } else {
          word[j].isCorrect = 'untyped'; // Если символ не введен
        }
      }
    }
    return words;
  };

  // Отображаем текст с буквами
  const renderText = () => {
    const words = checkInput(); // Проверяем текст
    return words.map((wordLetters, wordIndex) => (
      <span key={wordIndex} className="word">
        {wordLetters.map((letterData, charIndex) => (
          <span
            key={charIndex}
            className={`char ${letterData.isCorrect}`} // Применяем соответствующий стиль
            ref={(el) => {
              // Уникальные индексы для рефов (с учетом пробелов)
              charRefs.current[letterData.index] = el;
            }}
          >
            {letterData.char}
          </span>
        ))}
      </span>
    ));
  };

  // Функция для управления позицией курсора
  const getCursorPosition = () => {
    const words = getTemplateWords();
    let userIndex = cursorIndex;

    // Находим символ, к которому должен быть привязан курсор
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words[i].length; j++) {
        if (words[i][j].index === userIndex) {
          return words[i][j].index;
        }
      }
    }
    return -1; // Если позиция не найдена
  };

  // Отображаем курсор
  useEffect(() => {
    const cursorPosition = getCursorPosition();
    const charElement = charRefs.current[cursorPosition];
    const textContainer = textContainerRef.current;

    if (cursorRef.current && charElement) {
      const rect = charElement.getBoundingClientRect();
      const containerRect = textContainer.getBoundingClientRect();

      // Учитываем смещение родительского контейнера
      cursorRef.current.style.left = `${rect.left - containerRect.left}px`;
      cursorRef.current.style.top = `${rect.top - containerRect.top}px`;
      cursorRef.current.style.visibility = 'visible';

      // Прокрутка текста, если курсор близок к верхнему или нижнему краю контейнера
      const threshold = 30; // Расстояние от края для начала прокрутки
      const textContainerHeight = textContainer.clientHeight;

      // Прокрутка вверх
      if (rect.top - containerRect.top < threshold) {
        textContainer.scrollTop -= 12; // Прокручиваем текст вверх
      }
      // Прокрутка вниз
      if (rect.bottom - containerRect.top > textContainerHeight - threshold) {
        textContainer.scrollTop += 12; // Прокручиваем текст вниз
      }

      // Обновляем позицию курсора с учетом прокрутки
      cursorRef.current.style.top = `${rect.top - containerRect.top + textContainer.scrollTop}px`;
    } else {
      cursorRef.current.style.visibility = 'hidden'; // Прячем курсор, если его позиция не найдена
    }

    // Проверяем, закончил ли пользователь ввод
    if (cursorIndex >= template.text.length) {
      setIsFinished(true); // Устанавливаем статус завершения
    }

  }, [cursorIndex, userInput]); // Обновляем при изменении userInput и cursorIndex

  // Функция для обновления текста компонента
  const refreshText = async () => {
    setUserInput('');
    setCursorIndex(0);
    setIsFinished(false); // Сбрасываем статус завершения
  };

  return (
    <div className="test-container">
      <div className="test-window">
        {/* Скрытое поле ввода */}
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
        <ResetButton onClick={refreshText} />
      </div>
    </div>
  );
};

export default TestWindow;
