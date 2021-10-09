import React, { useState } from 'react';
import axios from 'axios';
// import Cookies from 'universal-cookie';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginHandler, getUserInfo } from '../../Redux/actions/actions';
import { accessTokenRequest } from '../../Components/TokenFunction';
import Portal from './Portal';
import './WithDrawalModal.scss';

function WithDrawalModal ({ visible, setIsWithDrawalModalOpen, handleNotice }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector(state => state.accessTokenReducer).accessToken; // accessToken 관련

  // 회원탈퇴 모달창 밖의 배경을 누르면 모달창이 꺼지는 함수
  function handleSignOutModalBack (e) {
    e.preventDefault();
    setIsWithDrawalModalOpen(false);
  }

  // 모달창 x 버튼 누르면 모달창이 꺼지는 함수
  function handleSignOutModalCloseBtn (e) {
    e.preventDefault();
    setIsWithDrawalModalOpen(false);
  }

  // 모달창의 예 버튼을 누르면 ( 회원탈퇴 서버 요청 & 리덕스 스테이트 업데이트 & refreshToken 삭제 & 메인페이지로 이동 ) 발생하는 이벤트
  function requestSignOut (e) {
    e.preventDefault();

    // 회원 정보 서버에서 삭제되어야 함
    axios.delete(`${process.env.REACT_APP_API_URL}/user/withdrawal`,
      { headers: { accesstoken: accessToken } }

    ).then(async (res) => {
      if (res.status === 200) {
        const deletedUserInfo = {
          id: '1',
          loginId: '',
          profile: '',
          nickName: '',

          admin: 'artist',
          // 만약 admin이 'artist'라면 아래 정보도 받음
          userArtist: {
            agency: '',
            email: '',
            debut: ''
          }
        };
        // accessToken 빈 문자열 바꿔줘야 한다.
        dispatch(getUserInfo(deletedUserInfo));
        dispatch(isLoginHandler(false));
        history.push('/');
      }
    }
    ).catch(err => {
      if (err.response) {
        if (err.response.status === 401) { // <- 권한이 없을때(토큰이 이상하거나 만료되었을 경우)
          handleNotice('권한이 없습니다', 2000);
        }
      } else {
        handleNotice('잘못된 접근입니다', 2000);
      }
    });
  }

  return (
    <>
      <Portal elementId='modal-root'>
        <div
          className='modal-backdrop__sign-out' style={visible ? { display: 'block' } : { display: 'none' }}
          visible={visible.toString()} onClick={(e) => handleSignOutModalBack(e)}
        />
        <form className='modal-container__sign-out' onSubmit={requestSignOut}>
          <fieldset>
            <legend className='a11yHidden'>회원 탈퇴 폼</legend>
            <p className='sign-out-modal-title'>회원 탈퇴를 하시겠습니까?</p>
            <div className='modal__sign-out-btn'>
              <button type='submit'>예</button>
              <button onClick={(e) => handleSignOutModalCloseBtn(e)}>아니오</button>
            </div>
            <label htmlFor='sign-out-modal-close-btn' className='sign-out-modal-close-btn' onClick={(e) => handleSignOutModalCloseBtn(e)}>X</label>
            <button id='sign-out-modal-close-btn' style={{ display: 'none' }} />
          </fieldset>
        </form>
      </Portal>
    </>
  );
}

export default WithDrawalModal;
