import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inputPlayList, deleteMusic } from '../../Redux/actions/actions';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlayList from '../../Components/PlayList';
import axios from 'axios';
import './index.scss';

axios.defaults.withCredentials = true;

function Visualizer () {
  // redux에 저장된 state 가져오기
  const playList = useSelector(state => state.playListReducer.playList);
  const isLogin = useSelector(state => state.isLoginReducer.isLogin);

  const dispatch = useDispatch();

  // state 선언 crrentMusic-현재 재생곡 정보(객체), isRandom-랜덤 확인(불린), previousMusic-이전 곡 인덱스값(배열)
  const [crrentMusic, setCrrentMusic] = useState(playList[0]);
  const [isRandom, setIsRandom] = useState(false);
  const [previousMusic, setPreviousMusic] = useState([]);

  // 재생목록 클릭시 재생곡 변경 함수
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
    } else if (target === 'previousMusic') {
      if (!previousMusic[previousMusic.length - 1]) {
        return false;
      } else {
        return true;
      }
    }
  }

  return (
    <div>
      <div className='title'>{crrentMusic.title}</div>
      <div className='artist'>{crrentMusic.user.nickname}</div>
      <div className='music-info'>
        <img className='inner-circle' src={crrentMusic.img} alt={crrentMusic.title}/>
        <div className='lyrics-container'>
          <span className='lyrics'>Lyrics</span>
          <div className='lyrics-box'>
            <pre>{crrentMusic.lyric}</pre>
          </div>
        </div>
      </div>
      <div className='visualizer-box'>Visualizer</div>
      <div className='play-list-box'>
        <ul className='play-list'>
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
      <div className='controller'>
        <button className='button' onClick={() => { setIsRandom(!isRandom); }}>{isRandom ? '현재 랜덤재생 ON' : '현재 랜덤재생 OFF'}</button>
        <AudioPlayer
          src={crrentMusic.soundtrack} 
          controls 
          volume={0.1}
          // autoPlay
          showSkipControls
          onEnded={() => {
            if (!isRandom) {
              if (isValid('playList', playList.indexOf(crrentMusic) + 1)) {
                setCrrentMusic(playList[playList.indexOf(crrentMusic) + 1]);
              }
            } else {
              handlePreviousMusic('push', crrentMusic);
              setCrrentMusic(playList[getRandomNumber(0, playList.length - 1)]);
            }
          }}
          onClickNext={() => {
            if (!isRandom) {
              if (isValid('playList', playList.indexOf(crrentMusic) + 1)) {
                setCrrentMusic(playList[playList.indexOf(crrentMusic) + 1]);
              } else {
                setCrrentMusic(playList[0]);
              }
            } else {
              handlePreviousMusic('push', crrentMusic);
              setCrrentMusic(playList[getRandomNumber(0, playList.length - 1)]);
            }
          }}
          onClickPrevious={() => {
            if (!isRandom) {
              if (isValid('playList', playList.indexOf(crrentMusic) - 1)) {
                setCrrentMusic(playList[playList.indexOf(crrentMusic) - 1]);
              } else {
                setCrrentMusic(playList[playList.length - 1]);
              }
            } else {
              if (!previousMusic.length) {
                console.log('랜덤-이전곡 없음');
                setCrrentMusic(playList[getRandomNumber(0, playList.length - 1)]);
              } else {
                console.log('랜덤-이전곡 있음');
                setCrrentMusic(previousMusic[previousMusic.length - 1]);
                handlePreviousMusic('pop');
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default Visualizer;
