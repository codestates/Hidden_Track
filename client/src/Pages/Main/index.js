import React, { useEffect, useState } from 'react';
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
  const [latestChart, setLatestChart] = useState([]);
  const [popularityChart, setPopularityChart] = useState([]);
  const [recommendChart, setRecommendChart] = useState([]);
  const [tagList, setTagList] = useState([]);
  /// ?????
  // useEffect(() => {
  //   // let abortController = new AbortController()
  //   axios.get(`${process.env.REACT_APP_API_URL}/track/charts/all`, { headers: { accesstoken: accessToken } })
  //     .then(res => {
  //       console.log('메인 all',res.data)
  //       setLatestChart(res.data.latestchart);
  //       setPopularityChart(res.data.popularchart);
  //       setRecommendChart(res.data.recommendchart);
  //       setTagList(res.data.hashtags);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  // }, []);

  return (

    <div id='main'>
      <h1 className='main-h1'>Welcome to HIDDEN TRACK!!</h1>
      <div className='main-slides'>
        <Slide latestChart={latestChart} popularityChart={popularityChart} />
        <Recommend recommendChart={recommendChart} />
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
