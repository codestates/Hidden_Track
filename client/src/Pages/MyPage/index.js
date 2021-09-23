// 라이브러리
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// 리덕스 import
import { getUserInfo } from '../../Redux/actions/actions';

// 컴포넌트 import
import Condition from '../SignUp/Condition';
import WithDrawalModal from './WithDrawalModal';

import './index.scss';


function MyPage () {
  const userInfo = useSelector(state => state.userInfoReducer);
  const dispatch = useDispatch();
  

  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [user, setUser] = useState(userInfo);
  const [isCheck, setIsCheck] = useState(true);
  const [isImageUrl, setIsImageUrl] = useState('https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%95%A8%EB%B2%94+img/profile.jpg')
  const [password, setPassword] = useState('')

  console.log(user.nickName);

  function requestPW (e) {
    e.preventDefault();

    // let changedUser = { ...user.userInfo, ['nickName'] : inputValue.current.value}
    // dispatch(getUserInfo(changedUser))
    // console.log(changedUser);
    
    axios.get(`${process.env.REACT_APP_API_URL}/user/token`,
    // {curerentPassword : , password }
    { withCredentials: true })
    .then(res => { // <- res.data 에 accessToken 담겨있을 것임
      if(res.status === 200){
      // 1. 비밀번호 번경 요청 서버에 보냄
      axios.patch(`${process.env.REACT_APP_API_URL}/user/password`, 
      {headers: {'accesstoken' : res.data.data}}// <- nickname api 에서 얘를 요청 보내라고 했음
      )}}
    ).catch(
    console.log('response error')
    )
  } 


  useEffect(()=> {
    console.log(userInfo);
  }, [userInfo])


  function requestNickName (e) {
    e.preventDefault();
    // let changedUser = {...user, ['nickName'] : inputNickNameValue.current.value}
    // dispatch(getUserInfo(changedUser))
    // console.log(userInfo); // 이무진
    // console.log(changedUser); // ㄸㄸㄸ
    
    axios.get(`${process.env.REACT_APP_API_URL}/user/token`,
    { withCredentials: true }
      ).then(res => { // <- res.data 에 accessToken 담겨있을 것임
        if(res.status === 200){
      // 1. 닉네임 변경 요청 서버에 보냄
        axios.patch(`${process.env.REACT_APP_API_URL}/user/nickname`, 
        {nickName: user.nickName }, // <- body
        {headers: {'accesstoken' : res.data.data}}) // <- nickname api 에서 얘를 요청 보내라고 했음
          // 2. 리덕스에 있는 유저 인포 업뎃 (dispatch)
        .then(res => {
          if(res.status === 200){
            // onChange 하면 set 하면 바뀔때마다 실행되기때문에 set 함수가 부담이 될수도 있음
            // 그래서 버튼 누르면 onChange 이 아니라 onClick 해서 ref 로 값 불러옴
            let changedUser = { ...userInfo, ['nickName'] : user.nickName}
            dispatch(getUserInfo(changedUser))
          }else{
            console.log('err');
          }})
        }else{
          console.log('err');
        }}
      )
      .catch(
        console.log('response error')
      )
    }

    function changeValue(key, e){
      setUser({ ...user, [key] : e.target.value})
    }


  function requestProfileImage (e) {
    e.preventDefault();

    const file = e.target.files[0];
    console.log(file);

    const formData = new FormData(); // <- form 태그랑은 다른거임.
    formData.append('img', file);

    
    axios.get(`${process.env.REACT_APP_API_URL}/user/token`, { withCredentials: true }
    ).then(res => { // <- res.data 에 accessToken 담겨있을 것임
        console.log('test1'); 
        if(res.status === 200){
        console.log('test2'); 
        
          axios.patch(`${process.env.REACT_APP_API_URL}/user/profile`, formData,
          {headers: {'accesstoken' : res.data.data}}
          ).then(res => {
            if (res.status === 200) {
              let changedUser = { ...user, ['profile'] : res.profile}
              dispatch(getUserInfo(changedUser))
            }
            })
            .catch(err => {
              console.log(err);
            })   
        }}
    ).catch(err => console.log(err))
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
          <input type='password' name='password' id='password' value={password} onChange={(e) => changeValue('password',e)}/>
          <p>비밀번호 유효성 검사</p>
          <input type='password' name='password' id='password'/>
          <p>비밀번호 확인 유효성 검사</p>
          <button type="submit">비밀번호 변경</button>
        </div>
      </form>

      <form onSubmit={requestNickName}>
        <input type='text'name='nickName' id='nickName' value={user.nickName} onChange={(e) => changeValue('nickName',e)}/>
        <button>중복확인</button>
        <button type="submit">닉네임 변경</button>
      </form>

      <input type='checkbox' name='' id='' onChange={() => {handleCheckAdmin()}} />
      <p>아티스트 계정으로 전환하기</p>
      {isCheck && <Condition />}

      <form onSubmit={requestProfileImage}>
        <div>
          프로필 사진 미리보기
          <img src={isImageUrl} alt="" />
        </div>
        <input type='file' name='img' id='imageChange' style={{ display: 'none' }} onChange={(e) =>{requestProfileImage(e)}}/>
        <label htmlFor='imageChange' type="submit">이미지 변경</label>
        <button>이미지 삭제</button>
      </form>

      <button className='sign-out-btn' onClick={(e) => showSignOutModal(e)}>회원 탈퇴</button>
      {isSignOutModalOpen && <WithDrawalModal visible={isSignOutModalOpen} setIsSignOutModalOpen={setIsSignOutModalOpen} />}
    </>

  );
}

export default MyPage;
