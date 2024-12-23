import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom"; 
import NavBar from "./components/NavBar";
import toastr from 'toastr'; 

import 'toastr/build/toastr.min.css';

import './styles/App.css';  
import AppRouter from "./components/AppRouter";
import AuthContext from "./context";
import { refreshToken } from "./http/authAPI";

const App = observer(() => {
  const {user} = useContext(AuthContext);
  
  toastr.options = {
    positionClass: "toast-bottom-right",
    timeOut: 2500,
    closeButton: true, 
    progressBar: true 
};

  useEffect(async() => {
    const data = await refreshToken();
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
      console.log(user);
      
  } else {
    console.log('invalid user');
  }
  }, []);

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
