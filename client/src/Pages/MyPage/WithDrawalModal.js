import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginHandler } from '../../Redux/actions/actions';
import Portal from './Portal';
import './WithDrawalModal.scss';

function WithDrawalModal ({ visible, setIsSignOutModalOpen }) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const history = useHistory();

  // 회원탈퇴 모달창 밖의 배경을 누르면 모달창이 꺼지는 함수
  function handleSignOutModalBack (e) {
    e.preventDefault();
    setIsSignOutModalOpen(false);
  }

  // 모달창 x 버튼 누르면 모달창이 꺼지는 함수
  function handleSignOutModalCloseBtn (e) {
    e.preventDefault();
    setIsSignOutModalOpen(false);
  }

  // 모달창의 예 버튼을 누르면 ( 회원탈퇴 서버 요청 & 리덕스 스테이트 업데이트 & refreshToken 삭제 & 메인페이지로 이동 ) 발생하는 이벤트
  function requestSignOut (e) {
    e.preventDefault();

    // 회원 정보 서버에서 삭제되어야 함
    axios.get(`${process.env.REACT_APP_API_URL}/user/withdrawal`)
      .then(res => {
        if (res.status === 200) {
          dispatch(isLoginHandler(false));
          cookies.remove('refreshToken');
          history.push('/');
        }
      }
      );
  }
  /* .then(res => if()) / 회원탈퇴 성공했을때 로그인 풀려야 함 dispatch(isLoginHandler(false)) & history.push('/');
                          / 회원탈퇴 실패했을 경우 => 프론트단에서는 뭘 해야 할까? => 현재페이지에서 이미 탈퇴한 회원입니다
                            또는 서버단에서 실패 => 두가지 경우의 모달창? */

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
