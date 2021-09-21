import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../Redux/actions/actions';

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
  const inputNickNameValue = useRef('')


  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [user, setUser] = useState({ userInfo });
  const [isCheck, setIsCheck] = useState(true);
  const [isImageFile, setIsImageFile] = useState('')
  const [isImageUrl, setIsImageUrl] = useState('')


  function requestPW (e) {
    e.preventDefault();

    // let changedUser = { ...user.userInfo, ['nickName'] : inputValue.current.value}
    // dispatch(getUserInfo(changedUser))
    // console.log(changedUser);

    axios.get('https://hiddentrack.link/user/token',
    { withCredentials: true })
    .then(res => { // <- res.data 에 accessToken 담겨있을 것임
      if(res.status === 200){
      // 1. res.data <- 유저정보 빼와서
      axios.patch('https://hiddentrack.link/user/password', 
      {headers: {'accesstoken' : res.data}}  // <- nickname api 에서 얘를 요청 보내라고 했음
      )}}
    ).catch(
    console.log('response error')
    )
  } 

  function requestNickName (e) {
    e.preventDefault();
    console.log('>>>>>', user);
    let changedUser = { ...user.userInfo, ['nickName'] : inputNickNameValue.current.value}
    dispatch(getUserInfo(changedUser))
    console.log(userInfo);
    console.log(changedUser);

    // axios.get('https://hiddentrack.link/user/token',
    // // axios.get('http://localhost:4000/user/token',
    // )
    //   .then(res => { // <- res.data 에 accessToken 담겨있을 것임
    //     if(res.status === 200){
    //     // 1. res.data <- 유저정보 빼와서
    //     axios.patch('https://hiddentrack.link/user/nickname', 
    //     // axios.patch('http://localhost:4000/user/nickname', 
    //     {headers: {'Authorization' : `Bearer ${res.data}`}}) // <- nickname api 에서 얘를 요청 보내라고 했음
    //       // 2. 리덕스에 있는 유저 인포 업뎃 (dispatch)
    //     .then(res => {
    //       if(res.status === 200){
    //         // onChange 하면 set 하면 바뀔때마다 실행되기때문에 set 함수가 부담이 될수도 있음
    //         // 그래서 버튼 누르면 onChange 이 아니라 onClick 해서 ref 로 값 불러옴
    //         let changedUser = { ...user.userInfo, ['nickName'] : inputNickNameValue.current.value}
    //         dispatch(getUserInfo(changedUser))
    //       }else{
    //         console.log('err');
    //       }})
    //     }else{
    //       console.log('err');
    //     }}
    //   )
    //   .catch(
    //     console.log('response error')
    //   )
    }

  function requestProfileImage (e) {
    e.preventDefault();


    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file);

    reader.onload = function () {
      setIsImageFile(reader.result); // img 태그의 src 안에 넣을 state
    };
    reader.readAsDataURL(file); // <- 이건 모지?

    const formData = new FormData(); // <- form 태그랑은 다른거임.
    formData.append('img', file);
    let changedUser = { ...user.userInfo, ['profile'] : 'url'}
    dispatch(getUserInfo(changedUser))
    console.log(changedUser);

    // axios.get('https://hiddentrack.link/user/token'
    // ).then(res => { // <- res.data 에 accessToken 담겨있을 것임
    //     if(res.status === 200){
    //       axios.patch('https://hiddentrack.link/user/userimage', formData,
    //       {headers: {'Authorization' : `Bearer ${res.data}`}}
    //       ).then(res => {
    //         if (res.status === 200) {
    //           let changedUser = { ...user.userInfo, ['profile'] : res.profile}
    //           dispatch(getUserInfo(changedUser))
    //         }
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         })   
    //     }}
    // ).catch(err => console.log(err))
  }
  
  function handleCheckAdmin () {
    setIsCheck(true);
  }

  function showSignOutModal (e) {
    e.preventDefault();
    setIsSignOutModalOpen(true);
  }

  return (
    <>
      <p>{userInfo.nickName}님의 회원정보</p>
      <form onSubmit={requestPW}>
        <div>
          <input type="password" name="currentPassword" />
          <input type='password' name='password' id=''/>
          <p>비밀번호 유효성 검사</p>
          <input type='password' name='' id=''/>
          <p>비밀번호 확인 유효성 검사</p>
          <button type="submit">비밀번호 변경</button>
        </div>
      </form>

      <form onSubmit={requestNickName}>
        <input type='text' name='nickName' id='' defaultValue={user.userInfo.nickName} ref={inputNickNameValue}/>
        <button>중복확인</button>
        <button  type="submit">닉네임 변경</button>
      </form>

      <input type='checkbox' name='' id='' onChange={() => { handleCheckAdmin(); }} />
      <p>아티스트 계정으로 전환하기</p>
      {isCheck && <Condition />}

      <form onSubmit={requestProfileImage}>
        <div>프로필 사진 미리보기</div>
        <input type='file' name='img' id='imageChange' style={{ display: 'none' }} onChange={(e) =>{requestProfileImage(e)}}/>
        <label htmlFor='imageChange'>이미지 변경</label>
        <button>이미지 삭제</button>
      </form>

      <button className='sign-out-btn' onClick={(e) => showSignOutModal(e)}>회원 탈퇴</button>
      {isSignOutModalOpen && <SignOutModal visible={isSignOutModalOpen} setIsSignOutModalOpen={setIsSignOutModalOpen} />}
    </>

  );
}

export default MyPage;
