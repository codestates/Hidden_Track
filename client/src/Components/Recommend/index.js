import React, { useEffect, useState } from 'react';
import './index.scss';
import playList from '../../DummyData/playList';
import styled from 'styled-components';

function Recommend ({ recommendChart }) {
  // const [isIndex, setIsIndex] = useState(0);
  // const [isRecommendImage, setIsRecommendImage] = useState(playList[isIndex].img);
  // const [isArtist, setIsArtist] = useState(playList[isIndex].user.nickname);
  // const [isTitle, setIsTitle] = useState(playList[isIndex].title);

  // console.log(isRecommendImage);
  // useEffect(() => {
  //   if (isIndex === playList.length - 1) {
  //     setTimeout(() => {
  //       setIsIndex(0);
  //     }, 990);
  //   }

  //   const timeout = setInterval(() => setIsIndex(isIndex + 1), 2000);
  //   setIsRecommendImage(playList[isIndex].img);
  //   setIsArtist(playList[isIndex].user.nickname);
  //   setIsTitle(playList[isIndex].title);
  //   return () => clearInterval(timeout);
  // }, [isIndex]);

  console.log(recommendChart);

  const url = recommendChart.img;
  const artistName = recommendChart.img;
  const trackTitle = recommendChart.img;

  return (
    <section className='recommend-container'>
      <p className='recommend'>추천</p>
      <div className='recommend-content'>
        <RecommendImage className='img' recommendChart={url} />
        <p className='recommend-artist'>{artistName}</p>
        <p className='recommend-title'>{trackTitle}</p>
      </div>
    </section>
  );
}

export default Recommend;

export const RecommendImage = styled.div`
  width: 150px;
  height: 150px;
  /* background-color:red; */
  background-image: url(${props => props.recommendChart});
  background-size: cover;
  background-position: center;
`;
