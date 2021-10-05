// 라이브러리
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import './slick.css';
import './slick-theme.css';
import styled from 'styled-components';

import './index.scss';
// import playList from '../../DummyData/playList';

const settings = {
  className: 'center',
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '0px',
  afterChange: function (index) {
    // console.log(
    //   `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    // );
  }
};

function Slide ({ latestChart, popularityChart }) {
  const [chart, setChart] = useState(popularityChart);

  console.log('인기차트', popularityChart); // 인기 Array(10)
  console.log('최신차트', latestChart); // 최신 Array(10)
  console.log(chart);

  function handleRecent (e) {
    e.preventDefault();
    setChart(latestChart);
  }

  function handlePopular (e) {
    e.preventDefault();
    setChart(popularityChart);
  }

  return (
    <div className='slide-container'>
      <div className='slide-btn'>
        <span className='popular' onClick={(e) => handlePopular(e)}>인기</span>
        <span className='recent' onClick={(e) => handleRecent(e)}>최신</span>
      </div>
      <Slider {...settings}>
        {chart.map((slide, i) => {
          const { img, id } = slide;
          return (
            <div className='slide' key={id}>
              <ImgSlide img={img} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Slide;

export const ImgSlide = styled.div`
  /* width: 200px; */
  /* height: 200px; */
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center;
  /* width: ${props => props.className ? ' 150px' : '200px'};
  height: ${props => props.className ? ' 150px' : '200px'};
  padding: ${props => props.className ? '5px' : 0} ; */
   /* margin-left: ${props => props.className ? '20px' : 0}; */
`;

// main-slides <div>
//  > slide-container <section>
//      > slide-container <slide-btn> : 인기 / 추천
//      > slide-slider <div>
//          > slick-prev <button>
//          > slick-list <div>
//          > slick-next <button>
