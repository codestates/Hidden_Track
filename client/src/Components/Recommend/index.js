import React, { useEffect, useState } from 'react';
import './index.scss';
import playList from '../../DummyData/playList';
import styled from 'styled-components'




function Recommend(){

  const [isIndex, setIsIndex] = useState(0)
  const [isRecommendImage, setIsRecommendImage] = useState(playList[isIndex].img)
  const [isArtist, setIsArtist] = useState(playList[isIndex].user.nickname)
  const [isTitle, setIsTitle] = useState(playList[isIndex].title)

  useEffect(() => {
    if(isIndex === playList.length-1){
      setTimeout(() => {
        setIsIndex(0)
      }, 990)
    }

    const timeout = setTimeout(() => setIsIndex(isIndex +1), 2000)
    setIsRecommendImage(playList[isIndex].img)
    setIsArtist(playList[isIndex].user.nickname)
    setIsTitle(playList[isIndex].title)
    return () => clearTimeout(timeout)
  }, [isIndex])

  return(
    <section className="recommend-container">
      <p className="recommend">추천</p>
      <div className="recommend-content">
        <RecommendImage className="img" img={isRecommendImage}/>
        <p className="recommend-artist">{isArtist}</p>
        <p className="recommend-title">{isTitle}</p>
      </div>
    </section>
  )
}

export default Recommend


export const RecommendImage= styled.div`
  width: 150px;
  height: 150px;
  /* background-color:red; */
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center;
`