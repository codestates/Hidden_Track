import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Condition from '../Components/SignUp/Condition';
import DefaultSignUp from '../Components/SignUp/DefaultSignUp';

function SignUp () {
  return (

    <>
      <DefaultSignUp />
      <Condition />
    </>
  );
}

export default SignUp;
