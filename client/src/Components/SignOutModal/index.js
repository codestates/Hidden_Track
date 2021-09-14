import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Portal from './Portal';
import './index.scss'

function SignOutModal ({visible,setIsSignOutModalOpen}){

  const history = useHistory();


  function handleSignOutModalBack (e) {
    e.preventDefault();
    setIsSignOutModalOpen(false);
  }

  function handleSignOutModalCloseBtn (e) {
    e.preventDefault();
    setIsSignOutModalOpen(false);
  }

  function moveMainPage(e){
    e.preventDefault();
    history.push('/');

  }
  return (
  <>
    <Portal elementId='modal-root'>
      <div
          className='modal-backdrop__sign-out' style={visible ? { display: 'block' } : { display: 'none' }}
          visible={visible.toString()} onClick={(e) =>handleSignOutModalBack(e)}/>
      <form className="modal-container__sign-out">
        <fieldset>
          <legend className="a11yHidden">회원 탈퇴 폼</legend>
          <p className="sign-out-modal-title">회원 탈퇴를 하시겠습니까?</p>
          <div className="modal__sign-out-btn">
            <button type="submit" onClick={(e) =>moveMainPage(e)}>예</button>
                {/** 서버에 엑세스토큰 요청 삭제 */}
            <button onClick={(e) => handleSignOutModalCloseBtn(e)}>아니오</button>
          </div>
          <label for='sign-out-modal-close-btn' onClick={(e) => handleSignOutModalCloseBtn(e)}>X</label>
            <button id='sign-out-modal-close-btn' style={{ display: 'none' }} />
        </fieldset>
      </form>
    </Portal>
  </>
  )
}

export default SignOutModal 