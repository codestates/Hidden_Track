import React, { useState } from 'react';
import './Lyrics.scss';

function Lyrics ({ trackDetail }) {
  const [isClick, setIsClick] = useState(false);

  function clickLyrics () {
    setIsClick(!isClick);
  }

  return (
    <details className='lyrics-open'>
      <summary className='lyrics-menu' id={isClick ? 'lyrics-click' : null} onClick={clickLyrics}>
        {isClick ? '가사 접기' : '가사 보기'}
      </summary>
      <pre className='lyrics'>
        {trackDetail.track.lyric || '등록된 가사가 없습니다.'}
      </pre>
    </details>
  );
}

export default Lyrics;
