import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

function InputID () {
  const [inputId, setInputId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [idLength, setIdLength] = useState(false);

  function InputIdHandler (e) {
    setInputId(e.target.value);
  }

  function isValidId () {
    if (inputId.length < 4) {
      setIdLength(false);
    } else {
      setIdLength(true);
    }
  }

  function isDuplicatedId (e) {
    console.log(e);
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/duplicateid`, {
      loginId: inputId
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setIsValid(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <div>
        아이디: <input type='text' placeholder='아이디를 입력하세요' onChange={(e) => InputIdHandler(e)} onKeyUp={isValidId} required />
      </div>
      {idLength ? null : <p>아이디는 4글자 이상이어야 합니다.</p>}
      <button onClick={(e) => isDuplicatedId(e)}>중복확인</button>
      {isValid ? <p>사용 가능한 아이디 입니다.</p> : <p>중복된 아이디 입니다.</p>}
    </div>
  );
}

export default InputID;
