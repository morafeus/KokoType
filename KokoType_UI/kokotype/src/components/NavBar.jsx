import React, {useContext} from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-bootstrap";
import LogoButton from './UI/LogoButton/LogoButton'
import All_Routes from "../utils/consts";
import AuthContext from "../context";


const NavBar = observer(() => {
    const {user} = useContext(AuthContext);
    return (
      <nav className="nav-bar">
        <NavLink to={All_Routes.TEST_PAGE}>
          <LogoButton>KokoType</LogoButton>
        </NavLink>
        {user.isAuth ?
        <NavLink to={All_Routes.PROFILE_PAGE}>
          Profile
        </NavLink>
        :
        <NavLink className="nav-bar-icon" to={All_Routes.AUTH_PAGE}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v2h20v-2c0-3.33-6.69-5-10-5z"/>
          </svg>
        </NavLink>
        }
      </nav>
    );
  });
  
  export default NavBar;