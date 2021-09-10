import React from 'react';
import Condition from '../Components/SignUp/Condition';
import InputID from '../Components/SignUp/InputID';
import InputPW from '../Components/SignUp/InputPW';
import InputNickName from '../Components/SignUp/InputNickName';
import InputImage from '../Components/SignUp/InputImage';

function SignUp () {
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
        <input type='radio' name='authority' />리스너
        <input type='radio' name='authority' />아티스트
        <div>
          <Condition />
        </div>
        <button>가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;