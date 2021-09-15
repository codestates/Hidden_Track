import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, getAccessToken, isLoginHandler } from '../Redux/actions/actions';

import axios from 'axios';

// 전역 상태에 저장된 액세스 토큰으로 유저 정보를 받아오는 함수
// 함수명이 파스칼 케이스인 이유: useSelector는 리액트 Hook이기 때문에
// 리액트의 함수형 컴포넌트(함수명이 파스칼 케이스) 안에서만 쓸 수 있기 때문
export function AccessTokenRequest () {
  const state3 = useSelector(state => state.accessTokenReducer);
  const { accessToken } = state3;
  console.log('액세스토큰', accessToken);
  const dispatch = useDispatch();

  // 만약 현재 액세스 토큰이 상태에 없다면
  if (!accessToken) {
    // 리프레시 토큰으로 액세스 토큰 받아오는 요청 보냄
    RefreshTokenRequest();
  }

  // 현재 액세스 토큰이 상태에 있다면 유저 정보 요청 보냄
  axios.get(`${process.env.REACT_APP_API_URL}/user/userinfo`, {
    headers: {
      accessToken: accessToken
    }
  })
    .then(res => {
      console.log('액세스 토큰 요청 응답', res.data);
      if (res.status === 200) {
        if (res.data.admin === 'listener') {
          dispatch(getUserInfo({
            id: res.data.id,
            loginId: res.data.loginId,
            profile: res.data.profile,
            nickName: res.data.nickName,
            admin: 'listener'
          }));
        } else if (res.data.admin === 'artist') {
          dispatch(getUserInfo({
            id: res.data.id,
            loginId: res.data.loginId,
            profile: res.data.profile,
            nickName: res.data.nickName,
            admin: 'artist',
            userArtist: {
              agency: res.data.userArtist.agency,
              email: res.data.userArtist.email,
              debut: res.data.userArtist.debut
            }
          }));
        }
      } else if (res.status === 401) {
        // 액세스 토큰이 만료된 경우 리프레시 토큰으로 액세스 토큰 다시 받아옴
        RefreshTokenRequest();
        // 다시 받아온 액세스 토큰으로 유저 정보 요청 다시 보냄
        AccessTokenRequest();
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// 액세스 토큰이 만료되거나, 상태가 초기화 됐을 때 리프레시 토큰으로 액세스 토큰 다시 받아오는 함수
export function RefreshTokenRequest () {
  const dispatch = useDispatch();

  axios.get(`${process.env.REACT_APP_API_URL}/user/accesstoken`, {
    withCredentials: true
  })
    .then(res => {
      console.log('리프레시 토큰 요청 응답', res.data);
      if (res.status === 200) {
        dispatch(getAccessToken(res.data.accessToken));
      }
      // 만약 유효하지 않은 리프레시 토큰이라면, 로그인 상태 false로
      else {
        dispatch(isLoginHandler(false));
      }
    })
    .catch(err => {
      console.log(err);
    });
}
