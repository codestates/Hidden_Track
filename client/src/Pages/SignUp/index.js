import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Condition from './Condition';
import InputID from './InputID';
import InputPW from './InputPW';
import InputNickName from './InputNickName';
import InputImage from './InputImage';
import SignUpModal from './SignUpModal';

import './index.scss';

function SignUp () {
  const [inputId, setInputId] = useState('');
  const [duplicatedIdMessage, setDuplicatedIdMessage] = useState('');
  const [inputPW, setInputPW] = useState('');
  const [PWValidMessage, setPWValidMessage] = useState('');
  const [inputMatchPW, setInputMatchPW] = useState('');
  const [matchPWMessage, setMatchPWMessage] = useState('');
  const [nickValue, setNickValue] = useState('');
  const [duplicatedNickMessage, setDuplicatedNickMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectBtn, setSelectBtn] = useState(false);
  const [agency, setAgency] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('가입이 완료되었습니다.');

  const history = useHistory();

  // 리스너, 아티스트 권한 선택 상태를 변경하는 함수
  function handleRadioBtn (e) {
    if (e.target.value === 'artist') {
      setSelectBtn(true);
    } else {
      setSelectBtn(false);
    }
  }

  // 가입하기 버튼 클릭시 유저 정보를 서버에 보내는 함수
  function requestSignUp (e) {
    e.preventDefault();

    if (!inputId || inputId.length < 4 || duplicatedIdMessage !== '사용 가능한 아이디 입니다.') {
      setText('아이디가 유효하지 않습니다.');
      setIsOpen(true);
    } else if (!inputPW || PWValidMessage || matchPWMessage) {
      setText('비밀번호가 유효하지 않습니다.');
      setIsOpen(true);
    } else if (!nickValue || duplicatedNickMessage !== '사용 가능한 닉네임 입니다.') {
      setText('닉네임이 유효하지 않습니다.');
      setIsOpen(true);
    } else if (!imageFile) { // 차후 url로 변경
      setText('프로필 이미지를 등록해주세요.');
      setIsOpen(true);
    }

    if (!selectBtn) {
      // 리스너로 회원가입하는 경우
      axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, {
        loginId: inputId,
        password: inputPW,
        nickname: nickValue,
        profile: imageUrl,
        admin: 'listener'
      })
        .then(res => {
          console.log('회원가입 요청 응답', res.data);
          if (res.status === 201) {
            setText('가입이 완료되었습니다.');
            setIsOpen(true);
          }
          if (res.status === 400) {
            setText('이미 등록된 사용자 입니다.');
            setIsOpen(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // 아티스트로 회원가입하는 경우
      if (!agency) {
        setText('소속사를 입력해주세요.');
        setIsOpen(true);
      } else if (!date) {
        setText('데뷔일을 입력해주세요.');
        setIsOpen(true);
      } else if (!email) {
        setText('이메일을 입력해주세요.');
        setIsOpen(true);
      }

      axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, {
        loginId: inputId,
        password: inputPW,
        nickname: nickValue,
        profile: imageUrl,
        admin: 'artist',
        agency: agency,
        debut: date,
        email: email
      })
        .then(res => {
          console.log('회원가입 요청 응답', res.data);
          if (res.status === 201) {
            setText('가입이 완료되었습니다.');
            setIsOpen(true);
          }
          if (res.status === 400) {
            setText('이미 등록된 사용자 입니다.');
            setIsOpen(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <div className='sign-up'>
      <h1 onClick={() => history.push('/')}>HIDDEN TRACK</h1>
      <h2>SignUp</h2>
      <form className='container'>
        <div>
          <InputID
            inputId={inputId}
            setInputId={setInputId}
            duplicatedIdMessage={duplicatedIdMessage}
            setDuplicatedIdMessage={setDuplicatedIdMessage}
          />
        </div>
        <div>
          <InputPW
            inputPW={inputPW}
            setInputPW={setInputPW}
            PWValidMessage={PWValidMessage}
            setPWValidMessage={setPWValidMessage}
            inputMatchPW={inputMatchPW}
            setInputMatchPW={setInputMatchPW}
            matchPWMessage={matchPWMessage}
            setMatchPWMessage={setMatchPWMessage}
          />
        </div>
        <div>
          <InputNickName
            nickValue={nickValue}
            setNickValue={setNickValue}
            duplicatedNickMessage={duplicatedNickMessage}
            setDuplicatedNickMessage={setDuplicatedNickMessage}
          />
        </div>
        <div>
          <InputImage imageFile={imageFile} setImageFile={setImageFile} imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </div>
        <input type='radio' name='authority' value='listener' defaultChecked onClick={(e) => handleRadioBtn(e)} />리스너 권한으로 가입
        <input type='radio' name='authority' value='artist' onClick={(e) => handleRadioBtn(e)} />아티스트 권한으로 가입
        {selectBtn ? <div><Condition setAgency={setAgency} setDate={setDate} setEmail={setEmail} /></div> : null}
        <button onClick={(e) => requestSignUp(e)}>가입하기</button>
      </form>
      {isOpen
        ? <div>
          <SignUpModal isOpen={isOpen} setIsOpen={setIsOpen} text={text} setText={setText} />
        </div>
        : null}
    </div>
  );
}

export default SignUp;
