import React from 'react';

function Lyrics ({ dummyTrack }) {
  return (
    <pre className='lyrics'>
      {dummyTrack.track.lyric}
    </pre>
  );
}

export default Lyrics;
