import React, { useState } from 'react';
import { useHistory } from 'react-router';

function ModiCreate () {
  const [inputValue, setInputValue] = useState({
    title: '',
    img: 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%95%A8%EB%B2%94+img/wind.jpg',
    genre: '',
    releaseAt: '',
    soundtrack: '',
    lyric: ''
  });
  console.log(inputValue);

  function handleInputValue (key, e) {
    e.preventDefault();
    setInputValue({ ...inputValue, [key]: e.target.value });
  }

  // image 파일 확장자 유효성 함수
  function validImageType (img) {
    const type = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp'
    ];
    return type.indexOf(img.type) > -1;
  }

  function handleImgSrc (e) {
    if (validImageType(e.target.files[0])) {
      alert();
    }
    console.log(e.target.files[0]);
  }

  function requestCreate () {
    console.log('요청');
  }

  return (
    <form id='modi-create' onSubmit={() => { requestCreate(); }}>
      <fieldset>
        <legend className='legend-Hidden'>음원 등록 폼</legend>
        <div className='album-img-box'>
          <img className='album-img' src={inputValue.img} />
          <input id='album-input-btn' className='contents__btn' type='file' onChange={(e) => { handleImgSrc(e); }} />
        </div>
        <section>
          <input type='text' className='music-input' placeholder='곡 제목' onChange={(e) => { handleInputValue('title', e); }} required />
          <select name='genre' className='genre-select' onChange={(e) => { handleInputValue('genre', e); }} required>
            <option hidden='' disabled='disabled' selected='selected' value=''>--음원 장르를 선택 해주세요--</option>
            <option value='Ballad'>Ballad</option>
            <option value='Rap/Hiphop'>Rap/Hiphop</option>
            <option value='R&B/Soul'>R&B/Soul</option>
            <option value='Rock/Metal'>Rock/Metal</option>
            <option value='Jazz'>Jazz</option>
          </select>
          <input type='date' className='music-input' onChange={(e) => { handleInputValue('releaseAt', e); }} required />
          <input type='file' id='music-input-btn' className='contents__btn' required />
        </section>
        <div className='music-lyrics-input'>
          <input type='text' className='input-lyrics' />
        </div>
        <section>
          {/* 해시태그 */}
        </section>
        <div className='post-create-btn-box'>
          <button className='contents__btn' type='submit'>음원 등록</button>
        </div>
      </fieldset>
    </form>
  );
}

export default ModiCreate;
