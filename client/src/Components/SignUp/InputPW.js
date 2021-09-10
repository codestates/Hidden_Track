import React, { useState } from 'react';

function InputPW () {
  const [inputPW, setInputPW] = useState('');
  const [PWValidMessage, setPWValidMessage] = useState('');

  function handlePW (e) {
    setInputPW(e.target.value);
  }
     
  function isValidPW () {
    const pattern1 = /[a-zA-Z]/;
    const pattern2 = /[~!@#$%^&*]/;

    for (let i = 0; i < inputPW.length; i++) {
      if (inputPW[i] !== pattern1) {
        setPWValidMessage('비밀번호는 영문자(대소문자)를 포함해야 합니다.');
      }
    }

    if (inputPW.length < 8 || inputPW.length > 16) {
      setPWValidMessage('비밀번호는 8자 이상 16자 이하여야 합니다.');
    }
  }

  return (
    <div>
      <input type='password' placeholder='비밀번호를 입력하세요' onChange={(e) => handlePW(e)} />
      <input type='password' placeholder='비밀번호 확인' />
    </div>
  );
}

export default InputPW;
