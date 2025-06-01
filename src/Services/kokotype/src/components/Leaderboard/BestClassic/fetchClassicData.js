// fetchClassicData.js
import { fetchClassic } from '../../../http/testAPI';
import { fetchUsers } from '../../../http/authAPI';

export const fetchClassicData = async (navigate, currentUserId) => {
    try {
        // Получаем классические результаты
        const allClassicScores = await fetchClassic(navigate);
        // Получаем всех пользователей
        const userList = await fetchUsers(navigate);
        
        const userMap = userList.reduce((acc, user) => {
            acc[user.id] = user.userName; // Создаем объект с userId как ключом и userName как значением
            return acc;
        }, {});

        // Добавляем поля username в результаты
        const classicScoresWithUsernames = allClassicScores.map(score => ({
            ...score,
            userName: userMap[score.userId] || '-'
        }));

        // Сортируем по expCount и присваиваем ранги
        classicScoresWithUsernames.sort((a, b) => b.expCount - a.expCount);
        const finalScores = classicScoresWithUsernames.map((score, index) => ({
            rank: index + 1,
            ...score
        }));

        // Находим лучший результат текущего пользователя
        const currentUserScore = finalScores.find(score => score.userId === currentUserId);
        
        return { finalScores, currentUserScore };
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return { finalScores: [], currentUserScore: null }; // Возвращаем пустые результаты в случае ошибки
    }
};