import React from 'react';
import './index.scss';

// import glass from '../../assets/glass'

function Search () {
  return (
    <form className='search-form'>
      <h2 className='a11yHidden'>검색</h2>
      <fieldset>
        <input type='search' id='search' name='search' className='search' placeholder='어떤 음악을 찾고 계신가요?' />
      </fieldset>
    </form> 
  );
}

export default Search;
