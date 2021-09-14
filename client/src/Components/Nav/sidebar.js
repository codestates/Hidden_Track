import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inputPlayList, deleteMusic } from '../../Redux/actions/actions';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlayList from '../../Components/PlayList';
import axios from 'axios';

function Sidebar () {

    const playList = useSelector(state => state.playListReducer.playList);
    const isLogin = useSelector(state => state.isLoginReducer.isLogin);

    const dispatch = useDispatch();

    const [crrentMusic, setCrrentMusic] = useState(playList[0]);
    const [isRandom, setIsRandom] = useState(false);
    const [previousMusic, setPreviousMusic] = useState([]);

    return (
    
    <div>
        <div className='sidebarInfo'>
            <img className='inner-square' src={crrentMusic.img} alt={crrentMusic.title}/>
            <div>
                <p className='inner-title'>{crrentMusic.title}</p>
                <p className='inner-nickname'>{crrentMusic.user.nickname}</p>
            </div>
        </div>
        <AudioPlayer 
            src={crrentMusic.soundtrack}
            controls 
            volume={0.1}
            showSkipControls
            onEnded={() => {}}
            onClickNext={() => {}}
            onClickPrevious={() => {}}
            style={{width: '500px'}} // 임시값
        />
        <ul>
        {
            playList.map((el, idx) => {
            return (
                <PlayList
                key={el.id}
                num={idx}
                music={el}
                />
            );
            })
        }
        </ul>   
    </div>
    
    );
}

export default Sidebar;
