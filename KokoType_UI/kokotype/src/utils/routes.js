import AuthPage from "../pages/AuthPage";
import LeaderBoradPage from "../pages/LeaderBoardPage";
import ProfilePage from "../pages/ProfilePage";
import ResultPage from "../pages/ResultPage";
import SettingsPage from "../pages/SettingsPage";
import TestPage from "../pages/TestPage";

import All_Routes from './consts'

export const adminRoutes = [

]

export const userRoutes = [
    {
        path: All_Routes.PROFILE_PAGE,
        Component: ProfilePage
    },
    {
        path: All_Routes.LEADERBOARD_PAGE,
        Component: LeaderBoradPage
    }
]

export const guestRoutes = [
    {
        path: All_Routes.TEST_PAGE,
        Component: TestPage
    },
    {
        path: All_Routes.AUTH_PAGE,
        Component: AuthPage
    },
    {
        path: All_Routes.SETTINGS_PAGE,
        Component: SettingsPage
    },
    {
        path: All_Routes.RESULT_PAGE,
        Component: ResultPage
    }
]