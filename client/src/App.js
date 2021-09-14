import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Nav from './Components/Nav';
import SignUp from './Pages/SignUp';
import Login from './Components/Login';
import Test from './Test';
import Visualizer from './Pages/Visualizer';
import TrackDetails from './Pages/TrackDetails';
import Sidebar from './Components/Nav/sidebar';
function App () {
  const loca = useLocation();

  return (
    <>
      <div className='nav-container'>
        {loca.pathname === '/visual' || loca.pathname === '/signup'
          ? (
            <></>)
          : (
            <Nav />
            )}
      </div>
      <Switch>
        <Route exact path='/'>
          <Test />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/visual'>
          <Visualizer />
        </Route>
        <Route path='/trackdetails'>
          <TrackDetails />
        </Route>
        <Route path='/sidebar'>
          <Sidebar />
        </Route>
      </Switch>
    </>
  );
}

export default App;
