import React from 'react';
import trash from '../../assets/trash.png';

function PlayList ({ playListId, num, music, handleChangeMusic, handleDeleteMusic }) {
  // console.log('키',trackId)
  // console.log(music)
  return (
    <li className='track'>
      <button className='track-delete' onClick={(e) => { handleDeleteMusic(e, num, playListId); }}><img src={trash} width='20px' /></button>
      <div className='track-box' onClick={() => { handleChangeMusic(num, 'playList'); }}>
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
