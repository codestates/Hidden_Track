import React from 'react';

function Condition ({ setAgency, setDate, setEmail }) {
  function handleAgency (e) {
    setAgency(e.target.value);
  }

  function handleDate (e) {
    setDate(e.target.value);
    console.log(e);
  }

  function handleEmail (e) {
    setEmail(e.target.value);
  }

  return (
    <div>
      <div>
        <input type='text' placeholder='소속사' onChange={(e) => handleAgency(e)} />
      </div>
      <div>
        데뷔일: <input type='date' onChange={(e) => handleDate(e)} />
      </div>
      <div>
        {/* <input type='text' placeholder='이메일' onChange={(e) => handleEmail(e)} /> */}
        <input type='email' placeholder='이메일' onChange={(e) => handleEmail(e)} />
      </div>
    </div>
  );
}

export default Condition;
