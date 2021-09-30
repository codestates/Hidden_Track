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

    <div class='container'>
      <div class='loader'>
        <div class='loader__bar' />
        <div class='loader__bar' />
        <div class='loader__bar' />
        <div class='loader__bar' />
        <div class='loader__bar' />
        <div class='loader__ball' />
      </div>
    </div>

  );
}

export default LoadingIndicator;
