import React from 'react';

function Condition ({ handleInputValue, requestAdminChange }, isAdminCheck) {
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
  // <div className='sign-up-condition'>
  //   <div>
  //     소속사: <input type='text' placeholder='소속사' onChange={(e) => handleAgency(e)} />
  //   </div>
  //   <div>
  //     데뷔일: <input type='date' onChange={(e) => handleDebut(e)} />
  //   </div>
  //   <div>
  //     {/* <input type='text' placeholder='이메일' onChange={(e) => handleEmail(e)} /> */}
  //     이메일: <input type='email' placeholder='이메일' onChange={(e) => handleEmail(e)} />
  //   </div>
  // </div>

    <form className='sign-up-condition' onSubmit={(e) => requestAdminChange(e)}>
      <div>
        <label>소속사:</label>
        <input type='text' placeholder='소속사' onChange={(e) => handleAgency(e)} />
      </div>
      <div>
        <label>데뷔일:</label>
        <input type='date' onChange={(e) => handleDebut(e)} />
      </div>
      <div>
        <label>이메일:</label>
        <input type='email' placeholder='이메일' onChange={(e) => handleEmail(e)} />
      </div>
      {isAdminCheck && <button type='submit'>전환하기</button>}
    </form>
  );
}

export default Condition;
