import React from 'react';

function Condition ({ handleInputValue, requestAdminChange, isAdminCheck,}) {
  function handleAgency (e) {
    handleInputValue('agency', e.target.value, 'userArtist');
  }

  function handleDebut (e) {
    console.log(e);
    handleInputValue('debut', e.target.value, 'userArtist');
  }

  function handleEmail (e) {
    handleInputValue('email', e.target.value, 'userArtist');
  }

  return (
    <form className='sign-up-condition form__my-page__Condition' onSubmit={(e) => requestAdminChange(e)}>
      <div className='sign-up-agency-box form__div__agency'>
        <label>소속사:</label>
        <input type='text' placeholder='소속사' onChange={(e) => handleAgency(e)} />
      </div>
      <div className='sign-up-debut-box form__div__debut'>
        <label className='debut-date'>데뷔일</label>
        <input type='date' onChange={(e) => handleDebut(e)} />
      </div>
      <div className='sign-up-email-box form__div__email'>
        <label>이메일:</label>
        <input type='email' placeholder='이메일' onChange={(e) => handleEmail(e)} />
      </div>
      {isAdminCheck && <button className='change-admin-btn' type='submit'>계정 전환</button>}
    </form>
  );
}

export default Condition;
