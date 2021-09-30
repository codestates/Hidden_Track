// 라이브러리
import React, { useEffect, useState } from 'react';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import '../slick-carousel/slick/slick.css';
import '../slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

// 컴포넌트 import
import Slider from '../react-slick';

import './index.scss';
import playList from '../../DummyData/playList';

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

function Slide () {
  const [isPopular, setPopular] = useState(false);
  const [isRecent, setRecent] = useState(false);

  const [isPopularList, setPopularList] = useState(playList);

  function handleRecent (e) {
    // axios.get('http://localhost:4000/recentList')
    // .then(res => playList = recentList)
    e.preventDefault();
  }

  function handlePopular (e) {
    e.preventDefault();
  }

  return (
    <section className='slide-container'>
      {/* <SlideTitle>인기 서비스</SlideTitle> */}
      {/* <ul> */}
      <div className='slide-btn'>
        <span className='popular' onClick={(e) => handlePopular(e)}>인기</span>
        <span className='recent' onClick={(e) => handleRecent(e)}>최신</span>
      </div>
      <StyledSlider {...settings}>
        {playList.map((slider, i) => {
          const { img } = slider;
          return (
            <div className='slide' key={i}>
              <ImgSlide url={img} />
            </div>
          );
        })}

      </StyledSlider>
      {/* <div className="test">
        앨범 표지 들어갈 공간입니다
      </div> */}
    </section>
  );
}

export default Slide;


export const StyledSlider = styled(Slider)`
  .slick-list { // container 와 같음
      /* position: relative; */
    }
`;

export const ImgSlide = styled.div`
  /* width: 200px; */
  /* height: 200px; */
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  width: ${props => props.className ? ' 150px' : '200px'};
  height: ${props => props.className ? ' 150px' : '200px'};
  padding: ${props => props.className ? '5px' : 0} ;
  /* margin-left: ${props => props.className ? '20px' : 0}; */
`;


// main-slides <div>
//  > slide-container <section> 
//      > slide-container <slide-btn> : 인기 / 추천 
//      > slide-slider <div> 
//          > slick-prev <button> 
//          > slick-list <div> 
//          > slick-next <button> 
