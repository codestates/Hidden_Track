import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Slide from '../../Components/Slide';
import Recommend from '../../Components/Recommend';
import Genre from '../../Components/Genre';
import HashTag from '../../Components/HashTag';

import './index.scss';
import axios from 'axios';
import { useSelector, useStore } from 'react-redux';

function Main () {
  const history = useHistory();
  const { accessToken } = useSelector(state => state.accessTokenReducer);
  const [latestChart, setLastestChart] = useState([]);
  const [popularityChart, setPopularityChart] = useState([]);
  const [recommendChart, setRecommendChart] = useState([]);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/track/charts`, { headers: { accesstoken: accessToken } })
      .then(res => {
        setLastestChart(res.data.latestChart);
        setPopularityChart(res.data.popularitychart);
        setRecommendChart(res.data.recommendChart);
        setTagList(res.data.hashtags);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (

    <div id='main'>
      Welcome to HIDDEN TRACK!!
      <div className='main-slides'>
        <Slide latestChart={latestChart} popularityChart={popularityChart} />
        {/* <Recommend recommendChart={recommendChart}/> */}
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
