import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inputPlayList, deleteMusic } from '../../Redux/actions/actions';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlayList from '../PlayList';
import axios from 'axios';
import './Sidebar.scss';
import shuffle from '../../assets/active_shuffle.png';
import active_shuffle from '../../assets/shuffle.png';

function Sidebar ({ isSidebarOpen, showSidebar }) {
  const playList = useSelector(state => state.playListReducer.playList);
  const isLogin = useSelector(state => state.isLoginReducer.isLogin);

  const dispatch = useDispatch();

  // state 선언 crrentMusic-현재 재생곡 정보(객체), isRandom-랜덤 확인(불린), previousMusic-이전 곡 인덱스값(배열)
  const [crrentMusic, setCrrentMusic] = useState(playList[0]);
  const [isRandom, setIsRandom] = useState(false);
  const [previousMusic, setPreviousMusic] = useState([]);

  console.log('이전 재생곡', previousMusic);
  console.log('현재 재생곡', crrentMusic);
  // 재생곡 변경 함수
  function handleChangeMusic (index) {
    setCrrentMusic(playList[index]);
  }

  // 랜덤 인덱스 생성 함수
  function getRandomNumber (min, max) {
    const randomIndex = parseInt(Math.random() * ((Number(max) - Number(min)) + 1));

    if (randomIndex === playList.indexOf(crrentMusic)) {
      return getRandomNumber(min, max);
    } else {
      return randomIndex;
    }
  }

  // stack으로 구현된 이전곡 핸들링 함수
  function handlePreviousMusic (action, music) {
    if (action === 'push') {
      if (playList.indexOf(music) !== -1) {
        const newPreviousMusic = previousMusic.slice(0, previousMusic.length);
        newPreviousMusic.push(music);
        setPreviousMusic(newPreviousMusic);
      }
    } else if (action === 'pop') {
      const newPreviousMusic = previousMusic.slice(0, previousMusic.length);
      newPreviousMusic.pop();
      setPreviousMusic(newPreviousMusic);
    }
  }
  // 곡 삭제시 이전곡 리프레쉬 함수
  function refreshPreviousMusic (deleted) {
    const newPreviousMusic = previousMusic.slice(0, previousMusic.length);
    const filteredPreviousMusic = newPreviousMusic.filter(el => el.id !== deleted.id);
    setPreviousMusic(filteredPreviousMusic);
  }

  // 재생목록에서 곡 삭제 함수
  function handleDeleteMusic (e, index) {
    e.preventDefault();
    isLogin
      ? axios.delete(`${process.env.REACT_APP_API_URL}/playlist/playlist`)
        .then(res => {
          if (res.status === 200) {
            axios.get(`${process.env.REACT_APP_API_URL}/playlist/playlist`)
              .then(res => {
                if (res.status === 200) {
                  dispatch(inputPlayList(res.data.playList));
                }
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err))
      : dispatch(deleteMusic(playList[index]));
    refreshPreviousMusic(playList[index]);
  }

  function isValid (target, index) {
    if (target === 'playList') {
      if (!playList[index]) {
        return false;
      } else {
        return true;
      }
    }
  }

  return (
    <div id='sidebar' className={isSidebarOpen ? 'sidebar-opened' : 'sidebar-closed'}>

      <button className='exit-sidebar' onClick={(e) => { showSidebar(e); }}>X</button>

      <div className='sidebar-control'>
        <div className='sidebar-info'>
          <div className='square'>
            <img className='inner-square' src={crrentMusic.img} alt={crrentMusic.title} />
          </div>
          <div className='info'>
            <p className='inner-title'>{crrentMusic.title}</p>
            <p className='inner-nickname'>{crrentMusic.user.nickname}</p>
          </div>
          <div className='shuffle'>
            <button id='random-button' onClick={() => { setIsRandom(!isRandom); }}>
              <img id='random-button-img' src={isRandom ? active_shuffle : shuffle} />
            </button>
          </div>
        </div>
        <div className='audio'>
          <AudioPlayer
            id='sidebar-audio'
            src={crrentMusic.soundtrack}
            controls
            volume={0.1}
          // autoPlay
            showSkipControls
            onEnded={() => {
              if (!isRandom) {
                if (isValid('playList', playList.indexOf(crrentMusic) + 1)) {
                  handleChangeMusic(playList.indexOf(crrentMusic) + 1);
                }
              } else {
                handlePreviousMusic('push', crrentMusic);
                handleChangeMusic(getRandomNumber(0, playList.length - 1));
              }
            }}
            onClickNext={() => {
              if (!isRandom) {
                if (isValid('playList', playList.indexOf(crrentMusic) + 1)) {
                  handleChangeMusic(playList.indexOf(crrentMusic) + 1);
                } else {
                  handleChangeMusic(0);
                }
              } else {
                handlePreviousMusic('push', crrentMusic);
                handleChangeMusic(getRandomNumber(0, playList.length - 1));
              }
            }}
            onClickPrevious={() => {
              if (!isRandom) {
                if (isValid('playList', playList.indexOf(crrentMusic) - 1)) {
                  handleChangeMusic(playList.indexOf(crrentMusic) - 1);
                } else {
                  handleChangeMusic(playList.length - 1);
                }
              } else {
                if (!previousMusic.length) {
                  console.log('랜덤-이전곡 없음');
                  handleChangeMusic(getRandomNumber(0, playList.length - 1));
                } else {
                  console.log('랜덤-이전곡 있음');
                  handleChangeMusic(playList.indexOf(previousMusic[previousMusic.length - 1]));
                  handlePreviousMusic('pop');
                }
              }
            }}
          />
        </div>
      </div>
      <div className='sidebar-play-list-box'>
        <ul className='sidebar-play-ul'>
          {
            playList.map((el, idx) => {
              return (
                <PlayList
                  key={el.id}
                  num={idx}
                  music={el}
                  handleChangeMusic={handleChangeMusic}
                  handleDeleteMusic={handleDeleteMusic}
                />
              );
            })
        }
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
