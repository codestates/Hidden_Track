// 라이브러리
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// 리덕스 import
import { getAccessToken, getUserInfo, isLoginHandler, isLoginModalOpenHandler } from '../../Redux/actions/actions';

// 컴포넌트 import
import Portal from './Portal';
import KakaoLogin from './KakaoLogin';

// 함수 import
import { accessTokenRequest } from '../../Components/TokenFunction';
import './index.scss';
import cross from '../../assets/cross.png';

function Login ({ setIsShowUserProfileList, handleNotice }) { // 바뀐 State 값인, 바뀐 isLoginBtn 값이 넘어오는 것이다.
  const isLoginModalOpen = useSelector(state => state.isLoginModalOpenReducer).isLoginModalOpen; // isModalOpen 관련
  const dispatch = useDispatch();
  const history = useHistory();

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

  // 로그인 버튼 눌렀을 때 로그인 서버 요청 onClick 이벤트 함수
  function requestLogin (e) {
    e.preventDefault();

    // inputId 와 inputPw 는 state 다
    const body = {
      loginId: inputId,
      password: inputPw,
      headers: {
        'content-type': 'application/json'
      }
    };

    // 로그인 요청 서버에 보냄
    // axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, body)
    axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, body)
      .then(res => { // <- res 에 accessToken 이  있을 것이다.
        if (res.status === 200) { // 너가 보낸 유저 정보를 디비에서 찾음 완료
          // 1. accessToken 을 리덕스 state 에 저장해야 한다.
          dispatch(getAccessToken(res.data.data));
          const accessToken = res.data.data;

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
      }
      ).catch(err => {
        if (err.response) {
          if (err.response.status === 400) { // <- 입력한 아이디값이랑 비번이 디비에 없을 경우
            handleNotice('존재하지 않는 회원입니다. 회원가입을 해주세요', 2000);
          } else if (err.response.status === 401) { // <- not authorized
            handleNotice('아이디 또는 비밀번호가 일치하지 않습니다.', 2000);
          } else if (err.response.status === 404) { // <- not found
            handleNotice('잘못된 요청입니다', 2000);
          }
        }
      });
  }

  // 회원가입 페이지로 넘어가주는 onClick 이벤트
  function handleSignUpBtn (e) {
    e.preventDefault();
    history.push('/signup');
  }
  return (
    <>
      <Portal elementId='modal-root'>
        <div
          className='modal-backdrop__login' style={isLoginModalOpen ? { width: window.innerWidth, display: 'block' } : { display: 'none' }}
          visible={isLoginModalOpen.toString()} onClick={(e) => handleModalBack(e)}
        />
        <form className='modal-container__login' onSubmit={requestLogin}>
          <fieldset>

            <legend className='a11yHidden'>회원 로그인 폼</legend>

            <div className='sign-login' style={{ fontSize: '40px' }}>HIDDENTRACK</div>

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

            {/* <div className='keeping-login-sign-up-btn'> */}
            {/* <div className='keeping-login'>
                <input type='checkbox' />
                <span>로그인 상태 유지</span>
              </div> */}
            <input type='button' className='sign-up-btn' onClick={(e) => handleSignUpBtn(e)} style={{ color: '#fff' }} value='회원가입' />
            {/* </div> */}

            <button
              className='modal__login-btn' type='submit' name='login-btn'
            >로그인
            </button>
            <KakaoLogin />
            <label htmlFor='modal-close-btn' className='modal-close-btn' onClick={(e) => handleModalCloseBtn(e)}><img src={cross} /></label>
            <button id='modal-close-btn' style={{ display: 'none' }} />
          </fieldset>
        </form>
      </Portal>
    </>
  );
}

export default Login;
