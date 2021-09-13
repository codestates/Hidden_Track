import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Nav from './Components/Nav';
import SignUp from './Pages/SignUp';
import Login from './Components/Login';
import Test from './Test';
import Visualizer from './Pages/Visualizer';

function App () {
  const loca = useLocation();
  console.log('eeee');
  return (
    <div>
      <SignUp />
    </div>
    // <>
    //   <div className='nav-container'>
    //     {loca.pathname === '/visual' || loca.pathname === '/signup'
    //       ? (
    //         <></>)
    //       : (
    //         <Nav />
    //         )}
    //   </div>
    //   <Switch>
    //     <Route exact path='/'>
    //       <Test />
    //     </Route>
    //     <Route path='/signup'>
    //       <SignUp />
    //     </Route>
    //     <Route path='/login'>
    //       <Login />
    //     </Route>
    //   </Switch>
    // </>
  );
}

export default App;
