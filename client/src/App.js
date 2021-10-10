import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginHandler, getAccessToken, getUserInfo, isLoadingHandler } from './Redux/actions/actions';
import Nav from './Components/Nav';
import SignUp from './Pages/SignUp';
import Main from './Pages/Main';
import Canvas from './Pages/Visualizer';
import TrackDetails from './Pages/TrackDetails';
import MyPage from './Pages/MyPage';
import ModiCreate from './Pages/ContentsModiCreate';
import SearchTrack from './Pages/SearchTrack';
import Notification from './Components/Notification';
import LoadingIndicator from './Components/LoadingIndicator';
import Landing from './Pages/Landing';

import { refreshTokenRequest, accessTokenRequest } from './Components/TokenFunction';
import axios from 'axios';

axios.defaults.withCredentials =true;
console.log('asdasd')
function App () {
  const loca = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoading = useSelector(state => state.loadingIndicatorReducer).isLoading;
  const authorizationCode = new URL(window.location.href).searchParams.get('code');
  // console.log('소셜 로그인시 받은 authorization code', authorizationCode);
  const [notice, setNotice] = useState([]);

  // 알림 추가, 삭제 핸들러
  const handleNotice = useCallback((message, dismissTime) => {
    for (const el of notice) {
      if (el.message === message) return;
    }
    const uuid = notice.length;
    setNotice([...notice, { message: message, dismissTime: dismissTime, uuid: uuid }]);

    setTimeout(() => {
      setNotice(notice.slice(1));
    }, dismissTime);
  }, [notice]);

  useEffect(() => {
    async function tokenRequest () {
      dispatch(isLoadingHandler(true));

      // if (cookies.get('refreshToken')) {
        const token = await refreshTokenRequest();
        if (token) {
          // 액세스 토큰 성공적으로 얻어 왔다면 유저정보 받아옴
          dispatch(getAccessToken(token)); // 액세스 토큰 전역 상태에 저장
          const userInfo = await accessTokenRequest(token);
          if (userInfo) {
            // 유저 정보 얻어왔으면 전역 상태에 저장
            dispatch(getUserInfo(userInfo));
            dispatch(isLoginHandler(true));
            dispatch(isLoadingHandler(false));
          }
          // 유저 정보를 못 얻어왔다면 -> 액세스 토큰이 유효하지 x -> 리프레시 토큰으로 다시 얻어옴
          else {
            // token = refreshTokenRequest();
            // dispatch(getAccessToken(token));
            // userInfo = accessTokenRequest(token);
            // dispatch(getUserInfo(userInfo));
          }
        } else {
          // handleNotice('refreshToken이 유효하지 않습니다. 다시 로그인 해주세요.', 5000);
          dispatch(isLoginHandler(false));
          dispatch(isLoadingHandler(false));
        }
    //   } else {
    //     dispatch(isLoginHandler(false));
    //     dispatch(isLoadingHandler(false));
    //   }
      dispatch(isLoadingHandler(false));
    }
    tokenRequest();
  }, []);

  useEffect(() => {
    // 소셜 로그인시 메인 페이지로 리다이렉트 됨 -> 받아온 authorization code로 서버에 accesstoken 요청하는 함수
    function getToken () {
      if (authorizationCode) {
        dispatch(isLoadingHandler(true));
        axios.post(`${process.env.REACT_APP_API_URL}/user/kakaologin`, {
          authorizationCode
        })
          .then(async (res) => {
            if (res.status === 200) {
              // 서버에서 응답으로 리프레시 토큰(쿠키), 액세스 토큰 옴
              // 받은 액세스 토큰을 전역상태에 저장
              dispatch(getAccessToken(res.data.data));
              // 액세스 토큰으로 유저정보 요청
              const userInfo = await accessTokenRequest(res.data.data);
              // 유저정보 전역 상태에 저장
              dispatch(getUserInfo(userInfo));
              // 로그인 상태 true
              dispatch(isLoadingHandler(false));
              dispatch(isLoginHandler(true));
            }
          })
          .catch(err => {
            console.log(err.reponse);
            if (err.reponse) {
              // 서버에서 에러처리한 코드 에러 핸들링
              if (err.reponse.status === 401) handleNotice('로그인에 실패하였습니다.', 5000); // code가 서버에 전달되지 않는 경우
              if (err.reponse.status === 500) handleNotice('요청이 거부 되었습니다.', 5000);
            } else console.log(err);
          });
        dispatch(isLoadingHandler(false));
      }
    }
    getToken();
  }, []);

  // window.addEventListener('unload', () => {
  //   // 브라우저 창 닫으면 리프레시 토큰 삭제해서 로그아웃 시킴
  //   cookies.remove('refreshToken')
  //   // 만약 로그인 상태유지 체크 누른 상태라면 브라우저 닫아도 쿠키 삭제 x
  // })

  return (
    <>

      {loca.pathname === '/signup' || loca.pathname.match('/visual') || loca.pathname === '/'

        ? (
          <></>)
        : (
          <div className='nav-container'>
            <Nav handleNotice={handleNotice} />
          </div>
          )}
      {isLoading
        ? <LoadingIndicator />
        : <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route path='/main'>
            <Main />
          </Route>
          <Route path='/signup'>
            <SignUp handleNotice={handleNotice} />
          </Route>
          <Route path='/visual/:id'>
            <Canvas handleNotice={handleNotice} history={history} loca={loca} />
          </Route>
          <Route path='/mypage'>
            <MyPage handleNotice={handleNotice} />
          </Route>
          <Route path='/trackdetails/:id'>
            <TrackDetails handleNotice={handleNotice} isLoading={isLoading} />
          </Route>
          <Route path='/modicreate'>
            <ModiCreate handleNotice={handleNotice} isLoading={isLoading} />
          </Route>
          <Route path='/modicreate/:id'>
            <ModiCreate handleNotice={handleNotice} isLoading={isLoading} />
          </Route>
          <Route path='/searchtrack'>
            <SearchTrack handleNotice={handleNotice} />
          </Route>
          <Route path='/searchtrack/:id'>
            <SearchTrack handleNotice={handleNotice} />
          </Route>

        </Switch>}
      <Notification notice={notice} />

    </>
  );
}

export default App;
