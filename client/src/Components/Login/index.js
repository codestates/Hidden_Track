import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginHandler, isLoginModalOpenHandler } from '../../Redux/actions/actions';
import Portal from './Portal';
import './index.scss';

function Login () { // 바뀐 State 값인, 바뀐 isLoginBtn 값이 넘어오는 것이다.
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const state1 = useSelector(state => state.isLoginReducer); // isLogin 관련
  const state2 = useSelector(state => state.isLoginModalOpenReducer); // isModalOpen 관련
  const dispatch = useDispatch();

  const { isLogin } = state1;
  const { isLoginModalOpen } = state2;

  console.log(isLogin, isLoginModalOpen);

  const history = useHistory();

  function handleModalBack (e) {
    e.preventDefault();
    // setIsLoginModalOpen(false);
    dispatch(isLoginModalOpenHandler(false));
  }

  function changeIdValue (e) {
    e.preventDefault();
    setInputId(e.target.value);
  }

  function changePwValue (e) {
    e.preventDefault();
    setInputPw(e.target.value);
  }

  function handleModalCloseBtn (e) {
    e.preventDefault();
    // setIsLoginModalOpen(false);
    dispatch(isLoginModalOpenHandler(false));
  }

  function handleSignUpBtn (e) {
    e.preventDefault();
    history.push('/signup');
  }

  function requestLogin (e) {
    e.preventDefault();

    const body = {
      logInId: inputId,
      password: inputPw
    };

    axios.post('http://localhost:4000/user/signin', body)
      .then(res => {
        console.log('서버에 보낸 로그인 데이터  >>>>>');
        console.log(res);
        // 1. 서버에서 토큰을 받아와야 한다.
        // res. <- 토큰을 쿠키에 담을지 윤근님께 질문하기.

        // 2. 받아온 토큰으로 다시 유저 정보를 주세요 하는 요청을 서버에 요청해야 한다.
        // (토큰은 cookies 에 담겨져있을 것이다.)
        // axios.post('https://hiddentrack.link/user/accesstoken',
        //  withCredentials : true => 헤더에 쿠키를 자동으로 보내주는 역할을 한다.
        // {withCredentials : true }
        // 토큰을 body 보내면 안된다. 헤더에 보내야 한다.

        // .then(res => if())      // <- res 의 body에 있는 유저정보가 담겨있을 것이다. /  res 에 유저정보가 안 담겨있을 것이다.
        // <- 받아온 유저정보를 리덕스 store 의 상태에 저장시키는 코드를 써야 한다. : dispatch 메소드를 사용해야 한다는 것이다.
        // <- 리덕스의 store에 있는 isLogin 이라는 State을 true 로 바꿔서 저장시키는 역할을 하는  dispatch 메소드를 사용해야 한다.
        // <- isLogin 이 true 가 되면 로그인 버튼은 프로필 사진으로 바뀌어야 한다. <- 이건 굳이 이 파일에서 안해도 된다.
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
              onClick={(e) => {
              // setIsLLogin(true)
                dispatch(isLoginHandler(true));
                handleModalCloseBtn(e);
              }}
            >로그인
            </button>
            <button className='modal__login-btn' name='oauth-login-btn'>소셜 로그인</button>
            <label for='modal-close-btn' onClick={(e) => handleModalCloseBtn(e)}>X</label>
            <button id='modal-close-btn' style={{ display: 'none' }} />
          </fieldset>
        </form>
      </Portal>
    </>
  );
}

export default Login;
