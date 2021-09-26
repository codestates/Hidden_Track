// 라이브러리
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// 리덕스 import
import { getUserInfo } from '../../Redux/actions/actions';

// 컴포넌트 import
import Condition from '../SignUp/Condition';
import WithDrawalModal from './WithDrawalModal';

// 함수 import
import { accessTokenRequest } from '../../Components/TokenFunction';

import './index.scss';

function MyPage () {
  const userInfo = useSelector(state => state.userInfoReducer);
  const state3 = useSelector(state => state.accessTokenReducer); // accessToken 관련
  const dispatch = useDispatch();

  const { accessToken } = state3;

  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [user, setUser] = useState(userInfo);

  console.log(user.profile); // test1

  const [imgUrl, setImgUrl] = useState('https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%95%A8%EB%B2%94+img/profile.jpg')
  const [isAdminCheck, setIsAdminCheck] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [ChangePassword, setChangePassword] = useState('');
  const [checkedPassword, setCheckedPassword] = useState('');
  const [message, setMessage] = useState({
    duplicatedId: '',
    validPW: '',
    validCurrentPW: '',
    matchPW: '',
    validMatchPW: '',
    duplicatedNick: ''
  });

  useEffect(()=>{
    console.log(userInfo);
  }, [userInfo])

  // 비밀번호 변경 눌렀을 때 비밀번호 변경 서버 요청 onSubmit 이벤트 함수
  function requestPW (e) {
    e.preventDefault();

    // 1. 비밀번호 번경 요청 서버에 보냄
    axios.patch(`${process.env.REACT_APP_API_URL}/user/password`, // <- 나 비밀번호 변경 해도 되니~?
      {currentPassword, password: ChangePassword}, // <- 현재 비밀번호와 바꿀 비밀번호를 body 에 담아서 서버로 전달
      { headers: { accesstoken: accessToken } }// <- password api 에서 얘를 요청 보내라고 했음
      
    ).then(res => { 
      if(res.status === 200) {  // <- 응~ 변경해도 돼~ 
        return
      }}
    ).catch(err => {
      if (err.response.status === 400) { // <- 비밀번호가 안들어왓을 때

      } else if (err.response.status === 400) { // <- 비밀번호가 틀리거나, accessToken이 이상하거나 만료되었거나, 안들어왓을 때

      }}
    )
  }


  // 닉네임 변경 눌렀을 때 닉네임 변경 서버 요청 onSubmit 이벤트 함수
  function requestNickName (e) {
    e.preventDefault();

    // 1. 닉네임 변경 요청 서버에 보냄
    axios.patch(`${process.env.REACT_APP_API_URL}/user/nickname`,
      { nickName: user.nickName }, // <- body (바뀔 nickName)
      { headers: { accesstoken: accessToken} } // <- nickname api 에서 얘를 요청 보내라고 했음
      
      ).then(res => {  // <- res의 data에 accessToken 과, refreshToken 담겨있을 것이다.
        if (res.status === 200) {
          // 2. 리덕스에 있는 유저 인포 업뎃 (dispatch)
          const changedUser = { ...userInfo, nickName: user.nickName };
          dispatch(getUserInfo(changedUser));
        }}
      ).catch (err => {
        if(err.response.status === 400){ // 닉네임이 안들어 왔을 때
          

        }else if(err.response.status === 401){ // accessToken이 이상하거나 만료되거나 안들어왓을 때

        }}
      ) 
  }

      


  // 프로필 이미지 변경 눌렀을 때 프로필 이미지 변경 서버 요청 onSubmit 이벤트 함수
  function requestProfileImage (e) {
    e.preventDefault();

    const file = e.target.files[0];

    const formData = new FormData(); // <- form 태그랑은 다른거임.
    formData.append('img', file);

    axios.patch(`${process.env.REACT_APP_API_URL}/user/profile`,
      formData,
      { headers: { accesstoken: accessToken } }

      ).then(res => { // <- res의 data에 accessToken 과, 쿠키에 refreshToken 담겨있을 것이다.
        if (res.status === 200) {
          const changedUser = { ...userInfo, profile: res.data.profile };
          setUser({ ...user, profile : res.data.profile })
          dispatch(getUserInfo(changedUser));
        }}
      ).catch(err => {
        if(err.response.status === 401){ // <- 유저 권한이 없는 경우
        
      }}
    );
  }    
    

  function requestDeleteProfileImage(){
    axios.delete(`${process.env.REACT_APP_API_URL}/user/profile`)
    .then(res => { // <- res의 data에 accessToken 과, 쿠키에 refreshToken 담겨있을 것이다.
      if(res.status === 200){
        // 기본이미지로 변경해야 함
        const changedUser = { ...userInfo, profile: imgUrl};
        dispatch(getUserInfo(changedUser));
      }
    })
  }

   // 중복확인 및 유효성검사 메세지 나타나게 하는 함수
  function showCheckMessage(key, value){
    setMessage({...message, [key]: value })
  }

  // 중복확인 및 유효성검사 메세지 나타나게 하는 함수
  function showCheckMessage (key, value) {
    console.log(key);

    setMessage({ ...message, [key]: value });
  }

  // 닉네임 중복확인 하는 onClick 이벤트 함수
  function CheckDuplicateNickname (key, e) {
    e.preventDefault();

    axios.get(`${process.env.REACT_APP_API_URL}/user/duplication`,
      { headers: { nickname: user.nickName } }
    ).then(res => {
      if (res.status === 200) {
        showCheckMessage(key, '사용 가능한 닉네임 입니다.');
      }
    }
    ).catch(err => {
      if (err.response.status === 400) {
        showCheckMessage(key, '잘못된 요청입니다.');
      } else if (err.response.status === 409) {
        showCheckMessage(key, '이미 존재하는 닉네임 입니다.');
      }
    });
  }

 

  // 비밀번호 유효성 검사 하여 검사 결과 메세지 나타나게 하는 onChange 이벤트 함수
  function PasswordValidation(key, inputValue){

    const check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(inputValue);
    console.log(check); // true

    if (check) { // <- 위 결과가 true 이면 false
      console.log('유효성 검사 성공');
      showCheckMessage(key, '');
    }else{
      showCheckMessage(key, '비밀번호는 8자 이상 16자 이하, 알파벳과 숫자 및 특수문자를 하나 이상 포함해야 합니다.');
    }
  }

  function PasswordMatchCheck (key, e) {
    console.log(e.target.value);
    if (ChangePassword !== e.target.value) {
      // console.log('노 일치')
      showCheckMessage(key, '비밀번호가 일치하지 않습니다.');
    } else {
      // console.log('일치')
      showCheckMessage(key, '');
    }
  }

  function handleCheckAdmin () {
    setIsAdminCheck(true);
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

          {/* 현재 비밀번호 input */}
          <input  type='password' name='currentPassword' id="currentPassword" value={currentPassword} 
                  placeholder="현재 비밀번호를 입력해주세요"
                  required
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  onKeyUp={(e) => PasswordValidation('validCurrentPW', e.target.value)}/>
          {/* 현재 비밀번호 유효성 검사메세지는 message.validCurrentPW 가 truthy 할때만 나타나도록 해야 한다. */}
          {message.validCurrentPW && <p className="PasswordValidation">{message.validCurrentPW}</p>}
          {/* <p className="PasswordValidation">{message.validCurrentPW}</p> */}
          
          {/* 바뀔 비밀번호 input */}
          <input  type='password' name='ChangePassword' id='ChangePassword' value={ChangePassword} 
                  onChange={(e) => setChangePassword(e.target.value)} 
                  placeholder="수정할 비밀번호를 입력해주세요"
                  required
                  onKeyUp={(e) => PasswordValidation('validPW', e.target.value)}/>
          {/* 유효성 검사메세지는 message.validPW 가 truthy 할때만 나타나도록 해야 한다. */}
          {message.validPW && <p className='PasswordValidation'>{message.validPW}</p>}

          {/* 비밀번호 확인 input */}
          <input  type='password' name='password' id='CheckPassword' value={checkedPassword}
                  required
                  onChange={(e) => setCheckedPassword(e.target.value)} 
                  onKeyUp={(e) => {
                    PasswordMatchCheck('validMatchPW',e)}
                  }/>
                  
          {/* 확인 비밀번호 유효성 검사메세지는 message.validMatchPW 가 truthy 할때만 나타나도록 해야 한다. */}
          {message.validMatchPW && <p className='PasswordValidation'>{message.validMatchPW}</p>}
          {/* 비밀번호 일치 검사메세지는 message.matchPW 가 truthy 할때만 나타나도록 해야 한다. */}
          {message.matchPW && <p className='PasswordMatchCheck'>{message.matchPW}</p>}

          <button type='submit'>비밀번호 변경</button>
        </div>
      </form>

      <form onSubmit={requestNickName}>
        <input  type='text' name='nickName' id='nickName' value={user.nickName} 
                required
                onChange={(e) => setUser({ ...user, nickName: e.target.value })}/>
        <button onClick={(e) => CheckDuplicateNickname('duplicatedNick',e)}>중복확인</button>
        {/* 중복확인 메세지는 message.duplicatedNick 가 truthy 할때만 나타나도록 해야 한다. */}
        {message.duplicatedNick && <p className='CheckDuplicateNickname'>{message.duplicatedNick}</p>}
        <button type='submit'>닉네임 변경</button>
      </form>

      <input type='checkbox' name='' id='' onChange={() => { handleCheckAdmin(); }} />
      <p>아티스트 계정으로 전환하기</p>
      {isAdminCheck && <Condition />}

      <form onSubmit={requestProfileImage}>
        <div className="profile-image">
          <img src={user.profile} alt='프로필 이미지' />
        </div>
        <input type='file' name='img' id='imageChange' style={{ display: 'none' }} />
        <label htmlFor='imageChange' type='submit'>이미지 변경</label>
        <button onClick={requestDeleteProfileImage}>이미지 삭제</button>
      </form>

      <button className='sign-out-btn' onClick={(e) => showSignOutModal(e)}>회원 탈퇴</button>
      {isSignOutModalOpen && <WithDrawalModal visible={isSignOutModalOpen} setIsSignOutModalOpen={setIsSignOutModalOpen} />}
    </>

  );
}

export default MyPage;
