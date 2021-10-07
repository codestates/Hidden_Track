import React from 'react';
import { useHistory } from 'react-router';
import './SignUpModal.scss';

function SignUpModal ({ isOpen, handleModalOpen, text }) {
  const history = useHistory();

  // 가입완료 모달창 확인 버튼 클릭시 메인 페이지로 이동하는 함수
  function openModalHandler () {
    handleModalOpen();
    if (text === '가입이 완료되었습니다.') {
      history.push('/');
    }
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
