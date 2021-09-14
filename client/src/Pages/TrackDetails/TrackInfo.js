import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTrackDetails, isLoginModalOpenHandler } from '../../Redux/actions/actions';
import axios from 'axios';
import './TrackInfo.scss';
import likeImage from '../../assets/love.png';
import Login from '../../Components/Login';

axios.defaults.withCredentials = true;

function TrackInfo () {
  const trackDetail = useSelector(state => state.trackDetailReducer);
  const state1 = useSelector(state => state.isLoginReducer);
  const state2 = useSelector(state => state.isLoginModalOpenReducer);
  const { isLogin } = state1;
  const { isLoginModalOpen } = state2;
  // const { trackDetail } = state;
  const dispatch = useDispatch();
  console.log(trackDetail);

  function requestLike () {
    if (!isLogin) {
      return dispatch(isLoginModalOpenHandler(true));
    }

    axios.post(`${process.env.REACT_APP_API_URL}/post/good`, {
      postid: trackDetail.id
    })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
        // let likeCount = res.data.likecount
        // dispatch(getTrackDetails(...trackDetail, [like]: {count: likeCount}))
          dispatch(getTrackDetails({
            id: trackDetail.id,
            title: trackDetail.title,
            artist: trackDetail.artist,
            img: trackDetail.img,
            genre: trackDetail.genre,
            releaseAt: trackDetail.releaseAt,
            lyric: trackDetail.lyric,
            like: {
              count: res.data.likecount
            },
            post: {
              id: trackDetail.post.id,
              views: trackDetail.post.views,
              gradeAev: trackDetail.post.gradeAev
            },
            reply: [{
              id: trackDetail.reply.id,
              content: trackDetail.reply.content,
              user: {
                profile: trackDetail.reply.user.profile,
                nickname: trackDetail.reply.user.nickname
              }
            }]
          }));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <div>
        <img src={trackDetail.img} alt='' />
      </div>
      <section>
        <p>{trackDetail.title}</p>
        <span>평점 : {trackDetail.post.gradeAev}</span>
        <div>
          <span>
            아티스트 :
          </span>
          <span>
            {trackDetail.artist}
          </span>
        </div>
        <div>
          <span>
            장르 :
          </span>
          <span>
            {trackDetail.genre}
          </span>
        </div>
        <div>
          <span>
            발매일 :
          </span>
          <span>
            {trackDetail.releaseAt}
          </span>
        </div>
        <button>플레이 리스트에 담기</button>
        <button>바로 듣기</button>
        <button onClick={requestLike}>
          <img className='like-btn' src={likeImage} alt='' />
        </button>
        {!isLoginModalOpen ? null : <Login />}
        <span>{trackDetail.like.count}</span>
      </section>
    </div>
  );
}

export default TrackInfo;
