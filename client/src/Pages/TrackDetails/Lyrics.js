import React from 'react';
import './Lyrics.scss';

function Lyrics ({ trackDetail }) {
  return (
    <details className='lyrics-open'>
      <summary>가사 보기</summary>
      <pre className='lyrics'>
        {trackDetail.lyric}
      </pre>
    </details>
  );
}

export default Lyrics;
