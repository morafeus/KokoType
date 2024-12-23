import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './ProfileButton.module.css'; // Импортируем стили
import AuthContext from '../../../context';

const ProfileButton = observer(() => {
    const { user } = useContext(AuthContext);
    const [profileInfo, setProfileInfo] = useState({
        userLvl: user.user.UserLvl || 0,
        userName: user.user.UserName || '',
        progress: 0 // Изначально устанавливаем прогресс в 0
    });

    // useEffect для обновления состояния при изменении user
    useEffect(() => {
        if (user.user) {
            const userLvl = user.user.UserLvl || 0;
            const userExp = user.user.UserExp || 0; // Добавление 100 к опыту
            const maxExp = user.user.MaxExp || 0;

            // Расчет прогресса
            const progress = Math.min((userExp / maxExp) * 100, 100); // Ограничиваем до 100%
            setProfileInfo({
                userLvl,
                userName: user.user.UserName || '',
                progress
            });
        }
    }, [user.user]); 

    return (
        <div className={styles.profileContainer}>
            <div className={styles.userInfo}>
                <span className={styles.userLevel}>{profileInfo.userLvl} lvl</span>
                <span className={styles.userName}>{profileInfo.userName}</span>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${profileInfo.progress}%` }} />
            </div>
        </div>
    );
});

export default ProfileButton;