import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { getTrackDetails, isLoadingHandler } from '../../Redux/actions/actions';
import axios from 'axios';
import TrackInfo from './TrackInfo';
import Lyrics from './Lyrics';
import Replys from './Replys';
import Footer from '../../Components/Footer';
import './index.scss';

function TrackDetails ({ handleNotice, isLoading }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector(state => state.userInfoReducer);
  const trackDetail = useSelector(state => state.trackDetailReducer);
  const isLogin = useSelector(state => state.isLoginReducer).isLogin;
  const isLoginModalOpen = useSelector(state => state.isLoginModalOpenReducer).isLoginModalOpen;
  const accessToken = useSelector(state => state.accessTokenReducer).accessToken;

  axios.defaults.headers.common.accesstoken = accessToken;
  const trackId = location.pathname.split('/')[2];

  useEffect(() => {
    dispatch(isLoadingHandler(true));
    // 새로고침시 location pathname으로 음원 상세정보 다시 받아옴
    axios.get(`${process.env.REACT_APP_API_URL}/track/${trackId}`)
      .then(res => {
        if (res.status === 200) dispatch(getTrackDetails(res.data));
      })
      .catch(err => {
        console.log(err.response);
        if (err.response) {
          if (err.response.status === 400) handleNotice('잘못된 요청입니다.', 5000);
          if (err.response.status === 404) {
            handleNotice('해당 게시글을 찾을 수 없습니다.', 5000);
            history.push('/searchtrack');
          }
        } else console.log(err);
        dispatch(isLoadingHandler(false));
      });
    // 음원 상세 정보가 제대로 들어왔다면 로딩 인디케이터 종료
    dispatch(isLoadingHandler(false));
  }, [trackId]);

  return (
    <div className='track-details' style={{ width: window.innerWidth - 15, height: window.innerHeight }}>
      <TrackInfo
        isLogin={isLogin}
        accessToken={accessToken}
        trackDetail={trackDetail}
        userInfo={userInfo}
        handleNotice={handleNotice}
        trackId={trackId}
      />
      <div className='lyrics-container'>
        <Lyrics trackDetail={trackDetail} />
      </div>
      <Replys
        userInfo={userInfo}
        trackDetail={trackDetail}
        isLogin={isLogin}
        isLoginModalOpen={isLoginModalOpen}
        accessToken={accessToken}
        handleNotice={handleNotice}
      />
      <Footer />
    </div>
  );
}

export default TrackDetails;
