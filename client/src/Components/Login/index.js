// 라이브러리
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// 리덕스 import
import { getAccessToken, getUserInfo, isLoginHandler, isLoginModalOpenHandler } from '../../Redux/actions/actions';

// 컴포넌트 import
import Portal from './Portal';

// 함수 import
import { accessTokenRequest } from '../../Components/TokenFunction';

import './index.scss';

function Login ({ showUserProfileList, isShowUserProfileList, setIsShowUserProfileList }) { // 바뀐 State 값인, 바뀐 isLoginBtn 값이 넘어오는 것이다.
  const state1 = useSelector(state => state.isLoginReducer); // isLogin 관련
  const state2 = useSelector(state => state.isLoginModalOpenReducer); // isModalOpen 관련
  const state3 = useSelector(state => state.accessTokenReducer); // accessToken 관련
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLogin } = state1;
  const { isLoginModalOpen } = state2;
  const { accessToken } = state3;

  // console.log(accessToken);

  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  // 로그인 모달창 밖의 배경을 누르면 모달창이 꺼지는 onClick 이벤트
  function handleModalBack (e) {
    e.preventDefault();

    // isLoginModalOpenHandler 라는 리덕스의 action 의 인수로, false 전달하여 리덕스의 state 업데이트
    dispatch(isLoginModalOpenHandler(false));
  }

  // id 인풋값 바꿔주는 onChange 이벤트
  function changeIdValue (e) {
    e.preventDefault();

    // id 인풋값 바꿔주는 setState
    setInputId(e.target.value);
  }

  // password 인풋값 바꿔주는 onChange 이벤트
  function changePwValue (e) {
    e.preventDefault();

    // password 인풋값 바꿔주는 setState
    setInputPw(e.target.value);
  }

  // 모달창의 x 버튼 눌렀을때 모달창이 꺼지는 onClick 이벤트
  function handleModalCloseBtn (e) {
    e.preventDefault();

    // isLoginModalOpenHandler 라는 리덕스의 action 의 인수로, false 전달하여 리덕스의 state 업데이트
    dispatch(isLoginModalOpenHandler(false));
  }

  // 회원가입 페이지로 넘어가주는 onClick 이벤트
  function handleSignUpBtn (e) {
    e.preventDefault();
    history.push('/signup');
  }

  // 로그인 버튼 눌렀을 때 로그인 서버 요청 onClick 이벤트 함수
  async function requestLogin (e) {
    e.preventDefault();

    // inputId 와 inputPw 는 state 다
    const body = {
      loginId: inputId,
      password: inputPw
    };
    console.log(body);
    // 로그인 서버 요청

    await axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, body)
      .then(res => { // <- res 에 accessToken 이  있을 것이다.
        if (res.status === 200) { // 너가 보낸 유저 정보를 디비에서 찾음 완료
          // 1. accessToken 을 리덕스 state 에 저장해야 한다.
          dispatch(getAccessToken(res.data.data));
          // // 2. 받아온 토큰으로 다시 유저 정보를 주세요 하는 요청을 서버에 요청해야 한다. (헤더에 서버가 보내준 accessToken 받아서 보내줘야 한다.)
          // axios.get(`${process.env.REACT_APP_API_URL}/user/userinfo`,
          //   { headers: { accesstoken: res.data.data } },
          //   { withCredentials: true }
          // ).then(res => { // <- res 에 userInfo 가 담길것이다.
          //   if (res.status === 200) { // <- 너가 보낸 accessToken이 내가 보냈던 accessToken 이랑 맞아
          //     // <- 맞으니까, 너가 보낸 유저 정보 보내줄게
          //     // 서버에서 받아온, 내가 보냈던 유저 정보와 같은 유저 정보로 리덕스 state 업데이트
          //     dispatch(getUserInfo(res.data.data));
          //     // 리덕스의 store에 있는 isLogin 이라는 State을 true 로 바꿔서 저장시키는 역할을 하는  dispatch 메소드를 사용해야 한다.
          //     dispatch(isLoginHandler(true));
          //     // 모달창 꺼주는 함수
          //     handleModalCloseBtn(e);
          //     // 프로필 사진 눌렀을때 보이는 리스트들 숨겨주는 setState
          //     setIsShowUserProfileList('hide');
          //   }
          // });
          console.log('액세스토큰', accessToken);
          // 위의 주석코드를 tokenFunction 으로 리펙토링 한 코드
          // console.log(accessTokenResult); // Promise
          accessTokenRequest(accessToken) // <- userInfo 담길것이다. (status 200)
            .then(accessTokenResult => {
              if (accessTokenResult) { // <- userInfo 가 있다면
                // 서버에서 받아온, 내가 보냈던 유저 정보와 같은 유저 정보로 리덕스 state 업데이트
                dispatch(getUserInfo(accessTokenResult));

                // 리덕스의 store에 있는 isLogin 이라는 State을 true 로 바꿔서 저장시키는 역할을 하는  dispatch 메소드를 사용해야 한다.
                dispatch(isLoginHandler(true));

                // 모달창 꺼주는 함수
                handleModalCloseBtn(e);

                // 프로필 사진 눌렀을때 보이는 리스트들 숨겨주는 setState
                setIsShowUserProfileList('hide');
              }
            });
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400) { // <- 입력한 아이디값이랑 비번이 디비에 없을 경우
            console.log('400 에러다');
          } else if (err.response.status === 401) {
            console.log('401 에러다');
          } else if (err.response.status === 404) {
            console.log('404 에러다');
          }
        } else console.log(err);
      });
  }

  return (
    <>
      <Portal elementId='modal-root'>
        <div
          className='modal-backdrop__login' style={isLoginModalOpen ? { display: 'block' } : { display: 'none' }}
          visible={isLoginModalOpen.toString()} onClick={handleModalBack}
        />
        <form className='modal-container__login' onSubmit={requestLogin}>
          <fieldset>
            <legend className='a11yHidden'>회원 로그인 폼</legend>
            <h1>Hidden Track</h1>
            <input
              className='modal__login-id' placeholder='아이디를 입력하세요'
              type='text'
              value={inputId}
              required
              onChange={(e) => changeIdValue(e)}
            />
            <input
              className='modal__login-pw' placeholder='비밀번호를 입력하세요'
              type='password'
              value={inputPw}
              required
              onChange={(e) => { changePwValue(e); }}
            />
            <div className='keeping-login-sign-up-btn'>
              <div className='keeping-login'>
                <input type='checkbox' />
                <span>로그인 상태 유지</span>
              </div>
              <button onClick={(e) => handleSignUpBtn(e)}>회원가입</button>
            </div>
            <button
              className='modal__login-btn' type='submit' name='login-btn'
            >로그인
            </button>
            <button className='modal__login-btn' name='oauth-login-btn'>소셜 로그인</button>
            <label htmlFor='modal-close-btn' className='modal-close-btn' onClick={(e) => handleModalCloseBtn(e)}>X</label>
            <button id='modal-close-btn' style={{ display: 'none' }} />
          </fieldset>
        </form>
      </Portal>
    </>
  );
}

export default Login;
