import { observer } from "mobx-react-lite";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { guestRoutes, userRoutes, adminRoutes } from "../utils/routes";
import All_Routes from '../utils/consts'
import AuthContext from '../context';

const AppRouter = observer(() => {
    const {user} = useContext(AuthContext);
    return(
        <div>
            <Routes>
            {user._isAuth && userRoutes.map(({path, Component}) => 
                <Route key = {path} path={path} Component={Component}/>
            )}
            {guestRoutes.map(({path, Component}) => 
                <Route key = {path} path={path} Component={Component}/>
            )}
            <Route path="*" element={<Navigate to = {All_Routes.TEST_PAGE} />}/>
            </Routes>
        </div>
    )
});

export default AppRouter;