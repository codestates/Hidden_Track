import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginHandler } from '../../Redux/actions/actions';
import Portal from './Portal';
import './ContentDeleteModal.scss';
// import './index.scss';

function ContentDeleteModal ({ visible, setIsContentDeleteModalOpen }) {
  const history = useHistory();

  function handleContentModalBack (e) {
    e.preventDefault();
    setIsContentDeleteModalOpen(false);
  }

  function moveMainPage (e) {
    e.preventDefault();
    history.push('/');
  }

  function handleContentDeleteModalCloseBtn (e) {
    e.preventDefault();
    setIsContentDeleteModalOpen(false);
  }

  return (
    <>
      <Portal elementId='modal-root'>
        <div
          className='modal-backdrop__content-delete' style={visible ? { display: 'block' } : { display: 'none' }}
          visible={visible.toString()} onClick={(e) => handleContentModalBack(e)}
        />
        <form className='modal-container__content-delete'>
          <fieldset>
            <legend className='a11yHidden'>음원 삭제 폼</legend>
            <p className='content-delete-modal-title'>해당 컨텐츠를 삭제하시겠습니까?</p>
            <div className='modal__content-delete-btn'>
              <button type='submit' onClick={(e) => moveMainPage(e)}>예</button>
              {/** 서버에 엑세스토큰 요청 삭제 */}
              <button onClick={(e) => handleContentDeleteModalCloseBtn(e)}>아니오</button>
            </div>
            <label htmlFor='content-delete-modal-close-btn' className='content-delete-modal-close-btn' onClick={(e) => handleContentDeleteModalCloseBtn(e)}>X</label>
            <button id='content-delete-modal-close-btn' style={{ display: 'none' }} />
          </fieldset>
        </form>
      </Portal>
    </>
  );
}

export default ContentDeleteModal;
