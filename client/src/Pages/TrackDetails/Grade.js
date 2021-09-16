import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTrackDetails, isLoginModalOpenHandler } from '../../Redux/actions/actions';
import axios from 'axios';
import './Grade.scss';

function Grade ({ trackDetail, isLogin, accessToken }) {
  const [grade, setGrade] = useState(0);
  const dispatch = useDispatch();

  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  // 별점 부여한 상태 저장
  function handleGrade (e) {
    console.log(e.target.value);
    setGrade(e.target.value);
  }

  function requestGrade (e) {
    e.preventDefault();
    if (!isLogin) {
      return dispatch(isLoginModalOpenHandler(true));
    }

    axios.post(`${process.env.REACT_APP_API_URL}/post/grade`, {
      postId: trackDetail.post.id,
      grade: grade
    })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          dispatch(getTrackDetails({
            id: trackDetail.id,
            title: trackDetail.title,
            artist: trackDetail.artist,
            img: trackDetail.img,
            genre: trackDetail.genre,
            releaseAt: trackDetail.releaseAt,
            lyric: trackDetail.lyric,
            like: {
              count: trackDetail.like.count
            },
            post: {
              id: trackDetail.post.id,
              views: trackDetail.post.views,
              gradeAev: res.data.gradeAev
            },
            reply: trackDetail.reply
          }));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <form className='star-rating' onSubmit={(e) => requestGrade(e)}>
      <fieldset className='rate' onChange={(e) => handleGrade(e)}>
        <input type='radio' id='rating10' name='rating' value='5' />
        <label htmlFor='rating10' title='5 stars' />

        <input type='radio' id='rating9' name='rating' value='4.5' />
        <label className='half' htmlFor='rating9' title='4 1/2 stars' />

        <input type='radio' id='rating8' name='rating' value='4' />
        <label htmlFor='rating8' title='4 stars' />

        <input type='radio' id='rating7' name='rating' value='3.5' />
        <label className='half' htmlFor='rating7' title='3 1/2 stars' />

        <input type='radio' id='rating6' name='rating' value='3' />
        <label htmlFor='rating6' title='3 stars' />

        <input type='radio' id='rating5' name='rating' value='2.5' />
        <label className='half' htmlFor='rating5' title='2 1/2 stars' />

        <input type='radio' id='rating4' name='rating' value='2' />
        <label htmlFor='rating4' title='2 stars' />

        <input type='radio' id='rating3' name='rating' value='1.5' />
        <label className='half' htmlFor='rating3' title='1 1/2 stars' />

        <input type='radio' id='rating2' name='rating' value='1' />
        <label htmlFor='rating2' title='1 star' />

        <input type='radio' id='rating1' name='rating' value='0.5' />
        <label className='half' htmlFor='rating1' title='1/2 star' />

        <button type='submit'>별점주기</button>
      </fieldset>
    </form>
  );
}

export default Grade;
