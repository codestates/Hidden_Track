import React from 'react';

function PlayList ({ num, music, handleChangeMusic }) {
  console.log(num);
  return (
    <li className='track' onClick={() => { handleChangeMusic(num); }}>
      <img src={music.img} alt={music.title} />
      <span>{music.title}</span>
      <span>{music.user.nickname}</span>
    </li>
  );
}

export default PlayList;
