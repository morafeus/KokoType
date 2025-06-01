import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import LessonList from "../components/LessonWindow/LessonList/LessonList";
import LessonDetails from "../components/LessonWindow/LessonDetails/LessonDetails";
import LessonForm from "../components/UI/LessonForm/LessonForm";
import CourseSelector from "../components/LessonWindow/CourseSelector/CourseSelector"; 
import { CompleteLesson, CreateLesson, DeleteLesson, GetAllLessons } from "../http/lessonAPI";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/UI/LoadingAnimation/LoadingAnimation";
import Context from "../context";
import '../styles/page/LessonPage.css'; 
import { addUserAchive } from "../http/authAPI";

const LessonPage = observer(() => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [attempts, setAttempts] = useState(0); // Состояние для отслеживания попыток
  const [shouldFetch, setShouldFetch] = useState(false); // Состояние для инициирования запроса

  // Функция для загрузки уроков
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

  useEffect(()=> {
    setShouldFetch(true);
  }, [navigate])

  // useEffect, который зависит от состояния shouldFetch
  useEffect(() => {
    if (shouldFetch) {
      fetchLessons(); // Запрос на обновление списка уроков
      setShouldFetch(false); // Сбрасываем флаг после выполнения запроса
    }
  }, [shouldFetch]); // Зависимость от shouldFetch

  // Обработчик завершения урока
  const complete = async () => {
    const id = selectedLesson.id;
    const userId = context.user.user.Id;
    const details = `${attempts}`;
    const lesson = selectedLesson.last;

    // Завершаем урок
    await CompleteLesson({ id, userId, details }, navigate);
    if(lesson == null)
    {
      await addUserAchive({userId, achiveName:"Qualified Typist"}, navigate);
    }

    // После завершения обновляем статус урока и инициируем запрос
    setShouldFetch(true); // Устанавливаем флаг, чтобы запрос был выполнен
  };

  // Обработчик выбора урока
  const handleSelectLesson = (lessonId) => {
    if (userInput.length > 0) {
      setUserInput("");
    }

    const selectedLessonData = lessons.find((lesson) => lesson.id === lessonId);
    if (selectedLessonData) {
      setSelectedLesson({ id: lessonId, language: selectedLessonData.language, last: selectedLessonData.nextLessonId});
      selectedLessonData.pages.forEach((page) => {
        resetPageErrors(selectedLessonData.id, page.id);
      });
      setAttempts(0); // Сброс попыток при выборе нового урока
    }
  };

  // Обработчик возврата
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
    setShouldFetch(true); // Инициализируем запрос на обновление уроков
  };

  // Обработчик добавления урока
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
    setShouldFetch(true); // Инициализируем запрос на обновление уроков после добавления
  };

  // Обработчик закрытия формы добавления урока
  const handleAddLessonBack = () => {
    setIsFormVisible(false);
  };

  // Обработчик удаления урока
  const handleDeleteLesson = async (Id) => {
    const lesson = { Id: Id };
    await DeleteLesson(lesson, navigate);
    setLessons(lessons.filter((lesson) => lesson.id !== Id)); // Убираем удаленный урок
    setShouldFetch(true); // Инициализируем запрос на обновление уроков после удаления
  };

  // Сброс ошибок страницы
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
    setAttempts((prevAttempts) => prevAttempts + 1); // Увеличиваем количество попыток
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

  // Обработчик выбора курса
  const handleSelectCourse = (course) => {
    setSelectedCourse(course); 
    setShouldFetch(true); // Инициализируем запрос на обновление уроков при изменении курса
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
                    selectedCourse={selectedCourse}
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
