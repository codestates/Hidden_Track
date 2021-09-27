import React from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

function TrackList ({ trackList, dispatch, getTrackDetails, handleNotice, trackDetail }) {
  const history = useHistory();

  // 특정 음원을 클릭 했을 때 실행되는 함수
  function moveToTrackDetails (e) {
    const trackId = e.target.getAttribute('value');
    console.log(trackId);
    // 클릭한 음원의 상세 정보 요청
    axios.get(`${process.env.REACT_APP_API_URL}/track/${trackId}`)
      .then(res => {
        console.log('음원 클릭시 요청 응답', res.data);
        if (res.status === 200) {
        // 요청 성공시 상세 음원 정보 상태에 저장
          dispatch(getTrackDetails(res.data));
          // 상세 음원 정보 저장 성공 후 음원 상세 페이지 이동
          history.push({
            pathname: `/trackdetails/${trackId}`,
            state: {
              trackId: trackId
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        // 요청 응답 실패시 함수 종료 후 알림 메시지
        if (err.response) {
          if (err.response.status === 400) return handleNotice('잘못된 요청입니다.', 5000);
          if (err.response.status === 404) return handleNotice('해당 음원을 찾을 수 없습니다.', 5000);
        }
      });
  }
  console.log(trackList);
  return (
    <section className='track-list-container'>
      <ul className='track-list-ul'>
        {trackList && trackList.length !== 0
          ? trackList.map(el => {
            return (
              <li className='track-list-li' key={el.id} value={el.id} onClick={(e) => moveToTrackDetails(e)}>
                <img className='track-list-img' src={el.img} value={el.id} alt='' />
                <p className='track-list-title' value={el.id}>{el.title}</p>
                <p className='track-list-artist' value={el.id}>{el.user.nickName}</p>
              </li>
            );
          })
          : <p className='track-list-msg'>검색 결과를 찾을 수 없습니다.</p>}
      </ul>
    </section>
  );
}

export default TrackList;
