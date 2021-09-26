import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isClickModify, isLoginHandler, getAccessToken, getUserInfo } from './Redux/actions/actions';
import Nav from './Components/Nav';
import SignUp from './Pages/SignUp';
import Login from './Components/Login';
import Main from './Pages/Main';
import Test from './Test';
import Visualizer from './Pages/Visualizer';
import TrackDetails from './Pages/TrackDetails';
import Sidebar from './Components/Nav/Sidebar';
import MyPage from './Pages/MyPage';
import ModiCreate from './Pages/ContentsModiCreate';
import SearchTrack from './Pages/SearchTrack';
import Notification from './Components/Notification';
import HashTag from './Components/HashTag';
import { refreshTokenRequest, accessTokenRequest } from './Components/TokenFunction';
import Cookies from 'universal-cookie';

function App () {
  const loca = useLocation();
  const dispatch = useDispatch();

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
          cookies.remove('refreshToken');
        }
      } else {
        dispatch(isLoginHandler(false));
      }
    }
    tokenRequest();
  }, []);

  // useEffect(() => { // ------> 음원 수정 페이지에서 useEffect 안에 return문에 dispatch 써주면 됨(componentWillUnmount 개념)
  //   // 음원 수정 페이지를 벗어나면 수정 버튼 상태를 false로 바꿔줌
  //   if (loca.pathname !== '/modicreate') dispatch(isClickModify(false));
  // }, [loca.pathname, dispatch]);

  return (
    <>
      <div className='nav-container'>
        {loca.pathname === '/signup' || loca.pathname === '/sidebar'
          ? (
            <></>)
          : (
            <Nav />
            )}
      </div>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/signup'>
          <SignUp handleNotice={handleNotice} />
        </Route>
        <Route path='/visual'>
          <Visualizer />
        </Route>
        <Route path='/mypage'>
          <MyPage />
        </Route>
        <Route path='/trackdetails/:id'>
          <TrackDetails handleNotice={handleNotice} />
        </Route>
        <Route path='/modicreate'>
          <ModiCreate handleNotice={handleNotice} />
        </Route>
        <Route path='/sidebar'>
          <Sidebar />
        </Route>
        <Route path='/searchtrack'>
          <SearchTrack handleNotice={handleNotice} />
        </Route>
        <Route path='/searchtrack/:id'>
          <SearchTrack handleNotice={handleNotice} />
        </Route>
        <Route path='/hashtag'>
          <HashTag handleNotice={handleNotice} />
        </Route>
      </Switch>
      <Notification notice={notice} />
    </>
  );
}

export default App;
