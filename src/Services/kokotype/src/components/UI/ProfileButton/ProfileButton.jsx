import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './ProfileButton.module.css'; // Импортируем стили
import AuthContext from '../../../context';

const ProfileButton = observer(() => {
    const { user } = useContext(AuthContext);
    const [profileInfo, setProfileInfo] = useState({
        userLvl: user.user.UserLvl || 0,
        userName: user.user.UserName || '',
        progress: 0, // Изначально устанавливаем прогресс в 0
    });
    const [prevExp, setPrevExp] = useState(user.user.UserExp || 0);
    const [prevLevel, setPrevLevel] = useState(profileInfo.userLvl);
    const [isLevelChanged, setIsLevelChanged] = useState(false);
    const [isProgressChanged, setIsProgressChanged] = useState(false);
    const [newExp, setNewExp] = useState(0);

    useEffect(() => {
        if (user.user) {
            const userLvl = user.user.UserLvl || 0;
            const userExp = user.user.UserExp || 0;
            const maxExp = user.user.MaxExp || 0;

            const progress = Math.min((userExp / maxExp) * 100, 100); // Ограничиваем до 100%
            setProfileInfo({
                userLvl,
                userName: user.user.UserName || '',
                progress,
            });

            // Проверяем изменение уровня
            if (userLvl !== prevLevel) {
                setIsLevelChanged(true);
                setPrevLevel(userLvl);
                setTimeout(() => setIsLevelChanged(false), 1000); // Сброс после 1 секунды
            }

            // Проверяем изменение опыта
            if (userExp !== prevExp) {
                const expDifference = userExp - prevExp; // Разница опыта
                setNewExp(expDifference); // Устанавливаем новое количество опыта
                setIsProgressChanged(true);
                setPrevExp(userExp);
                setTimeout(() => setIsProgressChanged(false), 1500); // Сброс после 1.5 секунды
            }
        }
    }, [user.user, prevExp, prevLevel]); 

    return (
        <div className={styles.profileContainer}>
            <div className={styles.userInfo}>
                <span className={`${styles.userLevel} ${isLevelChanged ? styles.levelChanged : ''}`}>
                    {profileInfo.userLvl} lvl
                </span>
                <span className={styles.userName}>{profileInfo.userName}</span>
            </div>
            <div className={styles.progressBar}>
                <div 
                    className={`${styles.progress} ${isProgressChanged ? styles.progressChanged : ''}`} 
                    style={{ width: `${profileInfo.progress}%` }} 
                />
                {isProgressChanged && newExp > 0 && ( // Показываем expAmount только если опыт положительный
                    <span className={styles.expAmount}>+{newExp}</span>
                )}
            </div>
        </div>
    );
});

export default ProfileButton;