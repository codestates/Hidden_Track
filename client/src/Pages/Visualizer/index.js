import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getTrackDetails } from '../../Redux/actions/actions';
import Canvas from './Canvas';
import axios from 'axios';
import './index.scss';

axios.defaults.withCredentials = true;

function Visualizer ({ handleNotice }) {
  // const audioCtx = new AudioContext();
  // console.log(audioCtx);
  // redux에 저장된 state 가져오기
  const loca = useLocation();
  const trackId = loca.pathname.split('/')[2];
  const dispatch = useDispatch();
  const { track } = useSelector(state => state.trackDetailReducer);
  // const audio = useRef();
  // const canvas = useRef();
  // const playList = useSelector(state => state.playListReducer.playList);
  const history = useHistory();

  // let context, source, analyser, ctx, frequency_array, rafId;

  // const width = window.innerWidth;
  // const height = window.innerHeight;
  // state 선언 crrentMusic-현재 재생곡 정보(객체), isRandom-랜덤 확인(불린), previousMusic-이전 곡 인덱스값(배열)
  // const [track, setTrack] = useState(playList[playList.length - 1]);

  function goMain () {
    history.push('/');
  }

  // console.log('비주얼 현재곡', crrentMusic);
  // const [isPlay, setIsPlay] = useState(false);
  // const img = new Image();
  // img.src = track.img;
  // const audio = new Audio()
  // audio.src = crrentMusic.soundtrack
  // audio.crossOrigin = 'anonymous'
  // const context = new AudioContext();
  // const source = context.createMediaElementSource(audio);
  // const analyser = context.createAnalyser()
  // source.connect(analyser);
  // analyser.connect(context.destination);
  // const frequency_array = new Uint8Array(analyser.frequencyBinCount);

  useEffect(async () => {
    // 음원 수정 페이지를 벗어나면 수정 버튼 상태를 false로 바꿔줌

    await axios.get(`${process.env.REACT_APP_API_URL}/track/${trackId}`)
      .then(res => {
        if (res.status === 200) dispatch(getTrackDetails(res.data));
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          if (err.response.status === 400) handleNotice('잘못된 요청입니다.', 5000);
          if (err.response.status === 404) {
            handleNotice('해당 게시글을 찾을 수 없습니다.', 5000);
            history.push('/');
          }
        } else console.log(err);
      });
  }, []);

  // useEffect( () => {
  //   context = new AudioContext();
  //   source = context.createMediaElementSource(audio.current);
  //   console.log(source);
  //   analyser = context.createAnalyser();
  //   source.connect(analyser);
  //   analyser.connect(context.destination);
  //   frequency_array = new Uint8Array(analyser.frequencyBinCount);
  //   console.log(context);
  //   // audio.current.autoplay=true
  //   // audio.current.volume='0.1'
  //   // audio.current.crossOrigin='anonymous'
  //   // audio.current.src=crrentMusic.soundtrack
  //   return () => {
  //     cancelAnimationFrame(rafId);
  //     analyser.disconnect();
  //     source.disconnect();
  //   };
  // },[])

  // function animationLooper (canvas) {
  //   if (canvas === null) return;
  //   canvas.width = width;
  //   canvas.height = height;
  //   const ctx = canvas.getContext('2d');
  //   analyser.fftSize = 512;
  //   const bufferLength = analyser.frequencyBinCount;
  //   const dataArray = frequency_array;
  //   const barWidth = 5;
  //   let barHeight;
  //   const x = 0;
  //   // draw a bar
  //   drawBar(bufferLength, x, barWidth, barHeight, dataArray, canvas, ctx);
  // }
  // function imgLoad (canvas, circleCtx, hue) {
  //   circleCtx.save();
  //   circleCtx.beginPath();
  //   // circleCtx.arc(960, 487.5, 245, 0, Math.PI * 2, false)
  //   circleCtx.arc(canvas.width / 2, canvas.height / 2, 222, 0, Math.PI * 2);
  //   // circleCtx.strokeStyle = '#2465D3'
  //   circleCtx.strokeStyle = 'white';
  //   circleCtx.stroke();
  //   circleCtx.clip();
  //   circleCtx.drawImage(img, canvas.width / 2 - img.width / 2,
  //     canvas.height / 2 - img.height / 2);
  //   // circleCtx.drawImage(img,0,1, barWidth, barHeight + 2 )
  //   circleCtx.restore();
  // }

  // function drawBar (bufferLength, x, barWidth, barHeight, dataArray, canvas, ctx) {
  //   let hue;
  //   for (let i = 0; i < bufferLength; i++) {
  //     barHeight = dataArray[i] * 1.7 + 150;
  //     ctx.save();
  //     ctx.translate(canvas.width / 2, canvas.height / 2);
  //     // ctx.rotate(i * Math.PI * 2.315 / bufferLength);
  //     ctx.rotate(i * Math.PI * 4 / bufferLength);
  //     ctx.fillStyle = 'white';
  //     ctx.fillRect(0, 3, barWidth, barHeight + 2);
  //     // const red = i * barHeight / 10;
  //     // const green = i * 4;
  //     // const blue = barHeight;
  //     // ctx.fillStyle = 'white';
  //     hue = i * 4;
  //     // ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
  //     ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
  //     ctx.fillRect(0, 0, barWidth, barHeight);
  //     x += barWidth;
  //     ctx.restore();
  //   }
  //   imgLoad(canvas, ctx, hue);
  // }

  // function tick () {
  //   animationLooper(canvas.current);
  //   analyser.getByteFrequencyData(frequency_array);
  //   const rafId = requestAnimationFrame(tick);
  // }

  // function togglePlay () {
  //   if (audio.current.paused) {
  //     // if(!context){
  //     //   context = context || new AudioContext();
  //     //   source = source || context.createMediaElementSource(audio.current);
  //     //   analyser = context.createAnalyser();
  //     //   source.connect(analyser);
  //     //   analyser.connect(context.destination);
  //     //   frequency_array = new Uint8Array(analyser.frequencyBinCount);
  //     // }
  //     context.resume();
  //     audio.current.play();
  //     const rafId = requestAnimationFrame(tick);
  //   } else {
  //     audio.current.pause();
  //   }
  // }

  // // function next () {
  // //   analyser.disconnect();
  // //   source.disconnect();
  // //   setCrrentMusic(playList[0]);
  // // }

  return (
    <>
      {/* <Portal elementId='visual'> */}

      <div id='visualizer'>
        {/* <button
        className='go-main-button' onClick={() => {
          console.log(canvas);
          history.push('/');
          console.log(canvas);
        }}
      >Go Main

      </button> */}
        {/* <div className='circle'>

          <div className='inner-circle-control'>
            <div className='inner-circle-title'>{crrentMusic.title}</div>
            <div className='inner-circle-artist'>{crrentMusic.user.nickname}</div>
            <button className='inner-circle-button' onClick={() => { togglePlay(); }}>play/pause</button>
          </div>
          <img className='inner-circle-img' src={crrentMusic.img} alt={crrentMusic.title} />
        </div> */}

        {/* <div className='inner-circle-control'>
        <div className='inner-circle-title'>{track.title}</div>
        <div className='inner-circle-artist'>{track.user.nickName}</div>
        <button className='inner-circle-button' onClick={() => { togglePlay(); }}>
          <img src={playPause} style={{ width: '50px', height: '50px' }} alt='play/pause' />
        </button>
      </div>
      <canvas
        id='canvas'
        ref={canvas}
      />
      <audio
        id='audio1'
        ref={audio}
        volume={0.2}
        crossOrigin='anonymous'
        src={track.soundtrack}

      /> */}
        <Canvas track={track} goMain={goMain} />
      </div>
      {/* </Portal> */}
    </>

  );
}

export default Visualizer;
