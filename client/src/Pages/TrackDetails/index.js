import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TrackInfo from './TrackInfo';
import Lyrics from './Lyrics';
import Replys from './Replys';
import Notification from './Notification';

function TrackDetails () {
  const userInfo = useSelector(state => state.userInfoReducer);
  const trackDetail = useSelector(state => state.trackDetailReducer);
  const state1 = useSelector(state => state.isLoginReducer);
  const state2 = useSelector(state => state.isLoginModalOpenReducer);
  const state3 = useSelector(state => state.accessTokenReducer);
  const { isLogin } = state1;
  const { isLoginModalOpen } = state2;
  const { accessToken } = state3;

  const [notice, setNotice] = useState([]);

  // 알림 추가, 삭제 핸들러
  function handleNotice (message, dismissTime) {
    // console.log('실행')
    // const uuid = Math.random()
    for (const el of notice) {
      if (el.message === message) return;
    }
    const uuid = notice.length;
    setNotice([...notice, { message: message, dismissTime: dismissTime, uuid: uuid }]);

    setTimeout(() => {
      setNotice(notice.slice(1));
    }, dismissTime);
  }

  return (
    <div className='track-details'>
      <div>
        <TrackInfo
          isLogin={isLogin}
          isLoginModalOpen={isLoginModalOpen}
          accessToken={accessToken}
          trackDetail={trackDetail}
          userInfo={userInfo}
          handleNotice={handleNotice}
        />
      </div>
      <div>
        <Lyrics trackDetail={trackDetail} />
      </div>
      <div>
        <Replys
          userInfo={userInfo}
          trackDetail={trackDetail}
          isLogin={isLogin}
          isLoginModalOpen={isLoginModalOpen}
          accessToken={accessToken}
          handleNotice={handleNotice}
        />
      </div>
      <Notification notice={notice} />
    </div>
  );
}

export default TrackDetails;
