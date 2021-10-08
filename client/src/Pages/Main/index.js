import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Slide from '../../Components/Slide';
import Recommend from '../../Components/Recommend';
import Genre from '../../Components/Genre';
import HashTag from '../../Components/HashTag';
import Footer from '../../Components/Footer';
import mainImg from '../../assets/cyber3.jpg';
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

    <div id='main' style={{ height: window.innerHeight }}>
      {/* <button onClick={moveLanding}>랜딩</button> */}
      <div className='main-slides'>
        <Slide />
        <Recommend />
      </div>
      <div className='main-genre'>
        <span className='main-genre-title sign-two'>G e n r e</span>
        <Genre />
      </div>
      <div className='main-hashtag'>
        <span className='main-hashtag-title sign-three'>H a s h T a g s</span>
        <HashTag />
      </div>
      {/* <div className='main-img'> */}
        {/* <img src={mainImg} />      */}

        {/* <div class="sign-two">
        <i class="fa fa-heart-o currency" aria-hidden="true"></i>
        <div class="off">G</div>IRLS
        <i class="fa fa-heart-o currency" aria-hidden="true"></i>
        GI<div class="off">RL</div>S
        <i class="fa fa-heart-o currency heart-off" aria-hidden="true"></i>
        GIRLS
      </div> */}

        {/*  <div class="sign-one">
        <i class="fa fa-heart-o heartoff" aria-hidden="true"></i>
        <div class="on">M</div>
        <div class="heartoff">U</div>
        <div class="on">S</div>
        <div class="heartoff">I</div>
        <div class="on">C</div>
        <i class="fa fa-heart-o " aria-hidden="true"></i>
        <i class="fa fa-heart-o heartoff" aria-hidden="true"></i>
      </div>
*/}
      {/* </div> */}

      <Footer />


    </div>
  );
}

export default Main;
