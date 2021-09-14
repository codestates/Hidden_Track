import React from 'react';

function PlayList ({ num, music, handleChangeMusic, handleDeleteMusic }) {
  return (
    <li className='track'>
      <div onClick={() => { handleChangeMusic(num); }}>
        <img className='track-img' src={music.img} alt={music.title} />
        <div>
          <p>{music.title}</p>
          <p>{music.user.nickname}</p>
        </div>
      </div>
      <button onClick={(e) => { handleDeleteMusic(e, num); }}>삭제</button>
    </li>
  );
}

export default PlayList;
