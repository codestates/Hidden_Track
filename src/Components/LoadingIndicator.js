import React from 'react';
// import loading from '../assets/loading.gif';
// import loading from '../assets/loadin.gif';

import './LoadingIndicator.scss';

function LoadingIndicator () {
  return (
  // <img
  //   className='loading-indicator'
  //   alt='now loading...'
  //   src={loading}
  // />

    <div className='container'>
      <div className='loader'>
        <div className='loader__bar' />
        <div className='loader__bar' />
        <div className='loader__bar' />
        <div className='loader__bar' />
        <div className='loader__bar' />
        <div className='loader__ball' />
      </div>
    </div>

  );
}

export default LoadingIndicator;
