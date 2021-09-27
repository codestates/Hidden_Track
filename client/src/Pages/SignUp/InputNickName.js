import React from 'react';
import axios from 'axios';

function InputNickName ({ inputValue, handleInputValue, validMessage, handleValidMessage }) {
  // 닉네임 입력시 상태에 반영
  function handleNick (e) {
    handleInputValue('nickName', e.target.value);
    handleValidMessage('duplicatedNick', '');
  }

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  // 닉네임 중복확인 요청 함수
  function isDuplicatedNick (e) {
    e.preventDefault();

    if (!inputValue.nickName) return handleValidMessage('duplicatedNick', '닉네임을 입력하세요.');

    axios.get(`${process.env.REACT_APP_API_URL}/user/nicknameduplication/${inputValue.nickName}`)
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          handleValidMessage('duplicatedNick', '사용 가능한 닉네임 입니다.');
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          if (err.response.status === 400) {
            handleValidMessage('duplicatedNick', '잘못된 요청입니다.');
          }
          if (err.response.status === 409) {
            handleValidMessage('duplicatedNick', '이미 등록된 닉네임 입니다.');
          }
        } else console.log(err);
      });
  }

  return (
    <div className='sign-up-nick-box'>
      <div>
        닉네임: <input type='text' placeholder='닉네임을 입력하세요' onChange={(e) => handleNick(e)} />
        <button onClick={(e) => isDuplicatedNick(e)}>중복확인</button>
      </div>
      {validMessage.duplicatedNick ? <p className='sign-up-nick-msg' id={validMessage.duplicatedNick === '사용 가능한 닉네임 입니다.' ? 'nick-ok-msg' : null}>{validMessage.duplicatedNick}</p> : <p className='sign-up-nick-msg' />}
    </div>
  );
}

export default InputNickName;
