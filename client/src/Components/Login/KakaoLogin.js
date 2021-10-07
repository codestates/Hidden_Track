import React from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
// import axios from 'axios';
import kakao_login_medium_narrow from '../../assets/kakao_login_medium_narrow.png';
import './KakaoLogin.scss';

function KakaoLogin () {
  const dispatch = useDispatch();
  // const isLogin = useSelector(state => state.isLoginReducer).isLogin

  // const [keepLogin, setKeepLogin] = useState(false);

  const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=https://www.hiddentrack.link&response_type=code`;

  function requestAssign () {
    window.location.assign(KAKAO_LOGIN_URL);
  }

  return (
    <div>
      <img className='kakao-btn' src={kakao_login_medium_narrow} alt='카카오 로그인' onClick={requestAssign} />
    </div>
  );
}

export default KakaoLogin;
