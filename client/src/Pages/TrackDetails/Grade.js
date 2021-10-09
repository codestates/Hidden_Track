import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTrackDetails, isLoginModalOpenHandler } from '../../Redux/actions/actions';
import axios from 'axios';
import './Grade.scss';

function Grade ({ trackDetail, isLogin, accessToken, handleNotice }) {
  const [grade, setGrade] = useState(0);
  const dispatch = useDispatch();

  axios.defaults.headers.common.accesstoken = accessToken;

  // 별점 부여한 상태 저장
  function handleGrade (e) {
    console.log(e.target.value);
    setGrade(e.target.value);
  }

  // 별점 등록 요청 보내는 함수
  function requestGrade (e) {
    e.preventDefault();
    if (!grade) {
      return handleNotice('별점을 부여 해주세요.', 5000);
    }

    if (!isLogin) {
      handleNotice('로그인 후 이용하실 수 있습니다.', 5000);
      return dispatch(isLoginModalOpenHandler(true));
    }

    axios.post(`${process.env.REACT_APP_API_URL}/track/grade`, {
      trackId: trackDetail.track.id,
      userGrade: grade
    })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          // 별점 등록 요청 완료 후 음원 상세 정보 다시 받아옴
          axios.get(`${process.env.REACT_APP_API_URL}/track/${trackDetail.track.id}`)
            .then(res => {
              console.log(res.data);
              if (res.status === 200) {
                dispatch(getTrackDetails(res.data));
              }
              handleNotice(`별점 ${grade}점 등록!`, 5000);
            })
            .catch(err => {
              console.log(err.response);
              if (err.response) {
                if (err.response.status === 404) handleNotice('해당 게시글이 존재하지 않습니다.', 5000);
              } else console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status === 401) handleNotice('권한이 없습니다.', 5000);
        if (err.response.status === 400) handleNotice('잘못된 요청입니다.', 5000);
        if (err.response.status === 409) handleNotice('이미 별점을 부여했습니다.', 5000);
      });
  }

  return (
    <form className='star-rating' onSubmit={(e) => requestGrade(e)}>
      <fieldset className='rate' onChange={(e) => handleGrade(e)}>
        <input type='radio' id='rating10' name='rating' value='5' />
        <label className='grade-label' htmlFor='rating10' title='5 stars' />

        <input type='radio' id='rating9' name='rating' value='4.5' />
        <label className='half grade-label' htmlFor='rating9' title='4 1/2 stars' />

        <input type='radio' id='rating8' name='rating' value='4' />
        <label className='grade-label' htmlFor='rating8' title='4 stars' />

        <input type='radio' id='rating7' name='rating' value='3.5' />
        <label className='half grade-label' htmlFor='rating7' title='3 1/2 stars' />

        <input type='radio' id='rating6' name='rating' value='3' />
        <label className='grade-label' htmlFor='rating6' title='3 stars' />

        <input type='radio' id='rating5' name='rating' value='2.5' />
        <label className='half grade-label' htmlFor='rating5' title='2 1/2 stars' />

        <input type='radio' id='rating4' name='rating' value='2' />
        <label className='grade-label' htmlFor='rating4' title='2 stars' />

        <input type='radio' id='rating3' name='rating' value='1.5' />
        <label className='half grade-label' htmlFor='rating3' title='1 1/2 stars' />

        <input type='radio' id='rating2' name='rating' value='1' />
        <label className='grade-label' htmlFor='rating2' title='1 star' />

        <input type='radio' id='rating1' name='rating' value='0.5' />
        <label className='half grade-label' htmlFor='rating1' title='1/2 star' />

      </fieldset>
      <button className='contents__btn grade-btn' type='submit'>별점주기</button>
    </form>
  );
}

export default Grade;
