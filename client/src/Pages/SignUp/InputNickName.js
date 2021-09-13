import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

function InputNickName () {
  const [nickValue, setNickValue] = useState('');
  const [duplicatedMessage, setDuplicatedMessage] = useState('');

  function handleNick (e) {
    setNickValue(e.target.value);
  }

  function isDuplicatedNick (e) {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/duplicatenickname`, {
      nickName: nickValue
    })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          setDuplicatedMessage('사용 가능한 닉네임 입니다.');
        } else {
          setDuplicatedMessage('중복된 닉네임 입니다.');
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
      {duplicatedMessage || null}
    </div>
  );
}

export default InputNickName;
