import React, { useContext, useRef } from "react";
import styles from "./LessonList.module.css"; // Импортируем модуль стилей
import Context from "../../../context";

const LessonList = ({ lessons, onSelectLesson, onDeleteLesson, onAddLesson, selectedLessonId, onBack, selectedCourse}) => {
  const context = useContext(Context);
  
  // Создаем объект для хранения ссылок на уроки
  const lessonRefs = useRef({});

  const handleDelete = (lessonId) => {
    onDeleteLesson(lessonId);
  };

  const handleAddLesson = () => {
    onAddLesson();
  };

  const handleSelect = (lessonId) => {
    if (selectedLessonId === lessonId) {
      onBack();
    } else {
      onSelectLesson(lessonId);
    }
  };

  const handleCloseClick = (lessonId) => {
    const lessonElement = lessonRefs.current[lessonId]; // Получаем элемент по ID
    if (lessonElement) {
      lessonElement.classList.add(styles.shake); // Добавляем класс анимации

      setTimeout(() => {
        lessonElement.classList.remove(styles.shake); // Убираем класс анимации
      }, 500); // Время анимации должно совпадать с CSS
    }
  };

  const filteredLessons = selectedCourse
    ? lessons.filter(lesson => lesson.language === selectedCourse)
    : lessons;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.heading} onClick={onBack}>Lesson List</h2>
        {context.user.user.Role === "Admin" && (
          <button className={styles.addButton} onClick={handleAddLesson}>
            Add New Lesson
          </button>
        )}
      </div>
      {selectedCourse ? (
        <>
          <ul className={styles.list}>
            {filteredLessons.map((lesson, index) => {
              let lessonClass = styles.available; // По умолчанию доступный

              if (lesson.status === 'done') {
                lessonClass = styles.done; // Зеленый для завершенных
              } else if (lesson.status === 'close') {
                lessonClass = styles.close; // Серый для закрытых
              }

              const selectedClass = selectedLessonId === lesson.id ? styles.selected : '';
              const inactiveClass = selectedLessonId && selectedLessonId !== lesson.id ? styles.inactive : '';
              const noHoverDescriptionClass = selectedLessonId === lesson.id ? styles.noHoverDescription : ''; // Условие для исключения hover на описании

              return (
                <li
                  key={lesson.id}
                  ref={(el) => (lessonRefs.current[lesson.id] = el)} // Сохраняем ссылку на элемент
                  className={`${styles.listItem} ${lessonClass} ${selectedClass} ${inactiveClass} ${noHoverDescriptionClass}`} // Добавляем условный класс
                  onClick={() => {
                    if (lesson.status === 'close') {
                      handleCloseClick(lesson.id); // Обрабатываем клик по закрытому уроку
                    } else {
                      handleSelect(lesson.id);
                    }
                  }}
                >
                  <div>
                    {selectedLessonId === lesson.id ? (
                      <button className={styles.backButton} onClick={onBack}>
                        Back
                      </button>
                    ) : (
                      <button className={styles.button}>
                        {index + 1}. {lesson.name}
                      </button>
                    )}
                    {context.user.user.Role === "Admin" && (
                      <button
                        className={styles.deleteButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(lesson.id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  {context.user.user.Role !== "Admin" && lesson.status !== 'close' && (
                    <p className={styles.description}>{lesson.description}</p>
                  )}
                </li>
              );
            })}
          </ul>
          {filteredLessons.length === 0 && <p>No lessons available</p>}
        </>
      ) : (
        <p>Please select a course.</p>
      )}
    </div>
  );
};

export default LessonList;
