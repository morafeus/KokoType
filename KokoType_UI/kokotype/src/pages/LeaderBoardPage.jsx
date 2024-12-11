import { observer } from 'mobx-react-lite'
import React, {useEffect} from 'react'
import { fetchBoard } from '../http/leaderBoardAPI';

const LeaderBoradPage = observer(()=> {

    useEffect(async() => {
        const data = await fetchBoard()
        console.log(data);
    }, []);

    return (
        <div>leaderboard</div>
    )
});

export default LeaderBoradPage;