import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTrackDetails, isLoginModalOpenHandler } from '../../Redux/actions/actions';
import axios from 'axios';
import './TrackInfo.scss';
import likeImage from '../../assets/love.png';
import Login from '../../Components/Login';
import ContentDeleteModal from './ContentDeleteModal.js';

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

  const [grade, setGrade] = useState('');
  const [isContentDeleteModalOpen, setIsContentDeleteModalOpen] = useState(false);

  // 별점 부여한 상태 저장
  function handleGrade (e) {
    console.log(e.target.value);
    setGrade(e.target.value);
  }

  // 부여한 별점을 서버로 요청하는 함수
  function requestGrade (e) {
    e.preventDefault();
    if (!isLogin) {
      return dispatch(isLoginModalOpenHandler(true));
    }

    axios.post(`${process.env.REACT_APP_API_URL}/post/grade`, {
      postId: trackDetail.post.id,
      grade: grade
    })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          dispatch(getTrackDetails({
            id: trackDetail.id,
            title: trackDetail.title,
            artist: trackDetail.artist,
            img: trackDetail.img,
            genre: trackDetail.genre,
            releaseAt: trackDetail.releaseAt,
            lyric: trackDetail.lyric,
            like: {
              count: trackDetail.like.count
            },
            post: {
              id: trackDetail.post.id,
              views: trackDetail.post.views,
              gradeAev: res.data.gradeAev
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

  // 좋아요 버튼 클릭시 서버로 요청하는 함수
  function requestLike (e) {
    e.preventDefault();
    if (!isLogin) {
      return dispatch(isLoginModalOpenHandler(true));
    }

    axios.post(`${process.env.REACT_APP_API_URL}/post/good`, {
      postId: trackDetail.post.id
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
        } else if (res.status === 401) {
          console.log('권한이 없습니다.');
        } else if (res.status === 409) {
          console.log('해당 게시글이 없습니다.');
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
        <span>
          평점: {trackDetail.post.gradeAev}
          <select name='grade' onChange={(e) => handleGrade(e)}>
            <option value='none'>=별점선택=</option>
            <option value='5'>★★★★★</option>
            <option value='4'>★★★★☆</option>
            <option value='3'>★★★☆☆</option>
            <option value='2'>★★☆☆☆</option>
            <option value='1'>★☆☆☆☆</option>
          </select>
          <button onClick={(e) => requestGrade(e)}>별점주기</button>
        </span>
        <div>
          <span>
            아티스트 :
          </span>
          <span>
            {trackDetail.user.nickname}
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
        <button onClick={(e) => requestLike(e)}>
          <img className='like-btn' src={likeImage} alt='' />
        </button>
        {!isLoginModalOpen ? null : <Login />}
        <span>{trackDetail.like.count}</span>
        <button onClick={() => { setIsContentDeleteModalOpen(true); }}>삭제</button>
        {isContentDeleteModalOpen && <ContentDeleteModal visible={isContentDeleteModalOpen} setIsContentDeleteModalOpen={setIsContentDeleteModalOpen} />}
      </section>
    </div>
  );
}

export default TrackInfo;
