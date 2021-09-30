import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inputPlayList, deleteMusic, isLoginModalOpenHandler } from '../../Redux/actions/actions';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlayList from '../PlayList';
import axios from 'axios';
import './Sidebar.scss';
import shuffle from '../../assets/active_shuffle.png';
import active_shuffle from '../../assets/shuffle.png';

axios.defaults.withCredentials = true;
const default_album_img = 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%95%A8%EB%B2%94+img/default_album_img.png';

function Sidebar ({ isSidebarOpen, showSidebar, handleNotice }) {
  const audio = useRef();
  const isLogin = useSelector(state => state.isLoginReducer.isLogin);
  const { accessToken } = useSelector(state => state.accessTokenReducer);
  const playList = useSelector(state => state.playListReducer.playList);
  console.log('사이드바 플레이리스트', playList);
  const dispatch = useDispatch();

  // state 선언 crrentMusic-현재 재생곡 정보(객체), isRandom-랜덤 확인(불린), previousMusic-이전 곡 인덱스값(배열)
  const [crrentMusic, setCrrentMusic] = useState(playList[playList.length - 1]);
  const [isRandom, setIsRandom] = useState(false);
  const [previousMusic, setPreviousMusic] = useState([]);
  const [afterRender, setAfterRender] = useState(false);

  useEffect(() => {
    audio.current.audio.current.onplay = () => {
      play1min();
    };

    audio.current.audio.current.onpause = () => {
      play1min();
    };

    if (isLogin) {
      axios.get(`${process.env.REACT_APP_API_URL}/playlist`, { headers: { accesstoken: accessToken } })
        .then(res => {
          if (res.status === 200) {
            // console.log(res.data);
            console.log('플레이리스트', res.data);
            dispatch(inputPlayList(res.data.playlist));
            setCrrentMusic(res.data.playlist[res.data.playlist.length - 1]);
            setAfterRender(true);
            // audio.current.pause();
          }
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 404) {
              dispatch(inputPlayList([]));
              // audio.current.pause();
              // setCrrentMusic(playList[playList.length-1])
            }
          } else console.log(err);
        }
        );
    }
  }, [isLogin]);

  let tic = 0;
  let time;

  // 비로그인 상태일때 음원 1분재생 해주는 함수
  function play1min () {
    if (!isLogin) {
      console.log(audio.current);
      console.log(audio.current.audio.current);
      if (!audio.current.audio.current.paused) {
        time = setInterval(tictok, 1000);
      } else {
        clearInterval(time);
      }
    } else {
      console.log('로그인상태');
    }
  }

  function tictok () {
    console.log(tic);
    tic += 1;
    check();
  }

  function check () {
    if (tic > 59) {
      audio.current.audio.current.pause();
      audio.current.audio.current.currentTime = 0;
      clearInterval(time);
      tic = 0;
      // dispatch(isLoginModalOpenHandler(true))
      handleNotice('현재 1분 미리듣기 상태입니다. 로그인하시겠어요?', 5000);
    }
  }

  function handleChangeMusic (index, key) {
    if (!isLogin) {
      // 비로그인 상태에서는 노래 재생중엔 노래 변경 불가능
      if (audio.current.audio.current.currentTime === 0) {
        clearInterval(time);
        tic = 0;
        handlePreviousMusic('push', playList[playList.indexOf(crrentMusic)]);
        setCrrentMusic(playList[index]);

        // console.log(audio.current.audio.current.play)
      }
    } else {
      setCrrentMusic(playList[index]);
      audio.current.audio.current.play();
      // console.log(audio.current.audio.current.paused)
    }
  }

  // 랜덤 인덱스 생성 함수
  function getRandomNumber (min, max) {
    const randomIndex = parseInt(Math.random() * ((Number(max) - Number(min)) + 1));
    if (min === max) {
      return 0;
    } else if (randomIndex === playList.indexOf(crrentMusic)) {
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
  function handleDeleteMusic (e, index, trackId) {
    e.preventDefault();
    isLogin
      ? axios.delete(`${process.env.REACT_APP_API_URL}/playlist`, { id: trackId }, { headers: { accesstoken: accessToken } })
        .then(res => {
          if (res.status === 200) {
            axios.get(`${process.env.REACT_APP_API_URL}/playlist`)
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
            <img className='inner-square' src={crrentMusic ? crrentMusic.img : default_album_img} alt={crrentMusic ? crrentMusic.title : '기본 이미지'} />
          </div>
          <div className='current-info'>
            <p className='inner-title'>{crrentMusic ? crrentMusic.title : ''}</p>
            <p className='inner-nickname'>{crrentMusic ? crrentMusic.user.nickName : ''}</p>
          </div>
          <div className='shuffle'>
            <button id='random-button' onClick={() => { setIsRandom(!isRandom); }}>
              <img id='random-button-img' src={isRandom ? active_shuffle : shuffle} />
            </button>
          </div>
        </div>
        <div className={isLogin ? 'nfdsafsdaf' : 'min-play'}>
          <AudioPlayer
            // className={}
            ref={audio}
            src={crrentMusic ? crrentMusic.soundTrack : ''}
            // handleKeyDown={()=>{console.log('어허')}}
            // isLogin?controls:''
            volume={0.1}
            autoPlay={false}
            showJumpControls={!!isLogin}
            showSkipControls={!!isLogin}
            hasDefaultKeyBindings={!!isLogin}
            autoPlayAfterSrcChange={afterRender}
            onEnded={() => {
              if (playList.length <= 1) return;
              handlePreviousMusic('push', crrentMusic);
              if (!isRandom) {
                if (isValid('playList', playList.indexOf(crrentMusic) + 1)) {
                  handleChangeMusic(playList.indexOf(crrentMusic) + 1);
                } else {
                  handleChangeMusic(playList.indexOf(playList.length - 1));
                }
              } else {
                handleChangeMusic(getRandomNumber(0, playList.length - 1));
              }
            }}

            onClickNext={() => {
              if (playList.length <= 1) return;
              handlePreviousMusic('push', crrentMusic);
              if (!isRandom) {
                if (isValid('playList', playList.indexOf(crrentMusic) + 1)) {
                  handleChangeMusic(playList.indexOf(crrentMusic) + 1);
                } else {
                  handleChangeMusic(0);
                }
              } else {
                handleChangeMusic(getRandomNumber(0, playList.length - 1));
              }
            }}

            onClickPrevious={() => {
              if (playList.length <= 1) return;
              if (!previousMusic.length) {
                if (!isRandom) {
                  if (isValid('playList', playList.indexOf(crrentMusic) - 1)) {
                    handleChangeMusic(playList.indexOf(crrentMusic) - 1);
                  } else {
                    handleChangeMusic(playList.length - 1);
                  }
                } else {
                  console.log('랜덤-이전곡 없음');
                  handleChangeMusic(getRandomNumber(0, playList.length - 1));
                }
              } else {
                console.log('이전곡 있음');
                handleChangeMusic(playList.indexOf(previousMusic[previousMusic.length - 1]));
                handlePreviousMusic('pop');
              }
            }}

          />
        </div>
      </div>
      <div className='sidebar-play-list-box'>
        <ul
          className='sidebar-play-ul' onClick={() => {
            clearInterval(time);
            tic = 0;
          }}
        >
          {playList.length
            ? playList.map((el, idx) => {
              return (
                <PlayList
                  key={el.id}
                  trackId={el.id}
                  num={idx}
                  music={el}
                  handleChangeMusic={handleChangeMusic}
                  handlePreviousMusic={handlePreviousMusic}
                  handleDeleteMusic={handleDeleteMusic}
                />
              );
            })
            : <li>재생목록이 비어있습니다.</li>}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
