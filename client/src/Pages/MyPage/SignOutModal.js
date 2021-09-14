import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginHandler } from '../../Redux/actions/actions';
import Portal from './Portal';
// import './index.scss';
import './SignOutModal.scss';

function SignOutModal ({ visible, setIsSignOutModalOpen }) {
  const state1 = useSelector(state => state.isLoginReducer); // isLogin 관련
  const dispatch = useDispatch();

  const { isLogin } = state1;

  const history = useHistory();

  function handleSignOutModalBack (e) {
    e.preventDefault();
    setIsSignOutModalOpen(false);
  }

  function handleSignOutModalCloseBtn (e) {
    e.preventDefault();
    setIsSignOutModalOpen(false);
  }

  function moveMainPage (e) {
    e.preventDefault();

    // 회원 정보 서버에서 삭제되어야 함
    // -> axios
    /* .then(res => if()) / 회원탈퇴 성공했을때 로그인 풀려야 함 dispatch(isLoginHandler(false)) & history.push('/');
                          / 회원탈퇴 실패했을 경우 => 프론트단에서는 뭘 해야 할까? => 현재페이지에서 이미 탈퇴한 회원입니다
                            또는 서버단에서 실패 => 두가지 경우의 모달창? */
    history.push('/');
  }

  return (
    <>
      <Portal elementId='modal-root'>
        <div
          className='modal-backdrop__sign-out' style={visible ? { display: 'block' } : { display: 'none' }}
          visible={visible.toString()} onClick={(e) => handleSignOutModalBack(e)}
        />
        <form className='modal-container__sign-out'>
          <fieldset>
            <legend className='a11yHidden'>회원 탈퇴 폼</legend>
            <p className='sign-out-modal-title'>회원 탈퇴를 하시겠습니까?</p>
            <div className='modal__sign-out-btn'>
              <button type='submit' onClick={(e) => moveMainPage(e)}>예</button>
              {/** 서버에 엑세스토큰 요청 삭제 */}
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

export default SignOutModal;
