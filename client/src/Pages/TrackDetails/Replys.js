import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getTrackDetails } from '../../Redux/actions/actions';
import WriteReply from './WriteReply';

function Replys ({ userInfo, trackDetail, isLogin, isLoginModalOpen, accessToken }) {
  const [selectedReplyId, setSelectedReplyId] = useState('');
  const [clickedBtn, setClickedBtn] = useState('');

  const dispatch = useDispatch();
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  useEffect(() => {
    // console.log(clickedBtn)
    if (clickedBtn === '삭제') {
      deleteReply();
    }
  }, [selectedReplyId]);

  // 수정 or 삭제 버튼 누를시 수정/삭제할 댓글 id로 상태 변경하는 함수
  function getReplyId (e) {
    e.preventDefault();
    console.log(e.target.parentElement.getAttribute('id'));
    setClickedBtn(e.target.value);
    setSelectedReplyId(e.target.parentElement.getAttribute('id'));
  }

  // 댓글 삭제요청 보내는 함수
  function deleteReply () {
    console.log('삭제할 댓글의 id:', selectedReplyId);
    if (!selectedReplyId) return;

    axios.delete(`${process.env.REACT_APP_API_URL}/reply/reply`, {
      postId: trackDetail.post.id,
      replyId: selectedReplyId
    })
      .then(res => {
        console.log('댓글 삭제 요청 응답', res.data);
        if (res.status === 200) {
          // 삭제 요청이 성공하면 다시 상세 음원 목록 받아오는 axios요청 보냄
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
          setSelectedReplyId('');
          setClickedBtn('');
        } else {
          setSelectedReplyId('');
          setClickedBtn('');
        }
      })
      .catch(err => {
        console.log(err);
      });
    setSelectedReplyId('');
    setClickedBtn('');
  }

  return (
    <div>
      <ul>
        {trackDetail.reply
          ? trackDetail.reply.map((el) => {
            return (
              <li key={el.id} id={el.id}>
                <img src={el.user.profile} alt='' />
                <p>{el.user.nickname}</p>
                <p>{el.content}</p>
                {/* {isLogin && userInfo.nickName === trackDetail.reply.user.nickname && clickedBtn !== '수정' ? */}
                <button value='수정' onClick={(e) => getReplyId(e)}>댓글수정</button>
                {/* : null} */}
                {/* {isLogin && userInfo.nickName === trackDetail.reply.user.nickname && clickedBtn !== '수정' ? */}
                <button value='삭제' onClick={(e) => getReplyId(e)}>댓글삭제</button>
                {/* : null} */}
              </li>
            );
          })
          : null}
      </ul>
      <div>
        <WriteReply
          trackDetail={trackDetail}
          isLogin={isLogin}
          isLoginModalOpen={isLoginModalOpen}
          accessToken={accessToken}
          clickedBtn={clickedBtn}
          setClickedBtn={setClickedBtn}
          selectedReplyId={selectedReplyId}
          setSelectedReplyId={setSelectedReplyId}
        />
      </div>
    </div>
  );
}

export default Replys;
