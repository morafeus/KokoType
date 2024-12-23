import React, { useContext, useState } from 'react';
import styles from './UserInfo.module.css';
import MyModal from '../../UI/ModalWindow/MyModal';
import { updateUser } from '../../../http/authAPI';
import Context from '../../../context';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ userName, email, registrateDate }) => {
    const [newUserName, setNewUserName] = useState(userName); // Состояние для нового никнейма
    const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для отображения модального окна

    const context = useContext(Context);
    const navigate = useNavigate();

    // Функция для изменения никнейма
    const handleAccept = () => {
        const id = context.user.user.Id;
        const userName = newUserName;
        updateUser({id, userName }, navigate);
        
        setNewUserName(newUserName); // Обновляем никнейм
        setIsModalVisible(false); // Закрываем модальное окно
    };

    return (
        <div className={styles.userInfo}>
            {/* Контейнер для выравнивания заголовка и кнопки "Change" */}
            <div className={styles.header}>
                <h2>{newUserName}</h2>
                <button onClick={() => setIsModalVisible(true)} className={styles.changeButton}>
                    Change
                </button>
            </div>
            <div className={styles.infoItem}>
                <strong>Email:</strong> <span>{email}</span>
            </div>
            <div className={styles.infoItem}>
                <strong>Registration Date:</strong> <span>{new Date(registrateDate).toLocaleDateString()}</span>
            </div>

            {/* Модальное окно с формой для изменения никнейма */}
            <MyModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
                onAccept={handleAccept}
            >
                <h3>Change your username</h3>
                <form>
                    <label>
                        New Username:
                        <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)} // Обновляем значение нового никнейма
                        />
                    </label>
                </form>
            </MyModal>
        </div>
    );
};

export default UserInfo;
