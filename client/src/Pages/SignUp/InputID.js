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
    console.log(e);
    e.preventDefault();

    axios.get(`${process.env.REACT_APP_API_URL}/user/duplication`, {
      params: {
        loginId: inputValue.id
      }
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          handleValidMessage('duplicatedId', '사용 가능한 아이디 입니다.');
        }
        if (res.status === 409) {
          handleValidMessage('duplicatedId', '중복된 아이디 입니다.');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <span>
        아이디: <input type='text' placeholder='아이디를 입력하세요' onChange={(e) => InputIdHandler(e)} required />
      </span>
      <button onClick={(e) => isDuplicatedId(e)}>중복확인</button>
      {inputValue.id.length >= 4 || inputValue.id.length === 0 ? null : <p>아이디는 4글자 이상이어야 합니다.</p>}
      {validMessage.duplicatedId ? <p>{validMessage.duplicatedId}</p> : null}
    </div>
  );
}

export default InputID;
