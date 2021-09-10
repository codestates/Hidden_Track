import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import SignUp from './Pages/SignUp';
import Test from './Test';

function App () {
  const loca = useLocation();

  return (
    // <div>
    //   <h1>hello!</h1>
    // </div>
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
        {/* <Route path="/login">
          <Login/>
        </Route> */}
      </Switch>
    </>
  );
}

export default App;
