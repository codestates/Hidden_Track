import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrackDetails, isLoginModalOpenHandler, inputMusic, inputPlayList } from '../../Redux/actions/actions';
import axios from 'axios';
import likeImage from '../../assets/love.png';
import ContentDeleteModal from './ContentDeleteModal.js';
import Grade from './Grade';
import HashTag from '../../Components/HashTag';

function TrackInfo ({ isLogin, accessToken, trackDetail, userInfo, handleNotice, trackId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const playList = useSelector(state => state.playListReducer).playList;
  // const modifyBtn = useSelector(state => state.modifyReducer);
  // const { onClickModify } = modifyBtn;

  axios.defaults.headers.common.accesstoken = accessToken;
  console.log(trackDetail);

  const [isContentDeleteModalOpen, setIsContentDeleteModalOpen] = useState(false);
  const [listenBtn, setListenBtn] = useState(false);
  useEffect(() => {
    if (listenBtn) {
      addPlaylist();
    }
  }, [listenBtn]);

  // 좋아요 버튼 클릭시 서버로 요청하는 함수
  function requestLike (e) {
    e.preventDefault();
    if (!isLogin) {
      handleNotice('로그인 후 이용할 수 있습니다.', 5000);
      return dispatch(isLoginModalOpenHandler(true));
    }

    axios.post(`${process.env.REACT_APP_API_URL}/track/good`, {
      trackId: trackDetail.track.id
    })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
        // let likeCount = res.data.likecount
        // dispatch(getTrackDetails(...trackDetail, [like]: {count: likeCount}))
        // 좋아요 요청 완료되면 음원 상세 정보 다시 받아오는 요청 보냄
          axios.get(`${process.env.REACT_APP_API_URL}/track/${trackDetail.track.id}`)
            .then(res => {
              console.log(res.data);
              if (res.status === 200) {
                dispatch(getTrackDetails(res.data));
              }
            })
            .catch(err => {
              console.log(err.response);
              if (err.response) {
                if (err.response.status === 404) handleNotice('해당 게시글이 존재하지 않습니다.', 5000);
              } else console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          if (err.response.status === 400) {
            handleNotice('게시글이 존재하지 않습니다.', 5000);
            history.push('/');
          }
          if (err.response.status === 401) handleNotice('권한이 없습니다.', 5000);
        } else console.log(err);
      });
  }

  // 플레이리스트에 해당 곡이 이미 있는지 확인하는 함수
  function isDuplicateTrack (list, trackId) {
    for (const el of list) {
      if (el.track.id === trackId) return true;
    }
    return false;
  }
  console.log('ewrwerer', playList);

  // 플레이 리스트 담기 or 바로 듣기 버튼 클릭시 실행되는 함수
  function addPlaylist () {
    // -------------------비로그인일 때-----------------------
    if (!isLogin) {
      // 만약 이미 플레이 리스트에 있는 곡이면 저장 x
      const check = isDuplicateTrack(playList, trackDetail.track.id);
      // 이미 있는 곡 & 바로듣기 버튼을 안 눌렀다면 알림 뜸
      if (check && !listenBtn) return handleNotice('이미 추가된 곡입니다.', 5000);
      // 이미 있는 곡 & 바로듣기 버튼을 눌렀다면
      else if (check && listenBtn) {
        // 알림 메시지 안띄우고 비주얼 페이지로 이동
        setListenBtn(false);
        return history.push(`/visual/${trackId}`);
      } else {
        // 리스트에 없는 곡이면 그냥 전역상태에 저장만 함
        dispatch(inputMusic({
          id: trackDetail.track.title,
          track: {
            id: trackDetail.track.id,
            title: trackDetail.track.title,
            img: trackDetail.track.img,
            genre: trackDetail.track.genre,
            releaseAt: trackDetail.track.releaseAt,
            lyric: trackDetail.track.lyric,
            soundTrack: trackDetail.track.soundtrack,
            user: {
              nickName: trackDetail.track.user.nickName
            }
          }
        }));
        // 바로 듣기 버튼 안 눌렀다면 알림 뜸
        if (!listenBtn) handleNotice('리스트에 곡이 추가되었습니다.', 5000);
        else {
          // 바로 듣기 버튼을 눌렀다면 비주얼 페이지로 이동
          setListenBtn(false);
          return history.push(`/visual/${trackId}`);
        }
      }
    } else {
      // --------------------로그인 상태일 때------------------------
      // 만약 이미 플레이 리스트에 있는 곡이면 저장 x
      const check = isDuplicateTrack(playList, trackDetail.track.id);
      // 이미 있는 곡 & 바로듣기 버튼을 안 눌렀다면 알림 뜸
      if (check && !listenBtn) return handleNotice('이미 추가된 곡입니다.', 5000);
      // 이미 있는 곡 & 바로듣기 버튼을 눌렀다면
      else if (check && listenBtn) {
        // 알림 메시지 안띄우고 비주얼 페이지로 이동
        setListenBtn(false);
        return history.push(`/visual/${trackId}`);
      } else {
        // 리스트에 없는 곡이면 서버에 플레이 리스트 추가 axios 요청
        axios.post(`${process.env.REACT_APP_API_URL}/playlist`, {
          trackId: trackDetail.track.id
        })
          .then(res => {
            console.log('플레이리스트 추가 요청 응답', res.data);
            if (res.status === 201) {
            // 성공 요청시 플레이리스트 상태 다시 받아옴
              axios.get(`${process.env.REACT_APP_API_URL}/playlist`)
                .then(res => {
                  console.log('fdsafasd', res.data);
                  console.log('플레이리스트 요청 응답', res.data);
                  if (res.status === 200) {
                    dispatch(inputPlayList(res.data.playlist));
                    // 바로 듣기 버튼을 누르지 않았다면 알림 메시지
                    if (!listenBtn) handleNotice('리스트에 곡이 추가되었습니다.', 5000);
                    // 바로 듣기 버튼을 눌렀다면 알림 메시지 안띄우고 비주얼 페이지로 이동
                    else {
                      setListenBtn(false);
                      return history.push(`/visual/${trackId}`);
                    }
                  } else if (res.status === 204) return handleNotice('컨텐츠가 없습니다.', 5000);
                })
                .catch(err => {
                  console.log(err.response);
                  if (err.response) {
                    if (err.response.status === 401) handleNotice('권한이 없습니다.', 5000);
                  } else console.log(err);
                });
            }
          })
          .catch(err => {
            console.log(err.response);
            if (err.response) {
              if (err.response.status === 401) handleNotice('권한이 없습니다', 5000);
              if (err.response.status === 404) handleNotice('해당 음악을 찾을 수 없습니다.', 5000);
            } else console.log(err);
          });
      }
    }
    // 바로듣기 버튼 클릭 상태 초기화
    setListenBtn(false);
  }

  // 바로 듣기 버튼 클릭시 실행되는 함수
  function clickListenBtn (e) {
    e.preventDefault();
    setListenBtn(true);
  }

  // 수정 버튼 클릭시 게시글 수정창으로 이동하는 함수
  function clickModifyBtn (e) {
    e.preventDefault();
    // dispatch(isClickModify(true));
    history.push(`/modicreate/${trackId}`);
  }

  return (
    <div className='trackinfo-container'>
      <div className='trackinfo-image-box' style={{ backgroundImage: `url(${trackDetail.track.img})` }}>
        {/* <img className='trackinfo-image' src={trackDetail.track.img} alt={trackDetail.track.title} /> */}
      </div>
      <section className='trackinfo-desc'>
        <h2 className='trackinfo-title'>{trackDetail.track.title}</h2>
        <span className='trackinfo-grade-avg'>평점: {trackDetail.gradeAev}</span>
        <Grade trackDetail={trackDetail} isLogin={isLogin} accessToken={accessToken} handleNotice={handleNotice} />
        <div className='trackinfo-box'>
          <div className='trackinfo-info'>
            <span className='trackinfo-key'>아티스트</span>
            <span className='trackinfo-value'>{trackDetail.track.user.nickName}</span>
          </div>
          <div className='trackinfo-info'>
            <span className='trackinfo-key'>장르</span>
            <span className='trackinfo-value'>{trackDetail.track.genre}</span>
          </div>
          <div className='trackinfo-info'>
            <span className='trackinfo-key'>발매일</span>
            <span className='trackinfo-value'>{trackDetail.track.releaseAt}</span>
          </div>
        </div>
        <div className='trackinfo-hashtag-box'>
          <HashTag tagList={trackDetail.track.hashtags} />
        </div>
        <div className='trackinfo-btn-box'>
          <button className='contents__btn' onClick={addPlaylist}>플레이 리스트에 담기</button>
          <button className='contents__btn' onClick={(e) => clickListenBtn(e)}>바로 듣기</button>
          <button className='contents__btn' onClick={(e) => requestLike(e)}>
            <img className='like-btn' src={likeImage} alt='' />
          </button>
          <span className='trackinfo-total-like'>{trackDetail.like}</span>
        </div>
        {isLogin && userInfo.nickName === trackDetail.track.user.nickName
          ? <div>
            <button className='contents__btn' onClick={(e) => clickModifyBtn(e)}>수정</button>
            <button className='contents__btn' onClick={() => { setIsContentDeleteModalOpen(true); }}>삭제</button>
          </div>
          : null}
        {isContentDeleteModalOpen &&
          <ContentDeleteModal
            visible={isContentDeleteModalOpen}
            setIsContentDeleteModalOpen={setIsContentDeleteModalOpen}
            isLogin={isLogin}
            trackDetail={trackDetail}
            accessToken={accessToken}
            handleNotice={handleNotice}
          />}
      </section>
    </div>
  );
}

export default TrackInfo;
