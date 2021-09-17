import React from 'react';
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
import ModiCreate from './Pages/Contents/ContentsModiCreate';

function App () {
  const loca = useLocation();

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
          <TrackDetails />
        </Route>
        <Route path='/modicreate'>
          <ModiCreate />
        </Route>
      </Switch>
    </>
  );
}

export default App;
