import React from 'react';
import axios from 'axios';

function InputID ({ inputValue, handleInputValue, validMessage, handleValidMessage }) {
  // 아이디 입력값 상태에 반영
  function InputIdHandler (e) {
    handleInputValue('id', e.target.value);
    handleValidMessage('duplicatedId', '');
  }

  // 아이디 중복확인 요청 함수
  function isDuplicatedId (e) {
    e.preventDefault();

    if (inputValue.id.length < 4) return handleValidMessage('duplicatedId', '아이디를 입력하세요.');

    axios.get(`${process.env.REACT_APP_API_URL}/user/duplication`, {
      headers: {
        loginid: inputValue.id
      }
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          handleValidMessage('duplicatedId', '사용 가능한 아이디 입니다.');
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          if (err.response.status === 400) handleValidMessage('duplicatedId', '잘못된 요청입니다.');
          if (err.response.status === 409) handleValidMessage('duplicatedId', '이미 등록된 아이디 입니다.');
        } else console.log(err);
      });
  }

  return (
    <div className='sign-up-id-box'>
      <div>
        <span>
          아이디: <input type='text' placeholder='아이디를 입력하세요' onChange={(e) => InputIdHandler(e)} required />
        </span>
        <button onClick={(e) => isDuplicatedId(e)}>중복확인</button>
      </div>
      {validMessage.duplicatedId
        ? <p className='sign-up-id-msg' id={validMessage.duplicatedId === '사용 가능한 아이디 입니다.' ? 'id-ok-msg' : null}>{validMessage.duplicatedId}</p>
        : <>{inputValue.id.length >= 4 || inputValue.id.length === 0 ? <p className='sign-up-id-msg' /> : <p className='sign-up-id-msg'>아이디는 4글자 이상이어야 합니다.</p>}</>}
    </div>
  );
}

export default InputID;
