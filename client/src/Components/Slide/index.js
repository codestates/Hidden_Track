import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import './index.scss'
// import StyledSlider from './indexStyled'
// import ImgSlide from './indexStyled'
// import './App.css'
import playList from '../../DummyData/playList'

const settings = {
  className: "center",
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerMode: true,
  // centerPadding: "60px",
  centerPadding: "0px",
  afterChange: function(index) {
    console.log(
      `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    );
  }
};

function Slide () {
  
  function GoToServey(id){
    console.log('성공?');
    console.log(id);
  }


  return (
    <section className="slide-container">
      {/* <SlideTitle>인기 서비스</SlideTitle> */}
      {/* <ul> */}
      <StyledSlider {...settings}>
      {playList.map((slider, i) => {
          const {img} = slider;
          return (
            <div className="slide" key={i} onClick={() => GoToServey(i)}>
              <ImgSlide url={img}/>
            </div>
          )
      })}
        </StyledSlider>
        {/* </ul> */}
    </section>
  );
}

export default Slide;

export const StyledSlider = styled(Slider)`
  .slick-list { // container 와 같음
      width: 890px;
      /* 890 내로 li가 안들어가는 건 overflow hidden 으로 안보이게 해놓음*/
      margin: 0 auto;
      height: 200px;
      overflow: hidden;
    }
`

export const ImgSlide = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
`

