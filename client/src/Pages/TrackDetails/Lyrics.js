import React from 'react';
import './Lyrics.scss';

function Lyrics ({ trackDetail }) {
  return (
    <details className='lyrics-open'>
      <summary>가사 보기</summary>
      <pre className='lyrics'>
        {trackDetail.lyric || '가사 정보가 없습니다.'}
      </pre>
    </details>
  );
}

export default Lyrics;
