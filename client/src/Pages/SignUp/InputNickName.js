import React from 'react';
import axios from 'axios';

function InputNickName ({ nickValue, setNickValue, duplicatedNickMessage, setDuplicatedNickMessage }) {
  // 닉네임 입력시 상태에 반영
  function handleNick (e) {
    setNickValue(e.target.value);
    setDuplicatedNickMessage('');
  }

  // 닉네임 중복확인 요청 함수
  function isDuplicatedNick (e) {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/user/duplication`, {
      nickname: nickValue
    })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          setDuplicatedNickMessage('사용 가능한 닉네임 입니다.');
        }
        if (res.status === 409) {
          setDuplicatedNickMessage('중복된 닉네임 입니다.');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      닉네임: <input type='text' placeholder='닉네임을 입력하세요' onChange={(e) => handleNick(e)} />
      <button onClick={(e) => isDuplicatedNick(e)}>중복확인</button>
      {duplicatedNickMessage ? <p>{duplicatedNickMessage}</p> : null}
    </div>
  );
}

export default InputNickName;
