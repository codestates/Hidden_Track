
import React, { useState, useRef, useEffect } from 'react';

import playList from '../../DummyData/playList'; // 배열
import './Slide.scss';

function Slide () {
  // window.onload = updateWidth;

  useEffect(() => {
    updateWidth();
  }, []);

  const ulRef = useRef();
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);
  const slideWidth = 200;
  const slideMargin = 30;
  const slideCount = playList.length;

  const [isUlClassNameOn, setUlClassNameOn] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // 기존 li 데이터들이 들어온 이후에, 화면이 랜더되면 makeCloneLi 이 실행되고
  // makeCloneLi가 실행되면 기존 li의 데이터들이 들어있던 width 값이 늘어나야 한다.
  function updateWidth () {
    console.log(playList.length); // 5

    // 기존 li 데이터들 앞뒤로 복사본이 붙은 이후인 시점에서의 현재 슬라이드 li
    const currentSlides = ulRef.current.childNodes; // NodeList(15)
    console.log(currentSlides);

    // 기존 li 데이터들 앞뒤로 복사본이 붙은 이후인 시점에서의 현재 슬라이드의 갯수
    const newSlideCount = currentSlides.length;
    // console.log(newSlideCount); // 15

    // 기존 li 데이터들 앞뒤로 복사본이 붙은 이후인 시점에서의 현재 ul 전체 영역의 너비
    /* (현재 모든 li 의 각 width + li 의 margin-left)* 현재 li 개수 - 마지막 li 의 margin-left   */
    const newWidth = `${(slideWidth + slideMargin) * newSlideCount - slideMargin}px`;

    console.log(newWidth); // 3420px

    ulRef.current.style.width = newWidth;
    setInitialPosition();
    setTimeout(() => { setUlClassNameOn(true); }, 500);
  }

  // 현재 위치에서 보여지는 슬라이드를 left 를 바꿔서 보여지는게 바꾸는 함수 : 얼만큼 translate 마이너스 해줘야 하는지 알게 하는 함수
  // 현재 전체 ul 의 width 값만큼 마이너스 left 해줘야 한다.
  function setInitialPosition () {
    // 이동할 translate 의 value : - (기본 li 의 width + li의 margin-left ) * 기존 li 개수 px

    const initialTranslateValue = `-${(slideWidth + slideMargin) * slideCount}`;
    console.log(initialTranslateValue); // -1150

    /* slides {
      transform: translateX(-920px)
    } */

    ulRef.current.style.transform = `translateX(${initialTranslateValue}px)`;
  }

  // 다음버튼 눌렀을때 실행되는 이벤트 핸들러
  function nextSlide () {
    // 지금 보고있는 인덱스 번호가 0 이었는데 거기에 1 을 더한걸 넘긴다.
    moveSlide(currentSlideIndex + 1);
  }

  // 이전버튼 눌렀을때 실행되는 이벤트 핸들러
  function prevSlide () {
    moveSlide(currentSlideIndex - 1);
  }

  // 인덱스라는 숫자가 넘어와야지만 작동한다.
  function moveSlide (num) {
  // 현재의 left 값에서 width 값 + margin-left 만큼 이동해야 한다.
    ulRef.current.style.left = -num * (slideWidth + slideMargin) + 'px';

    console.log(ulRef.current.style.left);

    currentSlideIndex = num;
    console.log(currentSlideIndex, slideCount);

    // 더이상 li 갯수가 없을때 마지막에 빈 li 가 보이게 될것이다. => setTimeout 안하면 left 값을 0 으로 만드는 과정이 유저에게 보이게 된다.
    // 현재 보이는 슬라이드의 인덱스가 마지막 인덱스였을 때 해당 인덱스와 슬라이드갯수가 같을때 || 현재 보이는 슬라이드의 인덱스가 첫번째 인덱스였을 때 해당 인덱스와 슬라이드갯수가 같을때
    if (currentSlideIndex === slideCount || currentSlideIndex === -slideCount) {
      setTimeout(function () {
        setUlClassNameOn(false);
        ulRef.current.style.left = '0px';
        currentSlideIndex = 0;
      }, 500);
    }
    setTimeout(function () {
      setUlClassNameOn(true);
    }, 600);
  }

  const cloneSlide = playList.map((el, i) => {
    return (
      <li

        className={`slide img${i + 1} clone`}
        style={{ backgroundImage: `url(${el.img})` }}
      />
    );
  });

  return (
    <div>
      <span>인기</span>
      <span>최신</span>
      <section className='slide-container'>

        <ul className={isUlClassNameOn} ref={ulRef}>
          {cloneSlide}
          {playList.map((el, i) => <li
            className={`slides img${i}`}
            style={{ backgroundImage: `url(${el.img})` }}
                                   />)}
          {cloneSlide}
        </ul>
      </section>
      <div className='btn-box'>
        <button className='prev' ref={prevBtn} onClick={() => { prevSlide(); }}>&#10094;</button>
        <button className='next' ref={nextBtn} onClick={() => { nextSlide(); }}>&#10095;</button>
      </div>
    </div>
  );
}

export default Slide;
