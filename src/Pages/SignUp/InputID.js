import React from 'react';
import axios from 'axios';

function InputID ({ inputValue, handleInputValue, validMessage, handleValidMessage }) {
  // 아이디 입력값 상태에 반영
  function InputIdHandler (e) {
    handleInputValue('id', e.target.value);
    if (e.target.value.length >= 4 && e.target.value.length <= 15) handleValidMessage('validId', '');
    if (e.target.value.length === 0) handleValidMessage('validId', '');
  }

  // 아이디 글자수 유효성 검사 함수
  function isValidId (e) {
    if (e.target.value.length !== 0) {
      if (e.target.value.length < 4 || e.target.value.length > 15) {
        handleValidMessage('validId', '아이디는 4자 이상 15자 이하여야 합니다.');
      }
    } else handleValidMessage('validId', '');
  }

  // 아이디 중복확인 요청 함수
  function isDuplicatedId (e) {
    e.preventDefault();

    if (inputValue.id.length === 0) return handleValidMessage('validId', '아이디를 입력하세요.');
    if (inputValue.id.length < 4 || inputValue.id.length > 15) return handleValidMessage('validId', '아이디는 4자 이상 15자 이하여야 합니다.');

    axios.get(`${process.env.REACT_APP_API_URL}/user/loginidduplication/${inputValue.id}`)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          handleValidMessage('validId', '사용 가능한 아이디 입니다.');
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          if (err.response.status === 400) handleValidMessage('validId', '잘못된 요청입니다.');
          if (err.response.status === 409) handleValidMessage('validId', '이미 등록된 아이디 입니다.');
        } else console.log(err);
      });
  }

  return (
    <div className='sign-up-id-box'>
      <div className='sign-up-id-area'>
        <span>
          <input className='sign-up-input-id' type='text' placeholder='아이디를 입력하세요' onChange={(e) => InputIdHandler(e)} onKeyUp={(e) => isValidId(e)} />
        </span>
        <button className='sign-up-id-btn' onClick={(e) => isDuplicatedId(e)}>중복확인</button>
      </div>
      {validMessage.validId
        ? <p className='sign-up-id-msg' id={validMessage.validId === '사용 가능한 아이디 입니다.' ? 'id-ok-msg' : null}>{validMessage.validId}</p>
        : <p className='sign-up-id-msg' />}
    </div>
  );
}

export default InputID;
