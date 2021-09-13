import React from 'react';

function InputPW ({
  inputPW,
  setInputPW,
  PWValidMessage,
  setPWValidMessage,
  inputMatchPW,
  setInputMatchPW,
  matchPWMessage,
  setMatchPWMessage
}) {
  function handlePW (e) {
    setInputPW(e.target.value);
  }

  function handleMatchPW (e) {
    setInputMatchPW(e.target.value);
  }

  function isValidPW () {
    // const pattern1 = /[a-zA-Z]/;
    // const pattern2 = /[~!@#$%^&]/;
    // console.log(pattern1, pattern2)
    // for (let i = 0; i < inputPW.length; i++) {
    //   if (!pattern1.includes(inputPW[i])) {
    //     setPWValidMessage('비밀번호는 영문자(대소문자)를 포함해야 합니다.');
    //   }
    // }

    // if (inputPW.length < 8 || inputPW.length > 16) {
    //   setPWValidMessage('비밀번호는 8자 이상 16자 이하여야 합니다.');
    // }

    const check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(inputPW);
    console.log(check);

    if (!check) {
      setPWValidMessage('비밀번호는 8자 이상 16자 이하, 알파벳과 숫자 및 특수문자를 하나 이상 포함해야 합니다.');
    }

    if (check) {
      setPWValidMessage('');
    }

    if (!inputPW) {
      setPWValidMessage('');
    }
  }

  function isMatchPW () {
    if (inputPW !== inputMatchPW) {
      setMatchPWMessage('비밀번호가 일치하지 않습니다.');
    }

    if (inputPW === inputMatchPW) {
      setMatchPWMessage('');
    }

    if (!inputMatchPW) {
      setMatchPWMessage('');
    }
  }

  return (
    <div>
      <div>
        비밀번호: <input type='password' placeholder='비밀번호를 입력하세요' onChange={(e) => handlePW(e)} onKeyUp={isValidPW} />
        {PWValidMessage ? <p>{PWValidMessage}</p> : null}
      </div>
      <div>
        비밀번호 확인: <input type='password' placeholder='비밀번호 확인' onChange={(e) => handleMatchPW(e)} onKeyUp={isMatchPW} />
        {matchPWMessage ? <p>{matchPWMessage}</p> : null}
      </div>
    </div>
  );
}

export default InputPW;
