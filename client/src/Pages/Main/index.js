import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Slide from '../../Components/Slide';
import Recommend from '../../Components/Recommend';
import Genre from '../../Components/Genre';
import HashTag from '../../Components/HashTag';

import './index.scss';
import { useSelector } from 'react-redux';

function Main () {
  const history = useHistory();
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
      <div className='main-slides'>
        <Slide  />
        <Recommend />
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
