import React, {useState, useRef} from 'react';
import playList from '../../DummyData/playList' // 배열
import './Slide.scss'

function Slide(){

  window.onload = makeCloneSlide;
  const [currentSlideIndex, setCurrentSlideIndex ] = useState(0)
  const slideWidth = 200
  const slideMargin = 30
  const ul = useRef(null)


  // 복사본 만드는 함수 : 기본 li 개수에 따라서 *2 를 한걸, 반으로 나눠서 기본 li의 앞뒤로 붙이는 함수
  function makeCloneSlide() {

    // 기본 li 의 뒤에 붙이는 반복문
    for (let i = 0; i < playList.length; i++) {
      // mySlideLies 의 i 번째의 요소의 자식요소들 다 포함한걸 복사
      const cloneSlide = playList[i].cloneNode(true)

      // 위에서 복사한 li에 클래스명을 clone 이라는걸 추가로 붙힘
      cloneSlide.classList.add('clone')

      // 기본 ul 의 자식으로 맨 뒤에 갖다 붙힘
      ul.append(cloneSlide)
      // slides.appendChild(cloneSlide)
    }

    // 기본 li 의 앞에 붙이는 반복문
    for (let i = playList.length - 1; i >= 0; i--) {
      // mySlideLies 의 i 번째의 요소의 자식요소들 다 포함한걸 복사
      const cloneSlide = playList[i].cloneNode(true)

      // 위에서 복사한 li에 클래스명을 clone 이라는걸 추가로 붙힘
      cloneSlide.classList.add('clone')

      // 기본 ul 의 자식으로 맨 앞에 갖다 붙힘
      ul.prepend(cloneSlide)
    }

    // updateWidth()
    setInitialPosition()
    // setTimeout(()=> {slides.classList.add('animated')}, 100)
    // slides.classList.add('animated')

  }

  // 현재 위치에서 보여지는 슬라이드를 left 를 바꿔서 보여지는게 바꾸는 함수 : 얼만큼 translate 마이너스 해줘야 하는지 알게 하는 함수 
  // 현재 전체 ul 의 width 값만큼 마이너스 left 해줘야 한다. 
  function setInitialPosition() {

    // 이동할 translate 의 value : - (기본 li 의 width + li의 margin-left ) * 기존 li 개수 px
    let initialTranslateValue = `-${(slideWidth + slideMargin)}` * playList.length
    console.log(initialTranslateValue); // -920px

    /* slides { 
      transform: translateX(-920px)
    }*/

    // slides.style.transform = `translateX(${initialTranslateValue}px)`
  }

  // 다음버튼 눌렀을때 실행되는 이벤트 핸들러
  // nextBtn.addEventListener('click', function () {
  //   // 지금 보고있는 인덱스 번호가 0 이었는데 거기에 1 을 더한걸 넘긴다. 
  //   moveSlide(currentSlideIndex + 1)
  // })

  // prevBtn.addEventListener('click', function () {
  //   moveSlide(currentSlideIndex - 1)
  // })


  // 인덱스라는 숫자가 넘어와야지만 작동한다. 
  // function moveSlide(num) {
  //   // 현재의 left 값에서 width 값 + margin-left 만큼 이동해야 한다. 
  //   // slides.style.left = -num * (slideWidth + slideMargin) + 'px'
  //   // console.log(slides.style.left);
  //   setCurrentSlideIndex(num)
  //   // currentSlideIndex = num
  //   console.log(currentSlideIndex, playList.length);


    // 더이상 li 갯수가 없을때 마지막에 빈 li 가 보이게 될것이다. => setTimeout 안하면 left 값을 0 으로 만드는 과정이 유저에게 보이게 된다.

    // 현재 보이는 슬라이드의 인덱스가 마지막 인덱스였을 때 해당 인덱스와 슬라이드갯수가 같을때 || 현재 보이는 슬라이드의 인덱스가 첫번째 인덱스였을 때 해당 인덱스와 슬라이드갯수가 같을때
    if (currentSlideIndex === playList.length || currentSlideIndex === -playList.length) 
    // console.log(currentSlideIndex, slideCount); // 4 4
    setTimeout(function(){
      // slides.classList.remove('animated')
      // slides.style.left = '0px'
      setCurrentSlideIndex(0)
      // currentSlideIndex = 0
    }, 500)
    setTimeout(function(){
      // slides.classList.add('animated')
      // slides.style.left = '0px'
      // currentSlideIndex = 0
    }, 600)
      
    
  
  return(
    <div>
      <span>인기</span>
      <span>최신</span>
    <section className="slide-container" >
      <ul className="slides" Ref={ul}>
        {playList.map((el, i) => <li className="slide" style={{backgroundImage: `url(${el.img})`}}>
        </li>)}

    </ul>
    </section>
    <div className="btn-box">
      <button className="prev">&#10094;</button>
      <button className="next">&#10095;</button>
    </div>
  </div>
  )
}

export default Slide