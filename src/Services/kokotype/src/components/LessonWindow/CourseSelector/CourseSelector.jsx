import React from 'react';
import styles from './CourseSelector.module.css'; // Импортируем модульные стили

const CourseSelector = ({ onSelectCourse, selectedCourse }) => {
  return (
    <div className={styles.courseSelector}>
      <h2 className={styles.title}>Choose the course:</h2>
      <button
        className={`${styles.button} ${selectedCourse === 'English' ? styles.selected : ''}`}
        onClick={() => onSelectCourse('English')}
      >
        English
      </button>
      <button
        className={`${styles.button} ${selectedCourse === 'Russian' ? styles.selected : ''}`}
        onClick={() => onSelectCourse('Russian')}
      >
        Русский
      </button>
      <button
        className={`${styles.button} ${selectedCourse === 'Numbers' ? styles.selected : ''}`}
        onClick={() => onSelectCourse('Numbers')}
      >
        Numbers
      </button>
    </div>
  );
};

export default CourseSelector;