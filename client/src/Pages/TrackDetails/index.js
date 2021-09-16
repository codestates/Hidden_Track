import React from 'react';
import { useSelector } from 'react-redux';
import TrackInfo from './TrackInfo';
import Lyrics from './Lyrics';
import Replys from './Replys';

function TrackDetails () {
  const userInfo = useSelector(state => state.userInfoReducer);
  const trackDetail = useSelector(state => state.trackDetailReducer);
  const state1 = useSelector(state => state.isLoginReducer);
  const state2 = useSelector(state => state.isLoginModalOpenReducer);
  const state3 = useSelector(state => state.accessTokenReducer);
  const { isLogin } = state1;
  const { isLoginModalOpen } = state2;
  const { accessToken } = state3;

  return (
    <div className='track-details'>
      <div>
        <TrackInfo
          isLogin={isLogin}
          isLoginModalOpen={isLoginModalOpen}
          accessToken={accessToken}
          trackDetail={trackDetail}
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
        />
      </div>
    </div>
  );
}

export default TrackDetails;
