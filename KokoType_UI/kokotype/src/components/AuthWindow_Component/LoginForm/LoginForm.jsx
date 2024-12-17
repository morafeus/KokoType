import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../../http/authAPI";
import styles from './LoginForm.module.css'; 
import AuthContext from "../../../context";
import toastr from 'toastr'; // Импортируем toastr
import { observer } from "mobx-react-lite";
import All_Routes from "../../../utils/consts";

const LoginForm = observer(() => {
    const [userModel, setUserModel] = useState({ userName: '', password: '' });
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        // Проверка на заполненность полей
        if (!userModel.userName || !userModel.password) {
            toastr.error("Please fill in all fields."); // Уведомление об ошибке
            return;
        }

        const data = await fetchUser(userModel);
        
        if (data) {
            user.setUser({
                Id: data.Id,
                UserName: data.UserName,
                UserLvl: data.UserLvl,
                UserExp: data.UserExp,
                MaxExp: data.MaxExp,
                Role: data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] 
            });
            user.setIsAuth(true);
            toastr.success(`Welcome: ${user.user.UserName}`); // Выводим роль пользователя через toastr
            navigate(All_Routes.TEST_PAGE);
            
        } else {
            toastr.error("Login failed. Please check your credentials."); // Сообщение об ошибке
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target; // Получаем имя и значение инпута
        setUserModel(prev => ({ ...prev, [name]: value })); // Обновляем состояние
    };

    return (
        <form className={styles.form} onSubmit={handleLogin} noValidate>
            <div className={styles.formItem}>
                <input 
                    type="text" 
                    name="userName" // Устанавливаем имя инпута
                    required 
                    placeholder="Login" 
                    className={styles.input} 
                    value={userModel.userName}
                    onChange={handleChange} // Добавляем обработчик изменения
                />
            </div>
            <div className={styles.formItem}>
                <input 
                    type="password" 
                    name="password" // Устанавливаем имя инпута
                    required 
                    placeholder="Password" 
                    className={styles.input} 
                    value={userModel.password}
                    onChange={handleChange} // Добавляем обработчик изменения
                />
            </div>
            <button type="submit" className={styles.button}>Login</button>
        </form>
    );
});

export default LoginForm;