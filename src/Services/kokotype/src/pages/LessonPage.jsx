import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import LessonList from "../components/LessonWindow/LessonList/LessonList";
import LessonDetails from "../components/LessonWindow/LessonDetails/LessonDetails";
import LessonForm from "../components/UI/LessonForm/LessonForm";
import CourseSelector from "../components/LessonWindow/CourseSelector/CourseSelector"; // Импортируем новый компонент
import { CompleteLesson, CreateLesson, DeleteLesson, GetAllLessons } from "../http/lessonAPI";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/UI/LoadingAnimation/LoadingAnimation";
import Context from "../context";
import '../styles/page/LessonPage.css'; // Импортируем обычные стили

const LessonPage = observer(() => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userInput, setUserInput] = useState(""); // Состояние для ввода текста
  const [selectedCourse, setSelectedCourse] = useState(null); // Состояние для выбранного курса

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const id = context.user.user.Id;
        const data = await GetAllLessons({ id }, navigate);
        setLessons(data || []);
      } catch (error) {
        console.error("Error fetching lessons:", error);
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [navigate]);

  const handleSelectLesson = (lessonId) => {
    if (userInput.length > 0) {
      setUserInput("");
    }

    const selectedLessonData = lessons.find((lesson) => lesson.id === lessonId);
    if (selectedLessonData) {
      setSelectedLesson({ id: lessonId, language: selectedLessonData.language });
      console.log(selectedLessonData);
      selectedLessonData.pages.forEach((page) => {
        resetPageErrors(selectedLessonData.id, page.id);
      });
    }
  };

  const handleBack = () => {
    if (selectedLesson) {
      const lesson = lessons.find((lesson) => lesson.id === selectedLesson.id);
      if (lesson) {
        lesson.pages.forEach((page) => {
          resetPageErrors(lesson.id, page.id);
        });
      }
    }
    setSelectedLesson(null);
  };

  const handleAddLesson = async (lesson) => {
    const data = await CreateLesson(lesson, navigate);
    const newLesson = data.data;
    const newLessonWithPages = {
      ...newLesson,
      pages: newLesson.pages.map((page, index) => ({
        ...page,
        id: `page${Date.now() + index}`,
        currentErrors: 0,
      })),
    };
    setLessons([...lessons, newLessonWithPages]);
    setIsFormVisible(false);
  };

  const handleAddLessonBack = () => {
    setIsFormVisible(false);
  };

  const handleDeleteLesson = async (Id) => {
    const lesson = { Id: Id };
    await DeleteLesson(lesson, navigate);
    const updatedLessons = lessons.filter((lesson) => lesson.id !== Id);
    setLessons(updatedLessons);
  };

  const complete = async () => {
    const id = selectedLesson.id;
    const userId = context.user.user.Id;
    await CompleteLesson({ id, userId }, navigate);
  };

  const resetPageErrors = (lessonId, pageId) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              pages: lesson.pages.map((page) =>
                page.id === pageId
                  ? { ...page, currentErrors: 0 }
                  : page
              ),
            }
          : lesson
      )
    );
  };

  const onError = (lessonId, pageId) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              pages: lesson.pages.map((page) =>
                page.id === pageId
                  ? {
                      ...page,
                      currentErrors: page.currentErrors + 1,
                    }
                  : page
              ),
            }
          : lesson
      )
    );
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course); 
  };

  return (
    <div className="lesson-page">
      {loading ? (
        <LoadingAnimation>we are typing your lessons...</LoadingAnimation>
      ) : (
        <>
          {isFormVisible ? (
            <LessonForm onSubmit={handleAddLesson} onClose={handleAddLessonBack} />
          ) : (
            <div className="lesson-container">
              <LessonList
                    lessons={lessons}
                    onSelectLesson={handleSelectLesson}
                    onAddLesson={() => setIsFormVisible(true)}
                    onDeleteLesson={handleDeleteLesson}
                    selectedLessonId={selectedLesson ? selectedLesson.id : null}
                    onBack={handleBack}
                    selectedCourse={selectedCourse} // Передаем выбранный курс
                  />
              {selectedLesson ? (
                <LessonDetails
                  lesson={selectedLesson}
                  pages={lessons.find((lesson) => lesson.id === selectedLesson.id)?.pages || []}
                  onBackToList={handleBack}
                  onError={onError}
                  resetPageErrors={resetPageErrors}
                  complete={complete}
                  userInput={userInput}
                  setUserInput={setUserInput}
                />
                ) : (
                  <CourseSelector onSelectCourse={handleSelectCourse} selectedCourse={selectedCourse}/>
                )
              }
                
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default LessonPage;