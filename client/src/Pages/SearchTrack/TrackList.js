import React from 'react';
import { useHistory } from 'react-router';
import HashTag from '../../Components/HashTag';

function TrackList ({ trackList, search, hashTag }) {
  const history = useHistory();

  // 특정 음원을 클릭 했을 때 실행되는 함수
  function moveToTrackDetails (e) {
    const trackId = e.target.getAttribute('value');

    history.push(`/trackdetails/${trackId}`);
    // 클릭한 음원의 상세 정보 요청
    // axios.get(`${process.env.REACT_APP_API_URL}/track/${trackId}`, {
    //   headers: {
    //     accesstoken: accessToken
    //   }
    // })
    //   .then(res => {
    //     console.log('음원 클릭시 요청 응답', res.data);
    //     if (res.status === 200) {
    //     // 요청 성공시 상세 음원 정보 상태에 저장
    //       dispatch(getTrackDetails(res.data));
    //       // 상세 음원 정보 저장 성공 후 음원 상세 페이지 이동
    //       history.push(`/trackdetails/${trackId}`);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     // 요청 응답 실패시 함수 종료 후 알림 메시지
    //     if (err.response) {
    //       if (err.response.status === 400) return handleNotice('잘못된 요청입니다.', 5000);
    //       if (err.response.status === 404) return handleNotice('해당 음원을 찾을 수 없습니다.', 5000);
    //     }
    //   });
  }

  return (
    <section className='track-list-container'>
      <ul className='track-list-ul'>
        {!search && Array.isArray(trackList)// 검색어 입력이 없다면 장르 or 해시태그 결과만 랜더링
          ? <>
            {trackList && trackList.length !== 0
              ? <div className='track-list-box'>
                {trackList.map(el => {
                  return (
                    <li className='track-list-li' key={el.id} value={el.id} onClick={(e) => moveToTrackDetails(e)}>
                      <img className='track-list-img' src={el.img} value={el.id} alt='' />
                      <p className='track-list-title' value={el.id}>{el.title}</p>
                      <p className='track-list-artist' value={el.id}>{el.user.nickName}</p>
                    </li>
                  );
                })}
              </div>
              : <p className='track-list-msg'>검색 결과를 찾을 수 없습니다.</p>}
          </>
          // 검색어로 검색한 경우 나눠서 랜더링
          : <div className='search-result-container'>
            {/* ----------------------아티스트로 검색한 결과-------------------- */}
            <div className='search-result-box'>
              <label>아티스트 검색 결과</label>
              {trackList.nickName && trackList.nickName.length !== 0
                ? <div className='track-list-box'>
                  {trackList.nickName.map(el => {
                    return (
                      <li className='track-list-li' key={el.id} value={el.id} onClick={(e) => moveToTrackDetails(e)}>
                        <img className='track-list-img' src={el.img} value={el.id} alt='' />
                        <p className='track-list-title' value={el.id}>{el.title}</p>
                        <p className='track-list-artist' value={el.id}>{el.user.nickName}</p>
                      </li>
                    );
                  })}
                </div>
                : <p className='track-list-msg'>검색 결과를 찾을 수 없습니다.</p>}
            </div>

            {/* ---------------------곡명 검색 결과----------------------------- */}
            <div className='search-result-box'>
              <label>곡명 검색 결과</label>
              {trackList.title && trackList.title.length !== 0
                ? <div className='track-list-box'>
                  {trackList.title.map(el => {
                    return (
                      <li className='track-list-li' key={el.id} value={el.id} onClick={(e) => moveToTrackDetails(e)}>
                        <img className='track-list-img' src={el.img} value={el.id} alt='' />
                        <p className='track-list-title' value={el.id}>{el.title}</p>
                        <p className='track-list-artist' value={el.id}>{el.user.nickName}</p>
                      </li>
                    );
                  })}
                </div>
                : <p className='track-list-msg'>검색 결과를 찾을 수 없습니다.</p>}
            </div>

            {/* ---------------------해시태그 검색 결과----------------------------- */}
            <div className='search-result-box'>
              <label>해시태그 검색 결과</label>
              {trackList.hashTag && trackList.hashTag.length !== 0
                ? <div className='hashtag-box'>
                  <HashTag tagList={trackList.hashTag} searchTag={hashTag} />
                </div>
                : <p className='track-list-msg'>검색 결과를 찾을 수 없습니다.</p>}
            </div>
          </div>}
      </ul>
    </section>
  );
}

export default TrackList;
