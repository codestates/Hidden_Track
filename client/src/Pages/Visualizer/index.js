import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlayList from '../../Components/PlayList';
import './index.scss';

function Visualizer () {
  const playList = useSelector(state => state.playListReducer.playList);
  console.log('플레이리스트', playList);

  function getRandomNumber (min, max) {
    return parseInt(Math.random() * ((Number(max) - Number(min)) + 1));
  }

  const [crrentMusic, setCrrentMusic] = useState(playList[0]);
  const [isRandom, setIsRandom] = useState(false);
  const [previousMusic, setPreviousMusic] = useState([]);

  function handleChangeMusic (index) {
    setCrrentMusic(playList[index]);
  }

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

  function isValid (index) {
    if (!playList[index]) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div>
      <div className='title'>{crrentMusic.title}</div>
      <div className='artist'>{crrentMusic.user.nickname}</div>
      <div className='music-info'>
        <img className='inner-circle' src={crrentMusic.img} />
        <div className='lyrics-container'>
          <span className='lyrics'>Lyrics</span>
          <div className='lyrics-box'>{crrentMusic.lyric}</div>
        </div>
      </div>
      <div className='visualizer-box'>Visualizer</div>
      <div className='play-list-box'>
        <ul className='play-list'>
          {
            playList.map((el, idx) => {
              console.log(el);
              return <PlayList key={idx} num={idx} music={el} handleChangeMusic={handleChangeMusic} />;
            })
          }
        </ul>
      </div>
      <div className='controller'>
        <button className='button' onClick={() => { setIsRandom(!isRandom); }}>{isRandom ? '현재 랜덤재생 ON' : '현재 랜덤재생 OFF'}</button>
        <AudioPlayer
          src={crrentMusic.soundtrack} controls volume={0.1}
          autoPlay
          showSkipControls
          onEnded={() => {
            if (!isRandom) {
              if (isValid(playList.indexOf(crrentMusic) + 1)) {
                setCrrentMusic(playList[playList.indexOf(crrentMusic) + 1]);
              }
            } else {
              handlePreviousMusic('push', playList.indexOf(crrentMusic));
              setCrrentMusic(playList[getRandomNumber(0, playList.length - 1)]);
            }
          }}
          onClickPrevious={() => {
            if (!isRandom) {
              if (isValid(playList.indexOf(crrentMusic) - 1)) {
                setCrrentMusic(playList[playList.indexOf(crrentMusic) - 1]);
              } else {
                setCrrentMusic(playList[playList.length - 1]);
              }
            } else {
              if (!previousMusic.length) {
                setCrrentMusic(playList[getRandomNumber(0, playList.length - 1)]);
              } else {
                setCrrentMusic(playList[previousMusic[previousMusic.length - 1]]);
                handlePreviousMusic('pop', playList.indexOf(crrentMusic));
              }
            }
          }}
          onClickNext={() => {
            if (!isRandom) {
              if (isValid(playList.indexOf(crrentMusic) + 1)) {
                setCrrentMusic(playList[playList.indexOf(crrentMusic) + 1]);
              } else {
                setCrrentMusic(playList[0]);
              }
            } else {
              handlePreviousMusic('push', playList.indexOf(crrentMusic));
              setCrrentMusic(playList[getRandomNumber(0, playList.length - 1)]);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Visualizer;
