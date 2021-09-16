import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTrackDetails, isLoginModalOpenHandler } from '../../Redux/actions/actions';
import axios from 'axios';
import './TrackInfo.scss';
import likeImage from '../../assets/love.png';
import ContentDeleteModal from './ContentDeleteModal.js';
import Grade from './Grade';

function TrackInfo ({ isLogin, isLoginModalOpen, accessToken, trackDetail }) {
  const dispatch = useDispatch();
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  console.log(trackDetail);

  const [isContentDeleteModalOpen, setIsContentDeleteModalOpen] = useState(false);

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
            reply: trackDetail.reply
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
        {/* <span>
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
        </span> */}
        <span>평점: {trackDetail.post.gradeAev}</span>
        <Grade trackDetail={trackDetail} isLogin={isLogin} accessToken={accessToken} />
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
        <span>{trackDetail.like.count}</span>
        <button onClick={() => { setIsContentDeleteModalOpen(true); }}>삭제</button>
        {isContentDeleteModalOpen &&
          <ContentDeleteModal
            visible={isContentDeleteModalOpen}
            setIsContentDeleteModalOpen={setIsContentDeleteModalOpen}
            trackDetail={trackDetail}
            accessToken={accessToken}
          />}
      </section>
    </div>
  );
}

export default TrackInfo;
