import React, { useContext } from "react";
import styles from "./LessonList.module.css"; // Импортируем модуль стилей
import Context from "../../../context";

const LessonList = ({ lessons, onSelectLesson, onDeleteLesson, onAddLesson, selectedLessonId, onBack, selectedCourse }) => {
  const context = useContext(Context);

  const handleDelete = (lessonId) => {
    onDeleteLesson(lessonId); // Удаление урока
  };

  const handleAddLesson = () => {
    onAddLesson(); // Добавление нового урока
  };

  const handleSelect = (lessonId) => {
    if (selectedLessonId === lessonId) {
      onBack(); // Вызов функции handleBack только если повторно нажали на выбранный урок
    } else {
      onSelectLesson(lessonId); // Выбор нового урока
    }
  };

  // Фильтруем уроки по выбранному курсу
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
              const selectedClass = selectedLessonId === lesson.id ? styles.selected : '';
              const inactiveClass = selectedLessonId && selectedLessonId !== lesson.id ? styles.inactive : '';

              return (
                <li key={lesson.id} className={`${styles.listItem} ${selectedClass} ${inactiveClass}`} onClick={() => {
                  // Блокируем выбор, если уже выбран урок
                  if (selectedLessonId && selectedLessonId !== lesson.id) {
                    return; // Не выполняем выбор, если уже выбран другой урок
                  }
                  handleSelect(lesson.id);
                }}>
                  <div>
                    {selectedLessonId === lesson.id ? (
                      <button className={styles.backButton} onClick={onBack}>
                        Back
                      </button>
                    ) : (
                      <button className={styles.button}>
                        {index + 1}. {lesson.name} {/* Нумерация уроков */}
                      </button>
                    )}
                    {context.user.user.Role === "Admin" && (
                      <button
                        className={styles.deleteButton}
                        onClick={(e) => { 
                          e.stopPropagation(); // Останавливаем всплытие события для кнопки удаления
                          handleDelete(lesson.id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  {context.user.user.Role !== "Admin" && (
                  <p className={styles.description}>{lesson.description}</p>
                  )}
                </li>
              );
            })}
          </ul>
          {filteredLessons.length === 0 && <p>No lessons available</p>} {/* Сообщение, если нет уроков */}
        </>
      ) : (
        <p>Please select a course.</p> // Сообщение, если курс не выбран
      )}
    </div>
  );
};

export default LessonList;