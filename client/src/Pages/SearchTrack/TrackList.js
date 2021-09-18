import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getTrackDetails } from '../../Redux/actions/actions';
import axios from 'axios';
import './TrackList.scss';

function TrackList ({ trackList, handleNotice }) {
  const history = useHistory();
  const dispatch = useDispatch();

  // 특정 음원을 클릭 했을 때 실행되는 함수
  function moveToTrackDetails (e) {
    const postId = e.target.getAttribute('value');
    // console.log(postId)
    // 클릭한 음원의 상세 정보 요청
    axios.get(`${process.env.REACT_APP_API_URL}/post/track`, {
      params: {
        postId: postId
      }
    })
      .then(res => {
        console.log('음원 클릭시 요청 응답', res.data);
        if (res.status === 200) {
        // 요청 성공시 상세 음원 정보 전역 상태에 저장
          dispatch(getTrackDetails(res.data.track));
        }
        // 요청 응답 실패시 함수 종료 후 알림 메시지
        else if (res.status === 404) return handleNotice('해당 음원을 찾을 수 없습니다.', 5000);
      })
      .then(res => {
        // 상세 음원 정보 저장 성공 후 음원 상세 페이지 이동
        history.push('/trackdetails');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <section className='track-list-container'>
      <ul className='track-list-ul'>
        {trackList.length !== 0
          ? trackList.map(el => {
            return (
              <li className='track-list-li' key={el.id} value={el.id} onClick={(e) => moveToTrackDetails(e)}>
                <img className='track-list-img' src={el.img} value={el.id} alt='' />
                <p value={el.id}>{el.title}</p>
                <p value={el.id}>{el.user.nickname}</p>
              </li>
            );
          })
          : <p>검색 결과를 찾을 수 없습니다.</p>}
      </ul>
    </section>
  );
}

export default TrackList;
