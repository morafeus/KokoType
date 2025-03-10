import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import toastr from "toastr";

import "toastr/build/toastr.min.css";

import "./styles/App.css";
import AppRouter from "./components/AppRouter";
import AuthContext from "./context";
import { refreshToken } from "./http/authAPI";

// Цветовые схемы
const themes = {
  light: {
    "--main-color": "#f0f0f0",
    "--second-color": "#ffffff",
    "--main-font-color": "#FFD700",
    "--test-font-color": "#285956",
    "--test-type-font-color": "#c5c6c7",
    "--test-invalid-font-color": "#f76c6c",
    "--hover-color": "#00fae9",
  },
  dark: {
    "--main-color": "#12141b",
    "--second-color": "#1f2833",
    "--main-font-color": "#66fcf1",
    "--test-font-color": "#285956",
    "--test-type-font-color": "#c5c6c7",
    "--test-invalid-font-color": "#f76c6c",
    "--hover-color": "#00fae9",
  },
  elegant: {
    '--main-color': '#edc7b7',
    '--second-color': '#eee2dc',
    '--test-type-font-color': '#bab2b5',
    '--main-font-color': '#123c69',
    '--test-font-color': '#ac3b61',
    '--test-invalid-font-color': '#f76c6c',
    '--hover-color': '#00fae9',
  },
};

const App = observer(() => {
  const { user } = useContext(AuthContext);

  toastr.options = {
    positionClass: "toast-bottom-right",
    timeOut: 2500,
    closeButton: true,
    progressBar: true,
  };

  // Функция для смены темы
  const changeTheme = (themeName) => {
    const theme = themes[themeName];
    for (let key in theme) {
      document.documentElement.style.setProperty(key, theme[key]);
    }
    localStorage.setItem("theme", themeName); // Сохраняем выбор в localStorage
  };

  // Инициализация темы при старте приложения
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"; // По умолчанию темная тема
    changeTheme(savedTheme); // Применяем сохраненную тему

    // Запрос на обновление токена пользователя
    const fetchData = async () => {
      const data = await refreshToken();
      if (data) {
        user.setUser({
          Id: data.Id,
          UserName: data.UserName,
          UserLvl: data.UserLvl,
          UserExp: data.UserExp,
          MaxExp: data.MaxExp,
          Role: data["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        });
        user.setIsAuth(true);
        console.log(user);
      } else {
        console.log("invalid user");
      }
    };
    fetchData();
  }, [user]);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
});

export default App;
