import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import LessonList from "../components/LessonWindow_Components/LessonList/LessonList";
import LessonDetails from "../components/LessonWindow_Components/LessonDetails/LessonDetails";
import MyModal from "../components/UI/ModalWindow/MyModal";
import LessonForm from "../components/UI/LessonForm/LessonForm";
import { CompleteLesson, CreateLesson, DeleteLesson, GetAllLessons } from "../http/lessonAPI";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/UI/LoadingAnimation/LoadingAnimation";
import Context from "../context";

const LessonPage = observer(() => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState([]); // Инициализация как пустой массив
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Стейт для индикатора загрузки

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true); // Устанавливаем флаг загрузки
        const id = context.user.user.Id;
        const data = await GetAllLessons({id},navigate); // Получаем уроки
        setLessons(data || []); // Если данные есть, устанавливаем уроки, иначе пустой массив
      } catch (error) {
        console.error("Error fetching lessons:", error);
        setLessons([]); // В случае ошибки тоже устанавливаем пустой массив
      } finally {
        setLoading(false); // Снимаем флаг загрузки после завершения загрузки данных
      }
    };

    fetchLessons(); // Вызываем асинхронную функцию
  }, [selectedLesson]); // Перезапуск при изменении navigate

  const handleSelectLesson = (lessonId) => {
    setSelectedLesson(lessonId);
  };

  const handleBack = () => {
    setSelectedLesson(null);
  };

  // Обработчик добавления нового урока
  const handleAddLesson = async (lesson) => {
    const data = await CreateLesson(lesson, navigate);
    const newLesson = data.data;
    const newLessonWithPages = {
      ...newLesson,
      pages: newLesson.pages.map((page, index) => ({
        ...page,
        id: `page${Date.now() + index}`, // Уникальный id для страницы
        currentErrors: 0,  // Устанавливаем начальное значение для currentErrors
      })),
    };
    setLessons([...lessons, newLessonWithPages]); // Обновляем список уроков
    setModalVisible(false); // Закрыть модальное окно после добавления урока
  };

  const handleDeleteLesson = async (Id) => {
    const lesson = {Id: Id}
    const data = await DeleteLesson(lesson, navigate);
    const updatedLessons = lessons.filter((lesson) => lesson.id !== Id);
    setLessons(updatedLessons); // Удаляем урок
  };

  // Функция сброса ошибок на странице
  const resetPageErrors = (lessonId, pageId) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              pages: lesson.pages.map((page) =>
                page.id === pageId
                  ? { ...page, currentErrors: 0 }  // Сброс ошибок на текущей странице
                  : page
              ),
            }
          : lesson
      )
    );
  };

  // Функция для увеличения количества ошибок на странице
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
                      currentErrors: page.currentErrors + 1, // Увеличиваем количество ошибок
                    }
                  : page
              ),
            }
          : lesson
      )
    );
  };

  const complete = async() => {
    const id = selectedLesson;
    const userId = context.user.user.Id;
    await CompleteLesson({id, userId}, navigate);
  }

  return (
    <div>
      {loading ? (
        <LoadingAnimation>we are typing your lessons...</LoadingAnimation>
      ) : selectedLesson ? (
        <LessonDetails
          lessonId={selectedLesson}
          pages={lessons.find((lesson) => lesson.id === selectedLesson)?.pages || []}
          onBackToList={handleBack}
          resetPageErrors={resetPageErrors} // Передаем функцию сброса ошибок
          onError={onError} // Передаем функцию для увеличения ошибок
          complete={complete}
        />
      ) : (
        <LessonList
          lessons={lessons} // Уроки передаются в компонент
          onSelectLesson={handleSelectLesson}
          onAddLesson={() => setModalVisible(true)}
          onDeleteLesson={handleDeleteLesson}
        />
      )}

      {/* Модальное окно для добавления нового урока */}
      <MyModal
        visible={modalVisible}
        setVisible={setModalVisible}
        onAccept={() => setModalVisible(false)}
      >
        <LessonForm onSubmit={handleAddLesson} />
      </MyModal>
    </div>
  );
});

export default LessonPage;
