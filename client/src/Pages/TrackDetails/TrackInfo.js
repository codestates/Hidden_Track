import React from 'react';
import axios from 'axios';
import './TrackInfo.scss';
import likeImage from '../../assets/love.png';

axios.defaults.withCredentials = true;

function TrackInfo ({ dummyTrack }) {
  // function requestLike () {

  // }

  return (
    <div>
      <div>
        <img src={dummyTrack.track.img} alt='' />
      </div>
      <section>
        <p>{dummyTrack.track.title}</p>
        <span>평점 : {dummyTrack.track.post.gradeAev}</span>
        <div>
          <span>
            아티스트 :
          </span>
          <span>
            {dummyTrack.track.artist}
          </span>
        </div>
        <div>
          <span>
            장르 :
          </span>
          <span>
            {dummyTrack.track.genre}
          </span>
        </div>
        <div>
          <span>
            발매일 :
          </span>
          <span>
            {dummyTrack.track.releaseAt}
          </span>
        </div>
        <button>플레이 리스트에 담기</button>
        <button>바로 듣기</button>
        <button>
          <img className='like-btn' src={likeImage} alt='' />
        </button>
        <span>{dummyTrack.track.like.count}</span>
      </section>
    </div>
  );
}

export default TrackInfo;
