import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Condition from './Condition';
import InputID from './InputID';
import InputPW from './InputPW';
import InputNickName from './InputNickName';
import InputImage from './InputImage';
import SignUpModal from './SignUpModal';

import './index.scss';

axios.defaults.withCredentials = true;

function SignUp () {
  const [selectBtn, setSelectBtn] = useState(false);

  // const state = useSelector(state => state.inputIdReducer);
  // console.log(state);
  // const { inputId } = state;
  // const dispatch = useDispatch();

  function handleRadioBtn (e) {
    // console.log(e.target.value);
    if (e.target.value === 'artist') {
      setSelectBtn(true);
    } else {
      setSelectBtn(false);
    }
  }

  function requestSignUp (e) {
    e.preventDefault();
  }

  return (
    <div className='sign-up'>
      <h1>HIDDEN TRACK</h1>
      <h2>SignUp</h2>
      <form className='container'>
        <div>
          <InputID />
        </div>
        <div>
          <InputPW />
        </div>
        <div>
          <InputNickName />
        </div>
        <div>
          <InputImage />
        </div>
        <input type='radio' name='authority' value='listener' defaultChecked onClick={(e) => handleRadioBtn(e)} />리스너 권한으로 가입
        <input type='radio' name='authority' value='artist' onClick={(e) => handleRadioBtn(e)} />아티스트 권한으로 가입
        {selectBtn ? <div><Condition /></div> : null}
        <button onClick={(e) => requestSignUp(e)}>가입하기</button>
      </form>
      <div>
        <SignUpModal />
      </div>
    </div>
  );
}

export default SignUp;
