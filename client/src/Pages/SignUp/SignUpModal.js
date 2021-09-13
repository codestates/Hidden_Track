import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './SignUpModal.scss';

function SignUpModal () {
  const [isOpen, setIsOpen] = useState(true);
  const [text, setText] = useState('가입이 완료되었습니다.');

  const history = useHistory();

  function openModalHandler () {
    setIsOpen(!isOpen);
    history.push('/');
  }

  return (
    <>
      {isOpen
        ? <div className='modal-backdrop__signup'>
          <div className='modal-container__signup'>
            <div className='modal-view'>
              <p className='desc'>{text}</p>
              <div className='modal__signup-btn' onClick={openModalHandler}>확인</div>
            </div>
          </div>
        </div>
        : null}
    </>
  );
}

export default SignUpModal;
