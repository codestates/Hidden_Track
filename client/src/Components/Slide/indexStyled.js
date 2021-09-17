import Slider from 'react-slick';
import styled from 'styled-components';


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

