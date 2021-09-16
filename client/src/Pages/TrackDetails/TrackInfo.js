import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrackDetails, isLoginModalOpenHandler, inputMusic, inputPlayList } from '../../Redux/actions/actions';
import axios from 'axios';
import './TrackInfo.scss';
import likeImage from '../../assets/love.png';
import ContentDeleteModal from './ContentDeleteModal.js';
import Grade from './Grade';

function TrackInfo ({ isLogin, isLoginModalOpen, accessToken, trackDetail, userInfo, handleNotice }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector(state => state.playListReducer);
  const { playList } = state;

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
            soundtrack: trackDetail.soundtrack,
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
          handleNotice('권한이 없습니다.', 5000);
        } else if (res.status === 409) {
          handleNotice('게시글이 존재하지 않습니다.', 5000);
          history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  // 플레이리스트에 해당 곡이 이미 있는지 확인하는 함수
  function isDuplicateTrack (playlist, trackId) {
    for (const el of playlist) {
      if (el.id === trackId) return true;
      else return false;
    }
  }
  console.log('ewrwerer', playList);

  // 플레이 리스트 담기 버튼 클릭시 실행되는 함수
  function addPlaylist (e) {
    e.preventDefault();
    // 비로그인일 때
    if (!isLogin) {
      // 만약 이미 플레이 리스트에 있는 곡이면 저장 x
      const check = isDuplicateTrack(playList, trackDetail.id);
      // if (check) return console.log('리스트에 이미 있는 곡입니다.');
      if (check) return handleNotice('이미 추가된 곡입니다.', 5000);
      else {
        // 리스트에 없는 곡이면 그냥 전역상태에 저장만 함
        dispatch(inputMusic({
          id: trackDetail.id,
          title: trackDetail.title,
          img: trackDetail.img,
          genre: trackDetail.genre,
          releaseaAt: trackDetail.releaseAt,
          lyric: trackDetail.lyric,
          soundtrack: trackDetail.soundtrack,
          user: {
            nickname: trackDetail.user.nickname
          }
        }));
        handleNotice('리스트에 곡이 추가되었습니다.', 5000);
      }
    } else {
      // 로그인 상태일 때
      // 만약 이미 플레이 리스트에 있는 곡이면 저장 x
      const check = isDuplicateTrack(playList, trackDetail.id);
      if (check) return handleNotice('이미 추가된 곡입니다.', 5000);
      else {
        // 리스트에 없는 곡이면 서버에 플레이 리스트 추가 axios 요청
        axios.post(`${process.env.REACT_APP_API_URL}/playlist/playlist`, {
          trackId: trackDetail.id
        })
          .then(res => {
            console.log('플레이리스트 추가 요청 응답', res.data);
            if (res.status === 200) {
            // 성공 요청시 플레이리스트 상태 다시 받아옴
              axios.get(`${process.env.REACT_APP_API_URL}/playlist/playlist`)
                .then(res => {
                  console.log('플레이리스트 요청 응답', res.data);
                  if (res.status === 200) {
                    dispatch(inputPlayList(res.data.playList));
                    handleNotice('리스트에 곡이 추가되었습니다.', 5000);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          });
      }
    }
  }

  // 수정 버튼 클릭시 게시글 수정창으로 이동하는 함수
  function clickModifyBtn (e) {
    e.preventDefault();
    history.push('/modify');
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
        <button onClick={(e) => addPlaylist(e)}>플레이 리스트에 담기</button>
        <button>바로 듣기</button>
        <button onClick={(e) => requestLike(e)}>
          <img className='like-btn' src={likeImage} alt='' />
        </button>
        <span>{trackDetail.like.count}</span>
        {/* {isLogin && userInfo.nickName === trackDetail.user.nickname ? */}
        <>
          <button onClick={(e) => clickModifyBtn(e)}>수정</button>
          <button onClick={() => { setIsContentDeleteModalOpen(true); }}>삭제</button>
        </>
        {/* : null} */}
        {isContentDeleteModalOpen &&
          <ContentDeleteModal
            visible={isContentDeleteModalOpen}
            setIsContentDeleteModalOpen={setIsContentDeleteModalOpen}
            trackDetail={trackDetail}
            accessToken={accessToken}
            handleNotice={handleNotice}
          />}
      </section>
    </div>
  );
}

export default TrackInfo;
