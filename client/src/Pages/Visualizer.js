import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Visualizer.css';

function Visualizer () {
  const limusin = 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%8B%A0%ED%98%B8%EB%93%B1-%EC%9D%B4%EB%AC%B4%EC%A7%84.mp3';

  const sweetDream = 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/Eurythmics_Sweet+Dreams.mp3';

  const [src, setSrc] = useState(limusin);
  //

  return (
    <div>
      <div className='title'>곡 제목</div>
      <img className='inner-circle' src='https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/10607796_20210513201807_500.jpg' />
      <div className='lyrics-container'>
        <span className='lyrics'>Lyrics</span>
        <div className='lyrics-box'>가사</div>
      </div>
      <div className='visualizer-box'>Visualizer</div>
      <div className='play-list-box'>
        <ul className='play-list'>
          <li className='track'>
            <img src='https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/10607796_20210513201807_500.jpg' width='50px' />
            <span>제목</span>
            <span>아티스트</span>
          </li>
          <li className='track'>
            <img src='https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/10607796_20210513201807_500.jpg' width='50px' />
            <span>제목</span>
            <span>아티스트</span>
          </li>
          <li className='track'>
            <img src='https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/10607796_20210513201807_500.jpg' width='50px' />
            <span>제목</span>
            <span>아티스트</span>
          </li>
          <li className='track'>
            <img src='https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/10607796_20210513201807_500.jpg' width='50px' />
            <span>제목</span>
            <span>아티스트</span>
          </li>
        </ul>
      </div>
      <div className='controller-box'>
        <img src='https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/10607796_20210513201807_500.jpg' width='150px' />
      </div>
      {/* <audio src="https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%8B%A0%ED%98%B8%EB%93%B1-%EC%9D%B4%EB%AC%B4%EC%A7%84.mp3" controls volume={0.1} ref={audioRef} ></audio> */}
      <AudioPlayer
        src={src} controls volume={0.5}
        showSkipControls
        onEnded={() => { setSrc(sweetDream); }}
        onClickPrevious
      />

    </div>
  );
}

export default Visualizer;
