import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './index.scss'
import '../../assets/landing1.png'



function Landing(){


  return (
    <div className="container__landing">
      <section id="section1">
          <figure className="landing__section1-figure" role="img" aria-labelledby="cow-caption">
            {/* <img className="landing__section1-img" src='../../assets/landing1.png' alt="" /> */}
            <div className="landing__section1-img"/>
              <figcaption id="landing__section1-figcaption">
                <pre className="landing__section1-pre1">{`판에 박힌 음악차트. 
어제도, 오늘도 똑같은 음악들...`}</pre>
                <pre className="landing__section1-pre2">{`hidden track에서 
색다른 음악, 색다른 아티스트들의 다양한 음악을 즐겨보세요!`}</pre>
              </figcaption>
          </figure>
      </section>

      <section id="section2">          
        <figure className="landing__section1-figure" role="img" aria-labelledby="cow-caption">
          {/* <img className="landing__section1-img" src='../../assets/landing1.png' alt="" /> */}
          <div className="landing__section1-img"/>
            <figcaption id="landing__section1-figcaption">
              <pre className="landing__section1-pre1">{`판에 박힌 음악차트. 
어제도, 오늘도 똑같은 음악들...`}</pre>
              <pre className="landing__section1-pre2">{`hidden track에서 
색다른 음악, 색다른 아티스트들의 다양한 음악을 즐겨보세요!`}</pre>
            </figcaption>
        </figure>
      </section>

      <section id="section3">         
        <figure className="landing__section1-figure" role="img" aria-labelledby="cow-caption">
          {/* <img className="landing__section1-img" src='../../assets/landing1.png' alt="" /> */}
          <div className="landing__section1-img"/>
            <figcaption id="landing__section1-figcaption">
              <pre className="landing__section1-pre1">{`판에 박힌 음악차트. 
어제도, 오늘도 똑같은 음악들...`}</pre>
              <pre className="landing__section1-pre2">{`hidden track에서 
색다른 음악, 색다른 아티스트들의 다양한 음악을 즐겨보세요!`}</pre>
            </figcaption>
          </figure>
      </section>

      <section id="section4">          
        <figure className="landing__section1-figure" role="img" aria-labelledby="cow-caption">
          {/* <img className="landing__section1-img" src='../../assets/landing1.png' alt="" /> */}
          <div className="landing__section1-img"/>
            <figcaption id="landing__section1-figcaption">
              <pre className="landing__section1-pre1">{`판에 박힌 음악차트. 
어제도, 오늘도 똑같은 음악들...`}</pre>
              <pre className="landing__section1-pre2">{`hidden track에서 
색다른 음악, 색다른 아티스트들의 다양한 음악을 즐겨보세요!`}</pre>
            </figcaption>
        </figure>
      </section>

      <section id="section5">          
        <figure className="landing__section1-figure" role="img" aria-labelledby="cow-caption">
          {/* <img className="landing__section1-img" src='../../assets/landing1.png' alt="" /> */}
          <div className="landing__section1-img"/>
            <figcaption id="landing__section1-figcaption">
              <pre className="landing__section1-pre1">{`판에 박힌 음악차트. 
  어제도, 오늘도 똑같은 음악들...`}</pre>
              <pre className="landing__section1-pre2">{`hidden track에서 
  색다른 음악, 색다른 아티스트들의 다양한 음악을 즐겨보세요!`}</pre>
            </figcaption>
        </figure>
      </section>

      <section id="section6">          
        <figure className="landing__section1-figure" role="img" aria-labelledby="cow-caption">
          {/* <img className="landing__section1-img" src='../../assets/landing1.png' alt="" /> */}
          <div className="landing__section1-img"/>
            <figcaption id="landing__section1-figcaption">
              <pre className="landing__section1-pre1">{`판에 박힌 음악차트. 
  어제도, 오늘도 똑같은 음악들...`}</pre>
              <pre className="landing__section1-pre2">{`hidden track에서 
  색다른 음악, 색다른 아티스트들의 다양한 음악을 즐겨보세요!`}</pre>
            </figcaption>
        </figure>
      </section>

      <section id="section7">         
        <figure className="landing__section1-figure" role="img" aria-labelledby="cow-caption">
          {/* <img className="landing__section1-img" src='../../assets/landing1.png' alt="" /> */}
          <div className="landing__section1-img"/>
            <figcaption id="landing__section1-figcaption">
              <pre className="landing__section1-pre1">{`판에 박힌 음악차트. 
어제도, 오늘도 똑같은 음악들...`}</pre>
              <pre className="landing__section1-pre2">{`hidden track에서 
색다른 음악, 색다른 아티스트들의 다양한 음악을 즐겨보세요!`}</pre>
            </figcaption>
        </figure>
      </section>

    </div>
  )
}

export default Landing