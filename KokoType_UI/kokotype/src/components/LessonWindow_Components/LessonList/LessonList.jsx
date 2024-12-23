import React, { useContext } from "react";
import styles from "./LessonList.module.css"; // Импортируем модуль стилей
import Context from "../../../context";

const LessonList = ({ lessons, onSelectLesson, onDeleteLesson, onAddLesson }) => {
  const context = useContext(Context);

  const handleDelete = (lessonId) => {
    onDeleteLesson(lessonId); // Удаление урока
  };

  const handleAddLesson = () => {
    onAddLesson(); // Добавление нового урока
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Lesson List</h2>
      {/* Если роль пользователя 'Admin', показываем кнопки для добавления */}
      {context.user.user.Role === "Admin" && (
        <button className={styles.addButton} onClick={handleAddLesson}>
          Add New Lesson
        </button>
      )}
      <ul className={styles.list}>
        {lessons.map((lesson) => {
          const lessonStatusClass =
            lesson.status === "done" && styles.doneLesson;

          return (
            <li key={lesson.id} className={`${styles.listItem} ${lessonStatusClass}`}>
              <button
                className={styles.button}
                onClick={() => onSelectLesson(lesson.id)}
              >
                {lesson.name}
              </button>
              <p className={styles.description}>{lesson.description}</p> {/* Отображаем описание */}

              {/* Если роль пользователя 'Admin', показываем кнопку для удаления */}
              {context.user.user.Role === "Admin" && (
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(lesson.id)}
                >
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LessonList;
