import React, {useState } from 'react';
import { useHistory } from 'react-router';
import Slide from '../../Components/Slide';
import Recommend from '../../Components/Recommend';
import Genre from '../../Components/Genre';
import HashTag from '../../Components/HashTag';

import './index.scss';
import { useSelector } from 'react-redux';

function Main () {
  const history = useHistory();
  const { accessToken } = useSelector(state => state.accessTokenReducer);
  const [tagList, setTagList] = useState([]);
  
  return (

    <div id='main'>
      Welcome to HIDDEN TRACK!!
      <div className='main-slides'>
        <Slide/>
        <Recommend />
      </div>
      <div className='main-genre'>
        <Genre />
      </div>
      <div className='main-hashtag'>
        <span>HashTag</span>
        <HashTag tagList={tagList} />
      </div>
    </div>
  );
}

export default Main;
