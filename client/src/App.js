import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
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

  const [notice, setNotice] = useState([]);

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

  return (
    <>
      <div className='nav-container'>
        {loca.pathname === '/visual' || loca.pathname === '/signup' || loca.pathname === '/sidebar'
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
          <SignUp />
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
