import React, {useContext} from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import LogoButton from './UI/LogoButton/LogoButton'
import All_Routes from "../utils/consts";
import AuthContext from "../context";

import { ReactComponent as ProfileIcon } from '../assets/icons/ProfileIcon.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/SettingsIcon.svg';
import { ReactComponent as LeaderBoardIcon } from '../assets/icons/LeaderBoardIcon.svg';

import '../styles/component/NavBar.css'

const NavBar = observer(() => {
    const {user} = useContext(AuthContext);
    return (
      <nav className="nav-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <NavLink to={All_Routes.TEST_PAGE} style={{textDecoration: 'none'}}>
            <LogoButton disableAnimation={true} disableCursor={true}>KokoType</LogoButton>
        </NavLink>
        <NavLink className="nav-bar-icon" to={All_Routes.LEADERBOARD_PAGE}>
            <LeaderBoardIcon />
        </NavLink>
        <NavLink className="nav-bar-icon" to={All_Routes.SETTINGS_PAGE}>
            <SettingsIcon />
        </NavLink>
      </div>
        
        {user.isAuth ?
        <NavLink to={All_Routes.PROFILE_PAGE} style={{textDecoration: 'none'}}>
          Profile
        </NavLink>
        :
        <NavLink className="nav-bar-icon" to={All_Routes.AUTH_PAGE}>
            <ProfileIcon />
        </NavLink>
        }
      </nav>
    );
  });
  
  export default NavBar;