import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Search from '../Search/Search';
import './Nav.css';
import headphone from '../../assets/headphones.png';

function Nav () {
  const history = useHistory();

  function handleLoginBtn (e) {
    e.preventDefault();
    history.push('/login');
  }

  function handleSignUpBtn (e) {
    e.preventDefault();
    history.push('/signup');
  }

  return (
    <header>
      <nav className='navigation'>
        <h1 className='logo'>Hidden Track</h1>
        <Search />
        <div className='button-list'>
          <button className='login' onClick={(e) => handleLoginBtn(e)}>로그인</button>
          <button class='sign-up' onClick={(e) => handleSignUpBtn(e)}>회원가입</button>
          <button className='player'><img className='player-image' src={headphone} alt='player' /></button>
        </div>
      </nav>
    </header>

  );
}
export default Nav;
