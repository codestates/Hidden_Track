import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getTrackDetails, isLoginModalOpenHandler } from '../../Redux/actions/actions';
import { RefreshTokenRequest } from '../../Components/TokenFunction';

function WriteReply ({
  trackDetail,
  isLogin,
  isLoginModalOpen,
  accessToken,
  clickedBtn,
  setClickedBtn,
  selectedReplyId,
  setSelectedReplyId
}) {
  const [inputText, setInputText] = useState('');

  const dispatch = useDispatch();

  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  useEffect(() => {
    // 댓글 수정 버튼 클릭시 댓글 작성란에 해당 댓글 내용 불러오기
    if (clickedBtn === '수정') {
      const reply = trackDetail.reply.filter(el => el.id === Number(selectedReplyId));
      // console.log('ffff',reply[0].content)
      setInputText(reply[0].content);
    }
  }, [clickedBtn]);

  function handleInputText (e) {
    setInputText(e.target.value);
  }

  // 작성한 댓글 등록 요청 보내는 함수
  function requestReply (e) {
    e.preventDefault();
    if (!inputText) return console.log('댓글을 입력하세요');

    // 만약 비로그인 상태라면 로그인 모달창 떠야함
    if (!isLogin) {
      return dispatch(isLoginModalOpenHandler(true));
    }

    axios.post(`${process.env.REACT_APP_API_URL}/reply/reply`, {
      postId: trackDetail.post.id,
      content: inputText
    })
      .then(res => {
        console.log('댓글 등록 요청 응답', res.data);
        if (res.status === 200) {
          // 댓글 등록 성공시 음원 상세 정보 새로 받아오는 요청
          axios.get(`${process.env.REACT_APP_API_URL}/post/track`, {
            params: {
              id: trackDetail.post.id
            }
          })
            .then(res => {
              console.log(res.data);
              if (res.status === 200) {
                dispatch(getTrackDetails({
                  id: res.data.track.id,
                  title: res.data.track.title,
                  artist: res.data.track.artist,
                  img: res.data.track.img,
                  genre: res.data.track.genre,
                  releaseAt: res.data.track.releaseAt,
                  lyric: res.data.track.lyric,
                  like: {
                    count: res.data.track.like.count
                  },
                  post: {
                    id: res.data.track.post.id,
                    views: res.data.track.post.views,
                    gradeAev: res.data.track.post.gradeAev
                  },
                  reply: res.data.track.reply
                }));
              }
            })
            .catch(err => {
              console.log(err);
            });
          setInputText('');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  // 댓글 수정 버튼 클릭시 수정 요청 보내는 함수
  function requestModifyReply (e) {
    e.preventDefault();
    console.log(inputText);

    if (!accessToken) {
      // 만약 액세스 토큰이 상태에 없으면 다시 받아옴
      RefreshTokenRequest();
    }

    axios.patch(`${process.env.REACT_APP_API_URL}/reply/reply`, {
      postId: trackDetail.post.id,
      replyId: selectedReplyId,
      content: inputText
    })
      .then(res => {
        console.log(res.data);
      // 수정 요청 완료 후 input값 초기화
      })
      .catch(err => {
        console.log(err);
      });
  }

  // 취소 버튼 클릭시 선택한 버튼 상태와 선택한 댓글 상태 변경하는 함수
  function cancelModify (e) {
    e.preventDefault();
    setSelectedReplyId('');
    setClickedBtn('삭제');
    setInputText('');
  }

  return (
    <div>
      {clickedBtn === '수정'
        ? <textarea className='write-reply-area' value={inputText} onChange={(e) => handleInputText(e)} />
        : <textarea className='write-reply-area' value={inputText} onChange={(e) => handleInputText(e)} />}
      {clickedBtn === '수정'
        ? <>
          <button onClick={(e) => requestModifyReply(e)}>댓글 수정</button>
          <button onClick={(e) => cancelModify(e)}>취소</button>
        </>
        : <button onClick={(e) => requestReply(e)}>댓글 등록</button>}
    </div>
  );
}

export default WriteReply;
