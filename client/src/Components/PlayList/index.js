import React from 'react';

function PlayList ({ num, music, handleChangeMusic, handleDeleteMusic }) {
  return (
    <li className='track'>
      <div onClick={() => { handleChangeMusic(num); }}>
        <img className='track-img' src={music.img} alt={music.title} />
        <span>{music.title}</span>
        <span>{music.user.nickname}</span>
      </div>
      <button onClick={(e) => { handleDeleteMusic(e, num); }}>삭제</button>
    </li>
  );
}

export default PlayList;
