import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginHandler, getAccessToken, getUserInfo, isLoadingHandler } from './Redux/actions/actions';
import Nav from './Components/Nav';
import SignUp from './Pages/SignUp';
import Loding from './Components/Login';
import Main from './Pages/Main';
import Footer from './Components/Footer';
import Visualizer from './Pages/Visualizer';
import TrackDetails from './Pages/TrackDetails';
import Sidebar from './Components/Nav/Sidebar';
import MyPage from './Pages/MyPage';
import ModiCreate from './Pages/ContentsModiCreate';
import SearchTrack from './Pages/SearchTrack';
import Notification from './Components/Notification';
import LoadingIndicator from './Components/LoadingIndicator';
import { refreshTokenRequest, accessTokenRequest } from './Components/TokenFunction';
import Cookies from 'universal-cookie';
import axios from 'axios';

function App () {
  const loca = useLocation();
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.loadingIndicatorReducer).isLoading;
  const authorizationCode = new URL(window.location.href).searchParams.get('code');
  // const keepLogin = new URL(window.location.href).searchParams.get("state");
  console.log('소셜 로그인시 받은 authorization code', authorizationCode);
  // console.log(keepLogin)

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
    const cookies = new Cookies();
    async function tokenRequest () {
      dispatch(isLoadingHandler(true));
      if (cookies.get('refreshToken')) {
        const token = await refreshTokenRequest();
        console.log(token);
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
          handleNotice('refreshToken이 유효하지 않습니다. 다시 로그인 해주세요.', 5000);
          dispatch(isLoginHandler(false));
          dispatch(isLoadingHandler(false));
          cookies.remove('refreshToken');
        }
      } else {
        dispatch(isLoginHandler(false));
        dispatch(isLoadingHandler(false));
      }
      dispatch(isLoadingHandler(false));
    }
    tokenRequest();
  }, []);

  useEffect(() => {
    // 소셜 로그인시 메인 페이지로 리다이렉트 됨 -> 받아온 authorization code로 서버에 accesstoken 요청하는 함수
    if (authorizationCode) {
      axios.post(`${process.env.REACT_APP_API_URL}/user/kakaologin`, {
        authorizationCode
      })
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
          // 서버에서 응답으로 리프레시 토큰, 액세스 토큰 옴
          // 받은 액세스 토큰을 전역상태에 저장
          // 액세스 토큰으로 유저정보 요청
          // 로그인 상태 true
          }
        })
        .catch(err => {
          if (err.reponse) {
          // 서버에서 에러처리한 코드 에러 핸들링
          } else console.log(err);
        });
    }
  }, []);

  return (
    <>
      <div className='nav-container'>
        {loca.pathname === '/signup' || loca.pathname === '/visual'
          ? (
            <></>)
          : (
            <Nav handleNotice={handleNotice} />
            )}
      </div>
      {isLoading
        ? <LoadingIndicator />
        : <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/signup'>
            <SignUp handleNotice={handleNotice} />
          </Route>
          <Route path='/visual/:id'>
            <Visualizer handleNotice={handleNotice} />
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
          <Route path='/sidebar'>
            <Sidebar />
          </Route>
          <Route path='/searchtrack'>
            <SearchTrack handleNotice={handleNotice} isLoading={isLoading} />
          </Route>
          <Route path='/searchtrack/:id'>
            <SearchTrack handleNotice={handleNotice} />
          </Route>
        </Switch>}
      <Notification notice={notice} />
      <div className='footer-container'>
        {loca.pathname === '/signup' || loca.pathname === '/visual'
          ? (
            <></>)
          : (
            <Footer />
            )}
      </div>

    </>
  );
}

export default App;
