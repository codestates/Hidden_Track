import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './index.scss';

axios.defaults.withCredentials = true;

function Visualizer () {
  const MEDIA_ELEMENT_NODES = new WeakMap();
  console.log(MEDIA_ELEMENT_NODES);
  // const audioCtx = new AudioContext();
  // console.log(audioCtx);
  // redux에 저장된 state 가져오기
  const audio = useRef();
  const canvas = useRef();
  const playList = useSelector(state => state.playListReducer.playList);
  const dispatch = useDispatch();
  const history = useHistory();

  let context, source, analyser, ctx, frequency_array, rafId;

  const width = window.innerWidth;
  const height = window.innerHeight;
  // state 선언 crrentMusic-현재 재생곡 정보(객체), isRandom-랜덤 확인(불린), previousMusic-이전 곡 인덱스값(배열)
  const [crrentMusic, setCrrentMusic] = useState(playList[3]);

  useEffect(() => {
    context = context || new AudioContext();
    source = source || context.createMediaElementSource(audio.current);
    console.log(source);
    analyser = context.createAnalyser();
    source.connect(analyser);
    analyser.connect(context.destination);
    frequency_array = new Uint8Array(analyser.frequencyBinCount);
    console.log(context);
    // audio.current.autoplay=true
    // audio.current.volume='0.1'
    // audio.current.crossOrigin='anonymous'
    // audio.current.src=crrentMusic.soundtrack
    return () => {
      cancelAnimationFrame(rafId);
      analyser.disconnect();
      source.disconnect();
    };
  }, []);

  function animationLooper (canvas) {
    canvas.width = width;
    canvas.height = height;
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
      barHeight = dataArray[i] * 1.8 + 248;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      // ctx.rotate(i * Math.PI * 2.315 / bufferLength);
      ctx.rotate(i * Math.PI * 4 / bufferLength);
      // ctx.fillStyle = 'white'
      ctx.fillRect(0, 1, barWidth, barHeight + 2);
      const red = i * barHeight / 10;
      const green = i * 4;
      const blue = barHeight;
      // ctx.fillStyle = 'white';
      const hue = i * 4;
      ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
      // ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
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
    if (audio.current.paused) {
      // if(!context){
      //   context = context || new AudioContext();
      //   source = source || context.createMediaElementSource(audio.current);
      //   analyser = context.createAnalyser();
      //   source.connect(analyser);
      //   analyser.connect(context.destination);
      //   frequency_array = new Uint8Array(analyser.frequencyBinCount);
      // }
      context.resume();
      audio.current.play();
      audio.current.autoplay = true;
      rafId = requestAnimationFrame(tick);
    } else {
      audio.current.pause();
    }
  }

  function next () {
    analyser.disconnect();
    source.disconnect();
    setCrrentMusic(playList[0]);
  }

  return (
    <div id='visualizer'>
      <button className='go-main-button' onClick={() => { history.push('/'); }}>메인으로 가기</button>

      <div id='container'>
        <div className='circle'>
          <div className='inner-circle-controller'>
            <div className='inner-circle-title'>{crrentMusic.title}</div>
            <div className='inner-circle-artist'>{crrentMusic.user.nickname}</div>
            <button className='inner-circle-button' onClick={() => { togglePlay(); }}>play/pause</button>
            <button onClick={() => { next(); }}>next</button>
            <canvas
              id='canvas'
              ref={canvas}
            />
            <img className='inner-circle-img' src={crrentMusic.img} alt={crrentMusic.title} />
          </div>
        </div>
        <audio
          id='audio1'
          ref={audio}
          crossOrigin='anonymous'
          src={crrentMusic.soundtrack}
        />
      </div>
    </div>
  );
}

export default Visualizer;
