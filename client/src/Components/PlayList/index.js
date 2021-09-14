import React from 'react';

function PlayList ({ num, music, handleChangeMusic }) {
  console.log(num);
  return (
    <li className='track'>
      <div onClick={() => { handleChangeMusic(num); }}>
        <img src={music.img} alt={music.title} width={100} />
        <span>{music.title}</span>
        <span>{music.user.nickname}</span>
      </div>
      <button>삭제</button>
    </li>
  );
}

export default PlayList;
