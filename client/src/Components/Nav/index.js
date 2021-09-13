import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Search from '../Search';
import Login from '../Login';
import './index.scss';
import headphone from '../../assets/headphones.png';

function Nav () {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // <- 얘도 리덕스 전역 Store 에 있어야 한다.
  const [isShowUserProfileList, setIsShowUserProfileList] = useState('hide');
  const [isLLogin, setIsLLogin] = useState(false);

  const history = useHistory();

  function showModal (e) {
    e.preventDefault();
    setIsLoginModalOpen(true);
  }

  function handleSignUpBtn (e) {
    e.preventDefault();
    history.push('/signup');
  }

  function showUserProfileList (e) {
    e.preventDefault();
    if (isShowUserProfileList === 'hide') {
      setIsShowUserProfileList('show-user-profile-list');
    } else if (isShowUserProfileList === 'show-user-profile-list') {
      setIsShowUserProfileList('hide');
    }
  }

  // 로그인 되어있느냐 안되어있느냐의 여부(isLogin 이라는 전역상태)에 따라 로그인 이라는 텍스트가 보이고, 프로필 사진이 보이게끔

  // 로그인 모달창을 다른페이지에서도 쓰기 때문에 로그인 모달창을 활성화하는 여부를 isLogin 이라는 전역상태에 연동시켜야 한다.

  return (
    <header>
      <nav className='navigation'>
        <Link to='/'>
          <h1 className='logo'>Hidden Track</h1>
        </Link>
        <Search />

        {isLLogin
          ? <div className='button-list-of-profile-image'>
            <input
              type='button' className='navigation__profile-image'
              onClick={(e) => showUserProfileList(e)}
            />
            <ul className={isShowUserProfileList}>
              <li>음원 등록</li>
              <li>마이 페이지</li>
              <li>로그아웃</li>
            </ul>
            <button className='navigation__player-btn'>
              <img className='player-image' src={headphone} alt='player' />
            </button>
          </div>
          : <div className='button-list'>
            <button
              className='navigation__login-btn'
              onClick={(e) => showModal(e)}
            >로그인
            </button>
            <button
              className='navigation__sign-up-btn'
              onClick={(e) => handleSignUpBtn(e)}
            >회원가입
            </button>
            <button className='navigation__player-btn'>
              <img className='player-image' src={headphone} alt='player' />
            </button>
          </div>}
        {isLoginModalOpen
          ? <Login
              visible={isLoginModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
              handleSignUpBtn={handleSignUpBtn}
              setIsLLogin={setIsLLogin}
            />
          : null}
      </nav>
    </header>

  );
}
export default Nav;
