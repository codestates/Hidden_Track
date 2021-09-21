import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { getUserInfo, getAccessToken, isLoginHandler } from '../Redux/actions/actions';

import axios from 'axios';
import Condition from '../SignUp/Condition';
// import {isValidPW} from '../SignUp/InputPW';
// import * as vaildPW from '../SignUp/InputPW';
// import SignOutModal from '../../Components/SignOutModal';
import SignOutModal from '../MyPage/SignOutModal';
import './index.scss';
// var vaildPW=require("request")


axios.defaults.withCredentials = true;

function MyPage () {
  
  const userInfo = useSelector(state => state.userInfoReducer);
  const dispatch = useDispatch();
  console.log(userInfo);
  
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [user, setUser] = useState({ userInfo})
  // id: userInfo.id,
  // loginId: userInfo.loginId,
  // profile: userInfo.profile,
  // nickName: userInfo.nickName,
  // // nickName: '',
  // // admin: 'listener',
  // admin: userInfo.admin,
  // // 만약 admin이 'artist'라면 아래 정보도 받음
  // userArtist: {
  //   agency: userInfo.userArtist.agency,
  //   email: userInfo.userArtist.email,
  //   debut: userInfo.userArtist.debut
  // }
  


  function showSignOutModal (e) {
    e.preventDefault();
    setIsSignOutModalOpen(true);
  }

  useEffect(()=> {

  }, [])

  const [isCheck, setIsCheck] = useState(true)

  function handleCheckAdmin(){
    setIsCheck(true)
  }

  function requestPW(){


    // axios.patch('https://hiddentrack.link/user/password',
    // {})
  }


  function getAccessToken(){
    // axios.get('https://hiddentrack.link/user/token')
    // .then(res =>{
    //   // if(res.message === 'ok'){
    //   //   return res.data 
    //   // }
    //   console.log(res);
    // })
  }

  function requestNickName(e){
    e.preventDefault()
    axios.get('https://hiddentrack.link/user/token', {withCredentials : true})
    .then(res =>{
      console.log(res);
    })
    // const accessToken = getAccessToken();
    // getAccessToken()
    // axios.patch('https://hiddentrack.link/user/nickname',{nickName: user.nickName},
    // {headers: {"Content-Type" : "application/json", "accesstoken": accessToken }})
    // .then(res => dispatch(getUserInfo(user)))
  }


  function requestProfileImage(){
    // axios.
  }

  function changeValue(key, e){
    e.preventDefault()
    setUser({...user, [key]: e.target.value})
  }

  return (
  <>
    <p>{userInfo.nickName}님의 회원정보</p>
    <form onSubmit={requestPW}>
      <div>
        <input type="password" name="" id="" />
        <p>비밀번호 유효성 검사</p>
        <input type="password" name="" id="" />
        <p>비밀번호 확인 유효성 검사</p>
        <button>비밀번호 변경</button>
      </div>
    </form>

    <form onSubmit={requestNickName}>
      <input type="text" name="" id="" onChange={(e)=>{requestNickName(e)}}/>
      <button>중복확인</button>
      <button>닉네임 변경</button>
    </form>

    <input type="checkbox" name="" id="" onChange={()=> {handleCheckAdmin()}} />
    <p>아티스트 계정으로 전환하기</p>
    {isCheck && <Condition/>}
      
    <form onSubmit={requestProfileImage}>
      <div>프로필 사진 미리보기</div>
      <input type="file" name="" id="imageChange" style={{display: 'none'}} />
      <label htmlFor="imageChange">이미지 변경</label>
      <button>이미지 삭제</button>
    </form>

    <button className='sign-out-btn' onClick={(e) => showSignOutModal(e)}>회원 탈퇴</button>
    {isSignOutModalOpen && <SignOutModal visible={isSignOutModalOpen} setIsSignOutModalOpen={setIsSignOutModalOpen} />}
  </>

  );
}

export default MyPage;
