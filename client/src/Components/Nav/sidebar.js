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

<<<<<<< HEAD
    const playList = useSelector(state => state.playListReducer.playList);
    const isLogin = useSelector(state => state.isLoginReducer.isLogin);
  
    const dispatch = useDispatch();
  
    // state 선언 crrentMusic-현재 재생곡 정보(객체), isRandom-랜덤 확인(불린), previousMusic-이전 곡 인덱스값(배열)
    const [crrentMusic, setCrrentMusic] = useState(playList[0]);
    const [isRandom, setIsRandom] = useState(false);
    const [previousMusic, setPreviousMusic] = useState([]);
  
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
        const newPreviousMusic = previousMusic.slice(0, previousMusic.length);
        newPreviousMusic.push(music);
        setPreviousMusic(newPreviousMusic);
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
=======
  const dispatch = useDispatch();

  const [crrentMusic, setCrrentMusic] = useState(playList[0]);
  const [isRandom, setIsRandom] = useState(false);
  const [previousMusic, setPreviousMusic] = useState([]);

  return (
>>>>>>> 48f316b5f9631e2d2583d1cabccb1003f5f74137

    <div>
<<<<<<< HEAD
        <div className="sidebar-control">
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
          // autoPlay
          showSkipControls
          onEnded={() => {
            if (!isRandom) {
              if (isValid('playList', playList.indexOf(crrentMusic) + 1)) {
                handleChangeMusic(playList[playList.indexOf(crrentMusic) + 1]);
              }
            } else {
              handlePreviousMusic('push', crrentMusic);
              handleChangeMusic(playList[getRandomNumber(0, playList.length - 1)]);
            }
          }}
          onClickNext={() => {
            if (!isRandom) {
              if (isValid('playList', playList.indexOf(crrentMusic) + 1)) {
                handleChangeMusic(playList[playList.indexOf(crrentMusic) + 1]);
              } else {
                handleChangeMusic(playList[0]);
              }
            } else {
              handlePreviousMusic('push', crrentMusic);
              handleChangeMusic(playList[getRandomNumber(0, playList.length - 1)]);
            }
          }}
          onClickPrevious={() => {
            if (!isRandom) {
              if (isValid('playList', playList.indexOf(crrentMusic) - 1)) {
                handleChangeMusic(playList[playList.indexOf(crrentMusic) - 1]);
              } else {
                handleChangeMusic(playList[playList.length - 1]);
              }
            } else {
              if (!previousMusic.length) {
                console.log('랜덤-이전곡 없음');
                handleChangeMusic(playList[getRandomNumber(0, playList.length - 1)]);
              } else {
                console.log('랜덤-이전곡 있음');
                handleChangeMusic(playList.indexOf(previousMusic[previousMusic.length - 1]));
                handlePreviousMusic('pop');
              }
            }
          }}
        />
        </div>
        <div className='play-list-box'>
        <ul className='play-list'>
=======
      <div className='sidebarInfo'>
        <img className='inner-square' src={crrentMusic.img} alt={crrentMusic.title} />
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
        style={{ width: '500px' }}
      />
      <ul>
>>>>>>> 48f316b5f9631e2d2583d1cabccb1003f5f74137
        {
            playList.map((el, idx) => {
              return (
                <PlayList
<<<<<<< HEAD
                key={el.id}
                num={idx}
                music={el}
                handleChangeMusic={handleChangeMusic}
                handleDeleteMusic={handleDeleteMusic}
=======
                  key={el.id}
                  num={idx}
                  music={el}
>>>>>>> 48f316b5f9631e2d2583d1cabccb1003f5f74137
                />
              );
            })
        }
<<<<<<< HEAD
        </ul>
    </div>
    </div>
    );
=======
      </ul>
    </div>

  );
>>>>>>> 48f316b5f9631e2d2583d1cabccb1003f5f74137
}

export default Sidebar;
