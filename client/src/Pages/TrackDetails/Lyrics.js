import React from 'react';

function Lyrics ({ dummyTrack }) {
  return (
    <div className='lyrics'>
      {dummyTrack.track.lyric}
    </div>
  );
}

export default Lyrics;
