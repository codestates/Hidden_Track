import React from 'react';
import { useHistory } from 'react-router';
import Slide from '../../Components/Slide';
import Recommend from '../../Components/Recommend';

import './index.scss';

function Main () {
  const history = useHistory();

  function test (e) {
    e.preventDefault();
    history.push('/trackdetails');
  }

  return (
    <div>
      테스트 메인페이지입니다
      {/* <button className='test' onClick={(e) => { test(e); }}>이동</button> */}
      <div className="slides">
        <Slide />
        <Recommend/>
      </div>
    </div>
  );
}

export default Main;
