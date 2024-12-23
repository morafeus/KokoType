import React, { useState } from "react";
import styles from './LessonForm.module.css';
import toastr from 'toastr'; // Импортируем toastr
import 'toastr/build/toastr.min.css'; // Импортируем стили для toastr

const LessonForm = ({ onSubmit, onClose }) => {
  const [lessonName, setLessonName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("English");
  const [pages, setPages] = useState([{ title: "", text: "", errorCount: 0 }]);

  // Добавить новую страницу
  const handleAddPage = () => {
    setPages([...pages, { title: "", text: "", errorCount: 0 }]);
  };

  // Обработчик изменений в полях страницы
  const handlePageChange = (index, field, value) => {
    const newPages = [...pages];
    newPages[index][field] = value;
    setPages(newPages);
  };

  // Обработчик удаления страницы
  const handleRemovePage = (index) => {
    const newPages = pages.filter((_, i) => i !== index);
    setPages(newPages);
  };

  // Функция для отправки данных формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем, есть ли страницы
    if (pages.length === 0 || pages.some(page => page.title === "" || page.text === "")) {
      toastr.error("Please add at least one page with a title and text."); // Выводим ошибку через toastr
      return;
    }

    const newLesson = {
      id: Date.now(),
      name: lessonName,
      description: description,
      language: language,
      pages: pages,
    };

    // Передаем новый урок в родительский компонент
    onSubmit(newLesson);

    // Очищаем все поля после отправки
    setLessonName("");
    setDescription("");
    setLanguage("English");
    setPages([{ title: "", text: "", errorCount: 0 }]);

    toastr.success("Lesson saved successfully!"); // Сообщение об успешном сохранении
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formHeader}>Add New Lesson</h2>

      <div className={styles.inputGroupFull}>
        {/* Название и язык на одной строке */}
        <div className={styles.inputGroup}>
          <label htmlFor="lessonName" className={styles.label}>Lesson Name:</label>
          <input
            id="lessonName"
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="language" className={styles.label}>Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={styles.select}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>

      {/* Описание на новой строке, лейбл над полем */}
      <div className={styles.inputGroupFullDesc}>
        <label htmlFor="description" className={styles.label}>Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          required
        />
      </div>

      {/* Секция страниц */}
      <div className={styles.pagesContainerWrapper}>
        <h3 className={styles.pagesContainerHeader}>Pages</h3>
        <div className={styles.pagesContainer}>
          {pages.map((page, index) => (
            <div key={index} className={styles.pageForm}>
              <div className={styles.inputGroupFull}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Page Title:</label>
                  <input
                    type="text"
                    value={page.title}
                    onChange={(e) =>
                      handlePageChange(index, "title", e.target.value)
                    }
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Error Count:</label>
                  <input
                    type="number"
                    value={page.errorCount}
                    onChange={(e) =>
                      handlePageChange(index, "errorCount", +e.target.value)
                    }
                    className={styles.input}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Page Text:</label>
                <textarea
                  value={page.text}
                  onChange={(e) =>
                    handlePageChange(index, "text", e.target.value)
                  }
                  className={styles.textarea}
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemovePage(index)}
                className={`${styles.button} ${styles.removePageButton}`}
              >
                Remove Page
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddPage}
          className={`${styles.button} ${styles.addPageButton}`}
        >
          Add Page
        </button>
      </div>

      <div className={styles.buttonContainer}>
        <button type="submit" className={`${styles.button} ${styles.acceptButton}`}>
          Save Lesson
        </button>
      </div>
    </form>
  );
};

export default LessonForm;
