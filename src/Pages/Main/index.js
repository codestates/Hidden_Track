import React, {useState } from 'react';
import { useHistory } from 'react-router';
import Slide from '../../Components/Slide';
import Recommend from '../../Components/Recommend';
import Genre from '../../Components/Genre';
import HashTag from '../../Components/HashTag';

import './index.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Main () {
  const history = useHistory();
  const { accessToken } = useSelector(state => state.accessTokenReducer);
  const [tagList, setTagList] = useState([]);


  return (

    <div id='main'>
      <h1 className='main-h1'>Welcome to HIDDEN TRACK!!</h1>
      <div className='main-slides'>
        <Slide/>
        <Recommend/>
      </div>
      <div className='main-genre'>
        <Genre />
      </div>
      <div className='main-hashtag'>
        <span className='main-hashtag-title'>HashTags</span>
        <HashTag />
      </div>
    </div>
  );
}

export default Main;
