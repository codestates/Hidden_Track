import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTrackDetails } from '../../Redux/actions/actions';
import Portal from './Portal';
import './ContentDeleteModal.scss';
// import './index.scss';

function ContentDeleteModal ({ visible, setIsContentDeleteModalOpen, trackDetail, accessToken, handleNotice }) {
  const history = useHistory();
  const dispatch = useDispatch();

  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  // 삭제 확인 모달창 배경을 클릭하면 모달창이 닫히는 함수
  function handleContentModalBack (e) {
    e.preventDefault();
    setIsContentDeleteModalOpen(false);
  }

  // 예 버튼 클릭시 삭제 요청 보내는 함수
  function requestDeleteTrack (e) {
    e.preventDefault();

    axios.delete(`${process.env.REACT_APP_API_URL}/track`, {
      id: trackDetail.id
    })
      .then(res => {
        console.log('음원 삭제 요청 응답', res.data);
        if (res.status === 200) {
        // trackDetail 상태 삭제
          dispatch(getTrackDetails({
            id: '',
            title: '',
            img: '',
            genre: '',
            soundtrack: '',
            releaseAt: '',
            lyric: '',
            like: {
              count: ''
            },
            post: {
              id: '',
              views: '',
              gradeAev: ''
            },
            user: {
              nickname: ''
            },
            hashtag: {
              tag: []
            },
            reply: []
          }));
          setIsContentDeleteModalOpen(false);
          handleNotice('게시글이 삭제 되었습니다.', 5000);
          history.push('/');
        } else if (res.status === 401) {
          setIsContentDeleteModalOpen(false);
          handleNotice('권한이 없습니다.', 5000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  // 삭제 확인 모달창 아니오 클릭시 모달창 닫히는 함수
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
              <button type='submit' onClick={(e) => requestDeleteTrack(e)}>예</button>
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
