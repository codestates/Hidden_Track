import React, { useState } from 'react';
import Portal from './Portal';
// import ModalBack from '../../Components/Login/ModalBack'
import './index.scss';

function Login ({ visible, setIsLoginBtn, handleSignUpBtn }) { // 바뀐 State 값인, 바뀐 isLoginBtn 값이 넘어오는 것이다.
  const [inputId, setInputId] = useState('');
  const [idLength, setIdLength] = useState(false);

  function handleModalBack (e) {
    e.preventDefault();
    setIsLoginBtn(false);
  }
  function handleModalBtn (e) {
    e.preventDefault();
    setIsLoginBtn(false);
  }

  function validId (e) {
    const valueId = e.target.value;
    console.log(valueId);
    setInputId(valueId);

    if (valueId.length < 4) {
      setIdLength(false);
    }
    setIdLength(true);
  }

  return (
    <>
      <Portal elementId='modal-root'>
        <div className='modal-back' style={visible ? { display: 'block' } : { display: 'none' }} visible={visible.toString()} onClick={handleModalBack} />
        <div className='modal-container'>
          <h1>Hidden Track</h1>
          <input className='modal__login-id' placeholder='아이디를 입력하세요' type='text' onKeyUp={(e) => validId(e)} />
          {idLength ? null : <p>아이디는 4글자 이상이어야 합니다</p>}
          <input className='modal__login-pw' placeholder='비밀번호' type='password' />
          <div className='keeping-login-sign-up-btn'>
            <div className='keeping-login'>
              <input type='checkbox' />
              <span>로그인 상태 유지</span>
            </div>
            <button onClick={(e) => handleSignUpBtn(e)}>회원가입</button>
          </div>
          <button className='modal__login-btn'>로그인</button>
          <button className='modal__login-btn'>소셜 로그인</button>
          <label for='modal-close-btn' onClick={(e) => handleModalBtn(e)}>X</label>
          <button id='modal-close-btn' style={{ display: 'none' }} />
        </div>
      </Portal>
    </>
  );
}

export default Login;
