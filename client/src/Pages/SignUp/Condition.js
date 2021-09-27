import React from 'react';

function Condition ({ handleInputValue }) {
  function handleAgency (e) {
    handleInputValue('agency', e.target.value);
  }

  function handleDebut (e) {
    console.log(e);
    handleInputValue('debut', e.target.value);
  }

  function handleEmail (e) {
    handleInputValue('email', e.target.value);
  }

  return (
    <div className='sign-up-condition'>
      <div>
        소속사: <input type='text' placeholder='소속사' onChange={(e) => handleAgency(e)} />
      </div>
      <div>
        데뷔일: <input type='date' onChange={(e) => handleDebut(e)} />
      </div>
      <div>
        {/* <input type='text' placeholder='이메일' onChange={(e) => handleEmail(e)} /> */}
        이메일: <input type='email' placeholder='이메일' onChange={(e) => handleEmail(e)} />
      </div>
    </div>
  );
}

export default Condition;
