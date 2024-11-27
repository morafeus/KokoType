import React, { useState, useRef, useEffect } from "react";
import '../../styles/component/TestWindow.css';
import TestSettings from "../TestSettings_Components/TestSettings";
import ResetButton from '../UI/ResetButton/ResetButton';

const TestWindow = ({ template }) => {
  const [userInput, setUserInput] = useState('');
  const [cursorIndex, setCursorIndex] = useState(0); // Индекс текущего символа
  const [isFinished, setIsFinished] = useState(false); // Статус окончания ввода
  const [wordCount, setWordCount] = useState(0);
  const [lastChar, setLastChar] = useState(''); 
  const [timerId, setTimerId] = useState(null);
  const [startTyping, setStartTyping] =useState(false);

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
  }, [userInput]);

  const handleKeyDown = (e) => {
    if (isFinished) return;
  
   
    const currentWord = getCurrentWord(); // Функция для получения текущего слова
    const expectedChar = template.text[cursorIndex]; // Символ, который находится в тексте на текущем индексе
  
    if (e.key === 'Backspace') {
      if (cursorIndex > 0 && cursorIndex > currentWord.startIndex) {
        // Удаляем символ только если курсор не на начале слова
        setUserInput((prev) => prev.slice(0, -1));
        setCursorIndex((prev) => prev - 1);
        setLastChar(''); // Сбрасываем последний символ при удалении
      }
    } else if (e.key.length === 1 && cursorIndex < template.text.length) {
      if(cursorIndex == 1){
        setStartTyping(true);
      }
      setUserInput((prev) => prev + e.key);
      setCursorIndex((prev) => prev + 1);
     
  
      if (e.key === ' ') {
        // Увеличиваем счетчик слов только если предыдущий символ не пробел и текущий символ в тексте - пробел
        if (lastChar !== ' ' && expectedChar === ' ') {
          setWordCount((prev) => prev + 1);
        }
      }
      
      setLastChar(template.text[cursorIndex]); // Обновляем последний символ
      e.preventDefault();
    }
  };

// Функция для получения текущего слова и его индексов
const getCurrentWord = () => {
  const words = template.text.split(' ');
  let currentIndex = 0;

  for (let i = 0; i < words.length; i++) {
    const wordLength = words[i].length + 1; // +1 для пробела
    if (cursorIndex < currentIndex + wordLength) {
      return {
        word: words[i],
        startIndex: currentIndex,
        endIndex: currentIndex + wordLength - 1, // -1 для исключения пробела
      };
    }
    currentIndex += wordLength;
  }

  return { word: '', startIndex: 0, endIndex: 0 }; // Возвращаем пустое слово, если курсор вне пределов текста
};

  // Функция для разделения текста на слова и буквы, включая пробелы
  const getTemplateWords = () => {
  const templateText = template?.text || '';
  // Разбиваем текст на слова, добавляя пробелы после каждого слова, кроме последнего
  const words = templateText.split(' ').map((word, index) => {
    if (index < templateText.split(' ').length - 1) {
      return word + ' '; // Добавляем пробел к каждому слову, кроме последнего
    }
    return word; // Последнее слово без пробела
  });

  let currentIndex = 0; // Для уникальной индексации каждого символа

  // Преобразуем каждое слово в массив символов
  return words.map((word) => {
    return word.split('').map((char) => ({
      char,
      index: currentIndex++, // Уникальный индекс для каждого символа
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
        const currentChar = userInput[userIndex];

        if (word[j].char === ' ') {
          // Если пробел введен
          if (currentChar === ' ') {
            word[j].isCorrect = 'typed'; // Пробел введен верно
            userIndex++; // Переходим к следующему символу
          } else {
            word[j].isCorrect = 'incorrect-space'; // Пробел введен неверно
            // Не увеличиваем userIndex, чтобы пользователь мог исправить
          }
        } else {
          // Проверяем правильность введенного символа
          word[j].isCorrect = word[j].char === currentChar ? 'typed' : 'incorrect';
          userIndex++;
        }
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
      cursorRef.current.style.top = `${rect.top - containerRect.top + textContainer.scrollTop}px`;
      cursorRef.current.style.visibility = 'visible';

      // Прокрутка текста, если курсор близок к верхнему или нижнему краю контейнера
      const threshold = 30; // Расстояние от края для начала прокрутки
      const textContainerHeight = textContainer.clientHeight;

      // Прокрутка вверх
      if (rect.top - containerRect.top < threshold) {
        textContainer.scrollTop -= 44; // Прокручиваем текст вверх
      }
      // Прокрутка вниз
      if (rect.bottom - containerRect.top > textContainerHeight - threshold) {
        textContainer.scrollTop += 44; // Прокручиваем текст вниз
      }

      
    } else {
      cursorRef.current.style.visibility = 'hidden'; // Прячем курсор, если его позиция не найдена
    }

    // Проверяем, закончил ли пользователь ввод
    if (cursorIndex >= template.text.length) {
      setIsFinished(true);
      refreshText();
    }

  }, [cursorIndex, userInput]); // Обновляем при изменении userInput и cursorIndex

  const resetTimer = () => {
    if (timerId) {
      clearInterval(timerId); // Останавливаем таймер
      setTimerId(null); // Сбрасываем ID таймера
    }
  };

  // Функция для обновления текста компонента
  const refreshText = async () => {
    setUserInput('');
    setCursorIndex(0);
    setStartTyping(false);
    setWordCount(0);
    resetTimer();
    setIsFinished(false); // Сбрасываем статус завершения
    textContainerRef.current.scrollTop = 0;
  };

  return (
    <div className="test-container">
       <TestSettings wordCount={wordCount} refreshText={refreshText} testStatus={isFinished} startTyping={startTyping}/>
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
        <ResetButton onClick={refreshText} style={{marginTop: '30px'}} tabIndex={0} />
      </div>
    </div>
  );
};

export default TestWindow;
