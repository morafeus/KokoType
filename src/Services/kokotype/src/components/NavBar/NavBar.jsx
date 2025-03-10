import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import All_Routes from "../../utils/consts";
import AuthContext from "../../context";

import { ReactComponent as ProfileIcon } from '../../assets/icons/ProfileIcon.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/SettingsIcon.svg';
import { ReactComponent as LeaderBoardIcon } from '../../assets/icons/LeaderBoardIcon.svg';
import { ReactComponent as LessonIcon } from '../../assets/icons/LessonIcon.svg';
import { ReactComponent as GamesIcon } from '../../assets/icons/GamesIcon.svg';

import styles from './NavBar.module.css'; // Импортируем стили
import ProfileButton from "../UI/ProfileButton/ProfileButton";
import LogoButton from '../UI/LogoButton/LogoButton';


const NavBar = observer(() => {
    const { user } = useContext(AuthContext);

    return (
        <nav className={styles.navBar}> {/* Применяем модульные стили */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <NavLink to={All_Routes.TEST_PAGE} style={{ textDecoration: 'none' }}>
                    <LogoButton>KokoType</LogoButton>
                </NavLink>
                <NavLink className={styles.navBarIcon} to={All_Routes.LEADERBOARD_PAGE}>
                    <LeaderBoardIcon />
                    <span className={styles.tooltip}>Leaderboard</span>
                </NavLink>
                <NavLink className={styles.navBarIcon} to={All_Routes.SETTINGS_PAGE}>
                    <SettingsIcon />
                    <span className={styles.tooltip}>Settings</span>
                </NavLink>
                <NavLink className={styles.navBarIcon} to={All_Routes.LESSON_PAGE}>
                    <LessonIcon />
                    <span className={styles.tooltip}>Lessons</span>
                </NavLink>
                <NavLink className={styles.navBarIcon} to={All_Routes.GAMES_PAGE}>
                    <GamesIcon />
                    <span className={styles.tooltip}>Games</span>
                </NavLink>
            </div>
            
            {user.isAuth ? (
                <NavLink to={All_Routes.PROFILE_PAGE} style={{ textDecoration: 'none' }}>
                    <ProfileButton />
                </NavLink>
            ) : (
                <NavLink className={styles.navBarIcon} to={All_Routes.AUTH_PAGE}>
                    <ProfileIcon />
                    <span className={styles.tooltip}>Login</span>
                </NavLink>
            )}
        </nav>
    );
});

export default NavBar;