// 라이브러리
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import Cookies from 'universal-cookie';

// 리덕스 import
import { isLoginHandler, isLoginModalOpenHandler } from '../../Redux/actions/actions';

// 컴포넌트 import
import Search from '../Search';
import Login from '../Login';
import Sidebar from './Sidebar';

import './index.scss';
import headphone from '../../assets/headphones (2).png';

function Nav ({ handleNotice }) {
  const [isShowUserProfileList, setIsShowUserProfileList] = useState('hide');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isLogin = useSelector(state => state.isLoginReducer).isLogin; // isLogin 관련
  const isLoginModalOpen = useSelector(state => state.isLoginModalOpenReducer).isLoginModalOpen; // isModalOpen 관련
  const userInfo = useSelector(state => state.userInfoReducer); // isModalOpen 관련
  const dispatch = useDispatch();
  const history = useHistory();
  // const cookies = new Cookies();

  // 헤드폰 모양을 누르면 사이드바가 나타나도록 해주는 onClick 이벤트
  function showSidebar (e) {
    e.preventDefault();
    setIsSidebarOpen(!isSidebarOpen);
  }
  // 로그인 버튼을 눌렀을때 로그인 모달창 뜨도록 해주는 onClick 이벤트
  function showModal (e) {
    e.preventDefault();

    // isLoginModalOpenHandler 라는 리덕스의 action 의 인수로, true 전달하여 리덕스의 state 업데이트
    dispatch(isLoginModalOpenHandler(true));
  }

  // 프로필 사진 눌렀을때 리스트들 보여주는 onClick 이벤트
  function showUserProfileList (e) {
    e.preventDefault();

    // 프로필 사진 누르기전에는 리스트들(ul)이 안보이도록 className 이 'hide' 이기 때문에 className 바꿔서 리스트들 보이도록 해줌
    setIsShowUserProfileList('show-user-profile-list');

    // 프로필 사진 눌러서 나오는 리스트들(ul)의 className이 'show-user-profile-list' 이면 다시 프로필 사진
    // 누르면 안보이도록 해주는 코드
    if (isShowUserProfileList === 'show-user-profile-list') {
      setIsShowUserProfileList('hide');
    }
  }

  // 음원등록 버튼 누르면 음원등록 페이지로 넘어가주는 onClick 이벤트
  function moveModiCreatePage (e) {
    e.preventDefault();

    setIsShowUserProfileList('hide');
    history.push('/modicreate');
  }

  // 마이페이지 버튼 누르면 마이페이지 로 넘어가주는 onClick 이벤트
  function moveMyPage (e) {
    e.preventDefault();

    // // 프로필 사진 눌렀을때 보이는 리스트들 숨겨주는 setState
    setIsShowUserProfileList('hide');
    history.push('/mypage');
  }

  // 로그아웃 버튼 눌렀을 때 로그아웃 서버 요청 onClick 이벤트 함수
  function requestSignOut (e) {
    e.preventDefault();

    // 로그아웃 서버 요청
    axios.get(`${process.env.REACT_APP_API_URL}/user/signout`,
      { withCredentials: true }) // <- refreshToken 이 필요하기 때문에 넣음
      .then(res => {
        if (res.status === 200) {
        // isLoginHandler 라는 리덕스의 action 의 인수로, false 전달하여 리덕스의 state 업데이트
          dispatch(isLoginHandler(false));
          // refreshToken 가 담긴 cookie 삭제
          history.push('/main');
        }
      }
      ).catch(err => {
      // 뭔가 알림모달을 띄우게
        if (err.response) {
          if (err.response.status === 400) { // <- refreshToken 이 안들어왔을때
            handleNotice('권한이 없습니다', 2000);
          } else if (err.response.status === 404) { // <- 들어오는 refreshToke과 일치하는 것이 없을때
            handleNotice('잘못된 요청입니다', 2000);
          }
        }
      });
  }

  return (
    <header>

      <Sidebar isSidebarOpen={isSidebarOpen} showSidebar={showSidebar} handleNotice={handleNotice} />

      <nav className='navigation'>
        <Link to='/main'>
          {/* <h1 className='logo'>Hidden Track</h1> */}
          <div className='logo sign-one'>
            <span className='one-onOff-2'>HIDDEN</span><span className='one-onOff'>TRACK</span>
          </div>

        </Link>
        <Search />
        {
        isLogin
          ? <div className='button-list-of-profile-image'>
            <input
              type='button' className='navigation__profile-image'
              onClick={(e) => showUserProfileList(e)}
              style={{ backgroundImage: `url(${userInfo.profile})` }}
            />
            <ul className={isShowUserProfileList}>
              {userInfo.admin === 'listener' ?
                null
                : <li onClick={(e) => moveModiCreatePage(e)}>음원 등록</li>
              }
              <li onClick={(e) => moveMyPage(e)}>마이 페이지</li>
              <li onClick={(e) => requestSignOut(e)}>로그아웃</li>
            </ul>
            <button className='navigation__player-btn'>
              <img
                className='player-image' src={headphone} alt='player' onClick={(e) => {
                  showSidebar(e);
                }}
              />
            </button>
          </div>
          : <div className='button-list'>
            <button
              className='navigation__login-btn'
              onClick={(e) => showModal(e)}
            >로그인
            </button>
            <Link to='/signup'>
              <button className='navigation__sign-up-btn'>회원가입</button>
            </Link>
            <button className='navigation__player-btn'>
              <img
                className='player-image' src={headphone} alt='player' onClick={(e) => {
                  showSidebar(e);
                }}
              />
            </button>
          </div>
          }

        {isLoginModalOpen && <Login
          showUserProfileList={showUserProfileList}
          isShowUserProfileList={isShowUserProfileList}
          setIsShowUserProfileList={setIsShowUserProfileList}
          handleNotice={handleNotice}
                             />}
      </nav>
    </header>

  );
}
export default Nav;
