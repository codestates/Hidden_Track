import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getTrackDetails } from '../../Redux/actions/actions';
import WriteReply from './WriteReply';
import './Replys.scss';
import editBtn from '../../assets/edit.png';
import deleteBtn from '../../assets/delete.png';

function Replys ({ userInfo, trackDetail, isLogin, isLoginModalOpen, accessToken, handleNotice }) {
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
    console.log(e.target.parentElement.parentElement.getAttribute('id'));
    setClickedBtn(e.target.alt);
    setSelectedReplyId(e.target.parentElement.parentElement.getAttribute('id'));
  }

  // 댓글 삭제요청 보내는 함수
  function deleteReply () {
    console.log('삭제할 댓글의 id:', selectedReplyId);
    if (!selectedReplyId) return;
    if (!isLogin) return handleNotice('로그인 후 이용하실 수 있습니다.', 5000);

    axios.delete(`${process.env.REACT_APP_API_URL}/reply`, {
      // trackId: trackDetail.id,
      id: selectedReplyId
    })
      .then(res => {
        console.log('댓글 삭제 요청 응답', res.data);
        if (res.status === 200) {
          // 삭제 요청이 성공하면 다시 상세 음원 목록 받아오는 axios요청 보냄
          axios.get(`${process.env.REACT_APP_API_URL}/track`, {
            params: {
              trackId: trackDetail.id
            }
          })
            .then(res => {
              console.log(res.data);
              if (res.status === 200) {
                dispatch(getTrackDetails(res.data.track));
              }
            })
            .catch(err => {
              console.log(err.response);
              if (err.response.status === 404) handleNotice('해당 게시글이 존재하지 않습니다.', 5000);
            });
        }
        setSelectedReplyId('');
        setClickedBtn('');
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status === 400) handleNotice('잘못된 요청입니다.', 5000);
        if (err.response.status === 401) handleNotice('권한이 없습니다.', 5000);
        if (err.response.status === 404) handleNotice('해당 댓글이 존재하지 않습니다.', 5000);
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
              <li className='replys-li' key={el.id} id={el.id}>
                <div className='replys-info'>
                  <img className='replys-profile' src={el.user.profile} alt='' />
                  <p className='replys-nickname'>{el.user.nickname}</p>
                  {/* {isLogin && userInfo.nickName === trackDetail.reply.user.nickname && clickedBtn !== '수정' ? */}
                  {/* <button className='contents__btn' value='수정' onClick={(e) => getReplyId(e)}>댓글수정</button> */}
                  <img className='replys-modify' src={editBtn} alt='수정' onClick={(e) => getReplyId(e)} />
                  {/* : null} */}
                  {/* {isLogin && userInfo.nickName === trackDetail.reply.user.nickname && clickedBtn !== '수정' ? */}
                  {/* // <button className='contents__btn' value='삭제' onClick={(e) => getReplyId(e)}>댓글삭제</button> */}
                  <img className='replys-delete' src={deleteBtn} alt='삭제' onClick={(e) => getReplyId(e)} />
                  {/* : null} */}
                </div>
                <div className='replys-comment-box'>
                  <p className='replys-comment'>{el.content}</p>
                </div>
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
          handleNotice={handleNotice}
        />
      </div>
    </div>
  );
}

export default Replys;
