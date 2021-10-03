import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { getTrackDetails, isLoadingHandler } from '../../Redux/actions/actions';


import styled from 'styled-components';
import axios from 'axios';

import './index.scss';



function Recommend () {

  const history = useHistory();
  const dispatch = useDispatch();

  const {accessToken}  = useSelector(state => state.accessTokenReducer)
  const [recommendChart, setRecommendChart] = useState([]);
  const [currentChart, setCurrentChart] = useState({})
  const [index, setIndex] = useState(0);

  
  useEffect(()=> {    
    axios.get(`${process.env.REACT_APP_API_URL}/track/charts/all`, 
    { headers: { accesstoken: accessToken } })
    .then((res) => {
      console.log('추천차트 요청 응답', res);
      setRecommendChart(res.data.recommendchart);
    })  
      .catch(err => {
          console.log(err);
        });
  }, [])



  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
      if (recommendChart[0] === undefined){
        console.log('error');
      }else{
        setCurrentChart(recommendChart[index])
        if (index ===2) {
          setIndex(0);
        }
      }
    }, 2000);
    
    return () => {
      clearInterval(interval);
    }
  }, [index]);

function moveTrackDetail(){
  history.push(`/trackdetails/${currentChart.id}`)
}

  return (
    <section className='recommend-container'>
      <p className='recommend'>추천</p>
      <div  className='recommend-content'>
        <div className="recommend-flex-box">
          {/* < TrackDetails props/> */}
          {/* <div url={currentChart.img} onClick={(e) =>moveDetail(e)}/> 
          <img src={currentChart.img} onClick={(e) =>moveDetail(e)}/>  */}
          <RecommendImage url={currentChart.img} onClick={(e) =>moveTrackDetail(e)}/> 
          <p className='recommend-artist'>{currentChart.title}</p>
          <p className='recommend-title'>{currentChart.title}</p>
        </div>
      </div>  
    </section>
  );
}

export default Recommend;

export const RecommendImage = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${props => props.url});
  margin-top: 10px;
  background-size: cover;
  background-position: center;
`;
