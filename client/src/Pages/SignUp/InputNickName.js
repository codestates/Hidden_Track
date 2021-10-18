import React from 'react';
import axios from 'axios';

function InputNickName ({ inputValue, handleInputValue, validMessage, handleValidMessage }) {
  // 닉네임 입력시 상태에 반영
  function handleNick (e) {
    handleInputValue('nickName', e.target.value);
    if (e.target.value.length <= 10) handleValidMessage('validNick', '');
  }

  // 닉네임 글자수 유효성 검사 함수
  function isValidNick (e) {
    if (e.target.value.length > 15) {
      handleValidMessage('validNick', '닉네임은 15자 이하여야 합니다.');
    } else handleValidMessage('validNick', '');
  }

  // 닉네임 중복확인 요청 함수
  function isDuplicatedNick (e) {
    e.preventDefault();

    if (!inputValue.nickName) return handleValidMessage('validNick', '닉네임을 입력하세요.');
    if (inputValue.nickName.length > 15) return handleValidMessage('validNick', '닉네임은 15자 이하여야 합니다.');

    axios.get(`${process.env.REACT_APP_API_URL}/user/nicknameduplication/${inputValue.nickName}`)
      .then(res => {
        if (res.status === 200) {
          handleValidMessage('validNick', '사용 가능한 닉네임 입니다.');
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          if (err.response.status === 400) {
            handleValidMessage('validNick', '잘못된 요청입니다.');
          }
          if (err.response.status === 409) {
            handleValidMessage('validNick', '이미 등록된 닉네임 입니다.');
          }
        } else console.log(err);
      });
  }

  return (
    <div className='sign-up-nick-box'>
      <div className='sign-up-nick-flex'>
        <input className='sign-up-input-nick' type='text' placeholder='닉네임을 입력하세요' onChange={(e) => handleNick(e)} onKeyDown={(e) => isValidNick(e)} />
        <button className='contents__btn sign-up-nick-btn' onClick={(e) => isDuplicatedNick(e)}>중복확인</button>
      </div>
      {validMessage.validNick ? <p className='sign-up-nick-msg' id={validMessage.validNick === '사용 가능한 닉네임 입니다.' ? 'nick-ok-msg' : null}>{validMessage.validNick}</p> : <p className='sign-up-nick-msg' />}
    </div>
  );
}

export default InputNickName;
