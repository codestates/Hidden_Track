import React from 'react';
import loading from '../assets/loading.gif';

function LoadingIndicator () {
  return (
    <img
      className='loading-indicator'
      alt='now loading...'
      src={loading}
    />
  );
}

export default LoadingIndicator;
