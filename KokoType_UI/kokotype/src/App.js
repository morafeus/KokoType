import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom"; 
import NavBar from "./components/NavBar";

import 'toastr/build/toastr.min.css';

import './styles/App.css';  
import AppRouter from "./components/AppRouter";
import AuthContext from "./context";

const App = observer(() => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    user.setIsAuth(false); // Установите значение только при монтировании
  }, [user]);

  return (
    <div>
        <BrowserRouter>
          <NavBar/>
          <AppRouter/>
        </BrowserRouter>
    </div>
  );
});

export default App;
