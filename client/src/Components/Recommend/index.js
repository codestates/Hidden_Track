import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { getTrackDetails, isLoadingHandler } from '../../Redux/actions/actions';

import styled from 'styled-components';
import axios from 'axios';

import './index.scss';

function Recommend () {
  const history = useHistory();
  const dispatch = useDispatch();

  const { accessToken } = useSelector(state => state.accessTokenReducer);

  const [recommendChart, setRecommendChart] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const number_ref = useRef(0);

  useEffect(() => {
    setLoading(true);
    requestRecommend(); // Promise

    const interval = setInterval(() => {
      number_ref.current += 1;
      setIndex(number_ref.current);
      if (number_ref.current >= 3) {
        number_ref.current = 0;
        setIndex(number_ref.current);
      }
    }, 2000);
    return () => {
      clearInterval(interval);
      setLoading(false);
    };
  }, []);

  const requestRecommend = async function () {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/track/recommend/all`,
        { headers: { accesstoken: accessToken } });
      setRecommendChart(result.data.recommend);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  function moveTrackDetail () {
    history.push(`/trackdetails/${recommendChart[index].id}`);
  }

  return (
    <section className='recommend-container'>
      <p className='recommend sign-four'>Inspired</p>
      <div className='recommend-content'>
        <div className='recommend-flex-box'>
          {recommendChart.length === 0
            ? <></>
            : <>
              <RecommendImage url={recommendChart[index].img} onClick={(e) => moveTrackDetail(e)} />
              <p className='recommend-artist'>{recommendChart[index].title}</p>
              <p className='recommend-title'>{recommendChart[index].title}</p>
              </>}
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
