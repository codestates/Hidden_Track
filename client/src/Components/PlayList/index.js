import React from 'react';
import trash from '../../assets/trash.png';
import witness from '../../assets/witness.png';
import { useHistory } from 'react-router';

function PlayList ({ playListId, num, music, handleChangeMusic, handleDeleteMusic, currentMusic, trackId, goVisual }) {
  return (
    <li className={currentMusic ? currentMusic.id === playListId ? 'track selected-track' : 'track' : 'track'}>
      <button className='track-visualizer' onClick={() => { goVisual(trackId); }}><img src={witness} width='25px' /></button>
      <button className='track-delete' onClick={(e) => { handleDeleteMusic(e, num, playListId); }}><img src={trash} width='20px' /></button>
      <div className='track-box' onClick={() => { handleChangeMusic(num); }}>
        <img className='track-img' src={music.track.img} alt={music.track.title} />
        <div className='track-info'>
          <p className='track-title'>{music.track.title.length > 12 ? music.track.title.slice(0, 12) + '...' : music.track.title}</p>
          <p className='track-artist'>{music.track.user.nickName}</p>
        </div>
      </div>
    </li>

  );
}

export default PlayList;
