import React from 'react';

function PlayList ({ trackId, num, music, handleChangeMusic, handleDeleteMusic }) {
  // console.log('키',trackId)
  return (
    <li className='track'>

      <button className='track-delete' onClick={(e) => { handleDeleteMusic(e, num, trackId); }}>X</button>
      <div className='track-box' onClick={() => { handleChangeMusic(num, 'playList'); }}>

        <img className='track-img' src={music.img} alt={music.title} />
        <div className='track-info'>
          <p className='track-title'>{music.title}</p>
          <p className='track-artist'>{music.user.nickName}</p>
        </div>
      </div>
    </li>

  );
}

export default PlayList;
