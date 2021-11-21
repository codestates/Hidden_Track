import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { inputPlayList, deleteMusic } from '../../Redux/actions/actions';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlayList from '../PlayList';
import axios from 'axios';
import './Sidebar.scss';
import shuffle from '../../assets/shuffle.png';
import active_shuffle from '../../assets/active_shuffle.png';
import exit from '../../assets/exit.png';
axios.defaults.withCredentials = true;

let tic = 0;
let timeSet;

function Sidebar ({ isSidebarOpen, showSidebar, handleNotice }) {
  const history = useHistory();
  const audio = useRef();
  const isLogin = useSelector(state => state.isLoginReducer.isLogin);
  const { accessToken } = useSelector(state => state.accessTokenReducer);
  const playList = useSelector(state => state.playListReducer.playList);
  const dispatch = useDispatch();

  const default_music = {
    id: 1,
    track: {
      id: 33,
      title: 'mar grande',
      img: ' https://hidden-track-bucket.s3.ap-northeast-2.amazonaws.com/trackimage/9381633934446787.jpg',
      genre: 'Jazz',
      releaseAt: '2017-09-20',
      lyric: '등록된 가사가 없습니다.',
      soundTrack: 'https://hidden-track-bucket.s3.ap-northeast-2.amazonaws.com/trackfile/3361633934444630.mp3 ',
      user: {
        nickName: 'andrea musci'
      }
    }
  };

  // state 선언 currentMusic-현재 재생곡 정보(객체), isRandom-랜덤 확인(불린), previousMusic-이전 곡 인덱스값(배열)
  const [currentMusic, setCurrentMusic] = useState(playList[0]);
  const [isRandom, setIsRandom] = useState(false);
  const [previousMusic, setPreviousMusic] = useState([]);
  const [afterRender, setAfterRender] = useState(false);
  const [time, setTime] = useState();
  useEffect(() => {
    clearInterval(timeSet);
    audio.current.audio.current.onplay = () => {
      setAfterRender(true);
      play1min();
    };

    audio.current.audio.current.onpause = () => {
      play1min();
    };

    setAfterRender(false);

    if (isLogin) {
      axios.get(`${process.env.REACT_APP_API_URL}/playlist`, { headers: { accesstoken: accessToken } })
        .then(res => {
          if (res.status === 200) {
            dispatch(inputPlayList(res.data.playlist));
            if (res.data.playlist.length > 0) {
              setCurrentMusic(res.data.playlist[res.data.playlist.length - 1]);
            }
          }
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 404) {
              dispatch(inputPlayList([]));
            }
          } else console.log(err);
        });
    } else {
      setCurrentMusic(playList[playList.length - 1]);
    }
  }, [isLogin]);

  function goVisual (trackId) {
    history.push(`/visual/${trackId}`);
  }

  // 비로그인 상태일때 음원 1분재생 해주는 함수
  function play1min () {
    clearInterval(timeSet);
    if (!isLogin) {
      if (!audio.current.audio.current.paused) {
        handleNotice('1분 미리듣기 상태입니다.', 5000);
        timeSet = setInterval(tictok, 1000);
        setTime(timeSet);
        // return time
      } else {
        clearInterval(timeSet);
      }
    }
  }

  function tictok () {
    tic += 1;
    check();
  }

  function check () {
    if (isLogin) {
      clearInterval(timeSet);
      tic = 0;
    } else if (tic > 59) {
      audio.current.audio.current.pause();
      audio.current.audio.current.currentTime = 0;
      clearInterval(timeSet);
      tic = 0;
      // dispatch(isLoginModalOpenHandler(true))
      handleNotice('로그인후 멋진 음악을 FULL로 감상하세요!', 5000);
    }
  }

  function handleChangeMusic (index, key) {
    setAfterRender(true);
    if (!isLogin) {
      // 비로그인 상태에서는 노래 재생중엔 노래 변경 불가능
      clearInterval(timeSet);
      tic = 0;
      handlePreviousMusic('push', playList[playList.indexOf(currentMusic)]);
      setCurrentMusic(playList[index]);
    } else {
      setCurrentMusic(playList[index]);
      audio.current.audio.current.play();
    }
  }

  // 랜덤 인덱스 생성 함수
  function getRandomNumber (min, max) {
    const randomIndex = parseInt(Math.random() * ((Number(max) - Number(min)) + 1));
    if (min === max) {
      return 0;
    } else if (randomIndex === playList.indexOf(currentMusic)) {
      return getRandomNumber(min, max);
    } else {
      return randomIndex;
    }
  }

  // stack으로 구현된 이전곡 핸들링 함수
  const handlePreviousMusic = useCallback( (action, music) => {
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
  }, [] )

  // 곡 삭제시 이전곡 리프레쉬 함수
  function refreshPreviousMusic (deleted) {
    const newPreviousMusic = previousMusic.slice(0, previousMusic.length);
    const filteredPreviousMusic = newPreviousMusic.filter(el => el.id !== deleted.id);
    setPreviousMusic(filteredPreviousMusic);
  }

  // 재생목록에서 곡 삭제 함수
  // function handleDeleteMusic 

  const handleDeleteMusic = useCallback( (e, index, playListId) => {
    e.preventDefault();
    isLogin
      ? axios.delete(`${process.env.REACT_APP_API_URL}/playlist/${playListId}`, { headers: { accesstoken: accessToken } })
        .then(res => {
          if (res.status === 200) {
            axios.get(`${process.env.REACT_APP_API_URL}/playlist`, { headers: { accesstoken: accessToken } })
              .then(res => {
                if (res.status === 200) {
                  dispatch(inputPlayList(res.data.playlist));
                }
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err))
      : dispatch(deleteMusic(playList[index]));
    refreshPreviousMusic(playList[index]);
  }, [] )

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
    <>
      <div id='sidebar' className={isSidebarOpen ? 'sidebar-opened' : 'sidebar-closed'} style={{ height: window.innerHeight }}>
        <button className='exit-sidebar' onClick={(e) => { showSidebar(e); }}><img src={exit} width='24px' alt="exit"/></button>
        <div className='sidebar-control'>
          <div className='sidebar-info' style={{ backgroundImage: currentMusic ? currentMusic.track.img : default_music.track.img }}>
            <div className='square'>
              <img
                className='inner-square'
                onClick={() => {
                  if (currentMusic) {
                    history.push(`/trackdetails/${currentMusic.track.id}`);
                  } else {
                    history.push(`/trackdetails/${default_music.track.id}`);
                  }
                }}
                src={currentMusic ? currentMusic.track.img : default_music.track.img}
                alt={currentMusic ? currentMusic.track.title : default_music.track.title}
              />
            </div>
            <div className='current-info'>
              <p className='inner-title'>{currentMusic ? currentMusic.track.title.length > 12 ? currentMusic.track.title.slice(0, 12) + '...' : currentMusic.track.title : default_music.track.title}</p>
              <p className='inner-nickname'>{currentMusic ? currentMusic.track.user.nickName : default_music.track.user.nickName}</p>
            </div>
            <div className='shuffle'>
              <button id='random-button' onClick={() => { setIsRandom(!isRandom); }}>
                <img id='random-button-img' src={isRandom ? active_shuffle : shuffle} alt="random-button"/>
              </button>
            </div>
          </div>
          <div className={isLogin ? 'all-play' : 'min-play'}>
            <AudioPlayer
              ref={audio}
              src={currentMusic ? currentMusic.track.soundTrack : default_music.track.soundTrack}
              volume={0.5}
              autoPlay={false}
              showJumpControls={!!isLogin}
              showSkipControls={!!isLogin}
              hasDefaultKeyBindings={!!isLogin}
              autoPlayAfterSrcChange={afterRender}
              onEnded={() => {
                if (playList.length <= 1) return;
                handlePreviousMusic('push', currentMusic);
                if (!isRandom) {
                  if (isValid('playList', playList.indexOf(currentMusic) + 1)) {
                    handleChangeMusic(playList.indexOf(currentMusic) + 1);
                  } else {
                    handleChangeMusic(0);
                  }
                } else {
                  handleChangeMusic(getRandomNumber(0, playList.length - 1));
                }
              }}

              onClickNext={
                () => {
                if (playList.length <= 1) return;
                handlePreviousMusic('push', currentMusic);
                if (!isRandom) {
                  if (isValid('playList', playList.indexOf(currentMusic) + 1)) {
                    handleChangeMusic(playList.indexOf(currentMusic) + 1);
                  } else {
                    handleChangeMusic(0);
                  }
                } else {
                  handleChangeMusic(getRandomNumber(0, playList.length - 1));
                }
              }
            }

              onClickPrevious={() => {
                if (playList.length <= 1) return;
                if (!previousMusic.length) {
                  if (!isRandom) {
                    if (isValid('playList', playList.indexOf(currentMusic) - 1)) {
                      handleChangeMusic(playList.indexOf(currentMusic) - 1);
                    } else {
                      handleChangeMusic(playList.length - 1);
                    }
                  } else {
                    handleChangeMusic(getRandomNumber(0, playList.length - 1));
                  }
                } else {
                  handleChangeMusic(playList.indexOf(previousMusic[previousMusic.length - 1]));
                  handlePreviousMusic('pop');
                }
              }}
            />
          </div>
        </div>
        <div className='sidebar-play-list-box'>
          {playList.length === 0
            ? '재생목록이 비어있습니다.'
            : <ul
                className='sidebar-play-ul' onClick={() => {
                  clearInterval(timeSet);
                  tic = 0;
                }}
              >
              {playList.map((el, idx) => {
                return (
                  <PlayList
                    key={el.id}
                    playListId={el.id}
                    num={idx}
                    music={el}
                    handleChangeMusic={handleChangeMusic}
                    handlePreviousMusic={handlePreviousMusic}
                    handleDeleteMusic={handleDeleteMusic}
                    currentMusic={currentMusic}
                    trackId={el.track.id}
                    goVisual={goVisual}
                  />
                );
              })}
            </ul>}
        </div>
      </div>
      <div className={isSidebarOpen ? 'sidebar-backdrop sidebar-opened' : 'sidebar-backdrop sidebar-closed'} onClick={(e) => showSidebar(e)} style={{ width: window.innerWidth, height: window.innerHeight }} />
      {/*  background: 'black',   opacity: .8 */}
    </>
  );
}

export default Sidebar;
