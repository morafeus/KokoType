import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { fetchBoard } from '../http/leaderBoardAPI';
import {useNavigate} from "react-router-dom"

const SettingsPage = observer(() => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchBoard(navigate);
            console.log(data);
        };
        
    }, []);

    return (
        <div>
            Settings
        </div>
    )
});

export default SettingsPage;