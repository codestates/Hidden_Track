import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { inputPlayList, deleteMusic } from '../../Redux/actions/actions';
import 'react-h5-audio-player/lib/styles.css';
import Canvas from './Canvas';
import PlayList from '../../Components/PlayList';
import axios from 'axios';
import './index.scss';

axios.defaults.withCredentials = true;

function Visualizer () {
  // const audioCtx = new AudioContext();
  // console.log(audioCtx);
  // redux에 저장된 state 가져오기
  const audio = useRef();
  const canvas = useRef();
  const playList = useSelector(state => state.playListReducer.playList);
  const isLogin = useSelector(state => state.isLoginReducer.isLogin);
  const accessToken = useSelector(state => state.accessTokenReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  let context, source, analyser, ctx, frequency_array, rafId;

  useEffect(() => {
    if (isLogin) {
      axios.get(`${process.env.REACT_APP_API_URL}playlist/playlist`)
        .then(res => {
          if (res.status === 200) {
            dispatch(inputPlayList(res.data.playList));
          }
        });
    }
  }, []);

  // state 선언 crrentMusic-현재 재생곡 정보(객체), isRandom-랜덤 확인(불린), previousMusic-이전 곡 인덱스값(배열)
  const [crrentMusic, setCrrentMusic] = useState(playList[0]);
  const [isRandom, setIsRandom] = useState(false);
  const [previousMusic, setPreviousMusic] = useState([]);
  const [check, setCheck] = useState(false);

  // console.log('이전 재생곡', previousMusic);
  // console.log('현재 재생곡', crrentMusic);
  // 재생곡 변경 함수
  function handleChangeMusic (index) {
    setCrrentMusic(playList[index]);
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
  function handleDeleteMusic (e, index) {
    e.preventDefault();
    isLogin
      ? axios.delete(`${process.env.REACT_APP_API_URL}/playlist`, { id: playList[index].id, headers: { accesstoken: accessToken } })
        .then(res => {
          if (res.status === 200) {
            axios.get(`${process.env.REACT_APP_API_URL}/playlist`, {})
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

  const width = window.innerWidth;
  const height = window.innerHeight;

  console.log('ff');
  useEffect(() => {
    console.log('실행1111111');
    console.log(audio.current);
    audio.current.onplaying = () => { console.log('실행'); };
    context = context || new (window.AudioContext || window.webkitAudioContext)();
    source = source || context.createMediaElementSource(audio.current);
    analyser = context.createAnalyser();
    source.connect(analyser);
    analyser.connect(context.destination);
    frequency_array = new Uint8Array(analyser.frequencyBinCount);
    return () => {
      console.log('실행?');
      cancelAnimationFrame(rafId);
      analyser.disconnect();
      source.disconnect();
    };
  }, [audio.current]);

  function animationLooper (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = frequency_array;
    const barWidth = 5;
    let barHeight;
    const x = 0;
    // draw a bar
    drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas);
  }

  function drawBar (bufferLength, x, barWidth, barHeight, dataArray, canvas) {
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 1.8 + 50;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      // ctx.rotate(i * Math.PI * 2.315 / bufferLength);
      ctx.rotate(i * Math.PI * 4 / bufferLength);
      // ctx.fillStyle = 'white'
      // ctx.fillRect(0,1, barWidth, barHeight + 2)
      // const red = i * barHeight / 10;
      // const green = i * 4;
      // const blue = barHeight;
      // ctx.fillStyle = 'white';
      const hue = i * 8;
      // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
      ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
      ctx.fillRect(0, 0, barWidth, barHeight);
      x += barWidth;
      ctx.restore();
    }
  }

  function tick () {
    animationLooper(canvas.current);
    analyser.getByteFrequencyData(frequency_array);
    rafId = requestAnimationFrame(tick);
  }

  function togglePlay () {
    if (!context) {
      context = new (window.AudioContext || window.webkitAudioContext)();
    }
    context.resume();
    if (audio.current.paused) {
      audio.current.play();
      rafId = requestAnimationFrame(tick);
    } else {
      audio.current.pause();
      // cancelAnimationFrame(rafId);
    }
  }

  function next () {
    setCrrentMusic(playList[3]);
  }

  return (
    <div id='visualizer'>
      <div className='title'>{crrentMusic.title}</div>
      <div className='artist'>{crrentMusic.user.nickname}</div>
      <button onClick={() => { history.push('/'); }}>메인으로 가기</button>
      <div className='music-info'>
        <div className='circle'>
          <img className='inner-circle' src={crrentMusic.img} alt={crrentMusic.title} />
        </div>
        <div className='lyrics-container'>
          <div className='lyrics'>Lyrics</div>
          <div className='lyrics-box'>
            <pre className='lyrics-contents'>{crrentMusic.lyric}</pre>
          </div>
        </div>
      </div>
      <div className='visualizer-box' />
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
        {/* <AudioPlayer
          className='audio-element'
          src={crrentMusic.soundtrack}
          controls
          volume={0.1}
          // autoPlay
          showSkipControls
          // onPlay={() => { audioCtx.close(); }}
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
        /> */}
        <div id='container'>
          <canvas
            id='canvas'
            ref={canvas}
          />
          <div>
            <button onClick={() => { togglePlay(); }}>play/pause</button>
            <button onClick={() => { next(); }}>next</button>
          </div>
          <audio
            id='audio1'
            ref={audio}
            src={crrentMusic.soundtrack}
            crossOrigin='anonymous'
          />
        </div>
      </div>
    </div>
  );
}

export default Visualizer;
