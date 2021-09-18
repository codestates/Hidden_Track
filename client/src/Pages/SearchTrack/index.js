import React from 'react';
import { useSelector } from 'react-redux';
import TrackList from './TrackList';

function SearchTrack ({ handleNotice }) {
  const trackList = useSelector(state => state.trackListReducer);

  return (
    <div>
      <div>
        장르 컴포넌트
      </div>
      <div>
        해시태그 컴포넌트
      </div>
      <TrackList trackList={trackList} handleNotice={handleNotice} />
    </div>
  );
}

export default SearchTrack;
