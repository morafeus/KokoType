import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import LogoButton from './UI/LogoButton/LogoButton';
import All_Routes from "../utils/consts";
import AuthContext from "../context";

import { ReactComponent as ProfileIcon } from '../assets/icons/ProfileIcon.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/SettingsIcon.svg';
import { ReactComponent as LeaderBoardIcon } from '../assets/icons/LeaderBoardIcon.svg';
import { ReactComponent as LessonIcon } from '../assets/icons/LessonIcon.svg';

import '../styles/component/NavBar.css';
import ProfileButton from "./UI/ProfileButton/ProfileButton";

const NavBar = observer(() => {
    const { user } = useContext(AuthContext);

    return (
        <nav className="nav-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <NavLink to={All_Routes.TEST_PAGE} style={{ textDecoration: 'none' }}>
                    <LogoButton>KokoType</LogoButton>
                </NavLink>
                <NavLink className="nav-bar-icon" to={All_Routes.LEADERBOARD_PAGE}>
                    <LeaderBoardIcon />
                    <span className="tooltip">Leaderboard</span> {/* Подсказка для LeaderBoard */}
                </NavLink>
                <NavLink className="nav-bar-icon" to={All_Routes.SETTINGS_PAGE}>
                    <SettingsIcon />
                    <span className="tooltip">Settings</span> {/* Подсказка для Settings */}
                </NavLink>
                <NavLink className="nav-bar-icon" to={All_Routes.LESSON_PAGE}>
                    <LessonIcon />
                    <span className="tooltip">Lessons</span> {/* Подсказка для Lessons */}
                </NavLink>
            </div>
            
            {user.isAuth ? (
                <NavLink to={All_Routes.PROFILE_PAGE} style={{ textDecoration: 'none' }}>
                    <ProfileButton />
                </NavLink>
            ) : (
                <NavLink className="nav-bar-icon" to={All_Routes.AUTH_PAGE}>
                    <ProfileIcon />
                    <span className="tooltip">Login</span> {/* Подсказка для Login */}
                </NavLink>
            )}
        </nav>
    );
});

export default NavBar;
