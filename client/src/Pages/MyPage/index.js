import React, { useState } from 'react';
import axios from 'axios';

import SignOutModal from '../../Components/SignOutModal';
import './index.scss'

function MyPage(){
  const [isSignOutModalOpen, setIsSignOutModalOpen ]= useState(false)

  function showSignOutModal(e){
    e.preventDefault();
    setIsSignOutModalOpen(true);
  }

  return (
    <div>
      <p>테스트 마이페이지입니다</p>
      <button className="sign-out-btn" onClick={(e) => showSignOutModal(e)}>회원 탈퇴</button>
      {isSignOutModalOpen && <SignOutModal visible={isSignOutModalOpen} setIsSignOutModalOpen={setIsSignOutModalOpen}/>}
  </div>
  )
}

export default MyPage