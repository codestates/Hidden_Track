import React from 'react';

function Replys ({ dummyTrack }) {
  return (
    <div>
      <ul>
        {dummyTrack.track.reply
          ? dummyTrack.track.reply.map((el) => {
            return (
              <li key={el.id} id={el.id}>
                <img src={el.user.profile} alt='' />
                <p>{el.user.nickname}</p>
                <p>{el.content}</p>
                {/* {댓글 삭제 버튼 & 함수} */}
              </li>
            );
          })
          : null}
      </ul>
    </div>
  );
}

export default Replys;
