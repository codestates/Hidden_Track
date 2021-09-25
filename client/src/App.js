import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isClickModify, isLoginHandler, getAccessToken, getUserInfo } from './Redux/actions/actions';
import axios from 'axios';
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


function App () {
  const loca = useLocation();
  const dispatch = useDispatch();
  console.log(loca.pathname);
  const [notice, setNotice] = useState([]);
  const accessToken = useSelector(state => state.accessTokenReducer).accessToken;
  const isLogin = useSelector(state => state.isLoginReducer).isLogin;
  console.log('eeeeeeeeeeeeeee', isLogin);

  useEffect(() => {
    if (isLogin) {
      requestAccessToken();
    }
  }, [accessToken]);

  useEffect(() => {
    // 음원 수정 페이지를 벗어나면 수정 버튼 상태를 false로 바꿔줌
    if (loca.pathname !== '/modicreate') dispatch(isClickModify(false));
  }, [loca.pathname]);

  // 알림 추가, 삭제 핸들러
  function handleNotice (message, dismissTime) {
    for (const el of notice) {
      if (el.message === message) return;
    }
    const uuid = notice.length;
    setNotice([...notice, { message: message, dismissTime: dismissTime, uuid: uuid }]);

    setTimeout(() => {
      setNotice(notice.slice(1));
    }, dismissTime);
  }

  // 리프레시 토큰으로 액세스 토큰 받아오는 함수
  function requestAccessToken () {
    axios.get(`${process.env.REACT_APP_API_URL}/user/token`, {
      withCredentials: true
    })
      .then(res => {
        console.log('리프레시 토큰 요청 응답', res.data);
        if (res.status === 200) {
          dispatch(getAccessToken(res.data.data));
        }
      })
      .catch(err => {
        console.log(err.response);
        // 만약 유효하지 않은 리프레시 토큰이라면, 로그인 상태 false로
        handleNotice('refresh token이 만료되어 불러올 수 없습니다. 다시 로그인 해주시기 바랍니다.', 5000);
        dispatch(isLoginHandler(false));
      });
  }

  // 액세스 토큰으로 유저정보 받아오는 함수
  function requestUserInfo () {
    axios.get(`${process.env.REACT_APP_API_URL}/user/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log('액세스 토큰 요청 응답', res.data.data);
        if (res.status === 200) {
          dispatch(getUserInfo(res.data.data));
        }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status === 401) {
          // 액세스 토큰이 만료된 경우 리프레시 토큰으로 액세스 토큰 다시 받아옴
          requestAccessToken();
          // 다시 받아온 액세스 토큰으로 유저 정보 요청 다시 보냄
          requestUserInfo();
        }
      });
  }

  return (
    <>
      <div className='nav-container'>
        {loca.pathname === '/signup' || loca.pathname === '/sidebar' || loca.pathname === '/canvas2'
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
        <Route path='/trackdetails'>
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
      </Switch>
      <Notification notice={notice} />
    </>
  );
}

export default App;
