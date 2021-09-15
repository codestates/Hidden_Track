import React from 'react';
import TrackInfo from './TrackInfo';
import Lyrics from './Lyrics';
import Replys from './Replys';
import Grade from './Grade';
import dummyTrack from '../../DummyData/dummyTrack';

function TrackDetails () {
  return (
    <div className='track-details'>
      <div>
        <TrackInfo />
      </div>
      <div>
        <Lyrics dummyTrack={dummyTrack} />
      </div>
      <div>
        <Replys />
      </div>
    </div>
  );
}

export default TrackDetails;
