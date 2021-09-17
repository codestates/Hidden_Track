import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Notification from '../TrackDetails/Notification';
import axios from 'axios';

axios.defaults.withCredentials = true;
const default_album_img = 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%95%A8%EB%B2%94+img/default_album_img.png';
let file;

function ModiCreate () {
  const [inputValue, setInputValue] = useState({
    title: '',
    img: default_album_img,
    genre: '',
    releaseAt: '',
    soundtrack: '',
    lyrics: '등록된 가사가 없습니다.'
  });
  console.log(inputValue);
  const [notice, setNotice] = useState([]);
  const [src, setSrc] = useState(default_album_img);

  const history = useHistory();

  // 알림 추가, 삭제 핸들러
  function handleNotice (message, dismissTime) {
    // console.log('실행')
    // const uuid = Math.random()
    for (const el of notice) {
      if (el.message === message) return;
    }
    const uuid = notice.length;
    setNotice([...notice, { message: message, dismissTime: dismissTime, uuid: uuid }]);

    setTimeout(() => {
      setNotice(notice.slice(1));
    }, dismissTime);
  }

  function handleInputValue (key, e) {
    e.preventDefault();
    setInputValue({ ...inputValue, [key]: e.target.value });
  }

  // image 파일 업로드 유효성 검사 함수
  function isValidImg (key, file) {
    if (key === '이미지') {
      return file.type.match('image/');
    } else if (key === '오디오') {
      return file.type.match('audio/');
    }
  }

  // 이미지 미리보기 적용 함수
  function handleImgSrc (key, e) {
    e.preventDefault();
    file = e.target.files[0];
    // 서버에 formdata형식으로 파일을 보내기 위한 로직
    if (!isValidImg(key, file)) {
      handleNotice(`${key} 파일만 업로드 가능합니다.`, 5000);
    } else if (key === '이미지') {
      // 파일을 읽기 위해 FileReader를 호출함 파일을 아직 읽은것은 아님
      const reader = new FileReader();

      // 파일을 url값으로 읽는 이벤트 총 4가지중 하나
      reader.readAsDataURL(file);

      // 이 이벤트는 읽기 동작이 성공적으로 완료 되었을 때마다 발생합니다.
      reader.onload = function () {
        setSrc(reader.result);
      };
      // FormData 형식으로 s3에 이미지를 업로드 하기 위해 FormData를 호출함
      const ImgData = new FormData();

      // FormData 객체안에 이미 키가 존재하면 그 키에 새로운 값을 추가하고, 키가 없으면 추가합니다.
      ImgData.append('closet', file);

      axios.post('http://localhost:4000/upload', ImgData)
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
            setInputValue({ ...inputValue, img: res.data.image_url });
          } else if (res.status === 401) {
            handleNotice('권한이 없습니다.', 5000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function requestCreate () {

  }
  if (!src === default_album_img) {
  }

  return (
    <div>
      <form id='modi-create' onSubmit={() => { requestCreate(); }}>
        <fieldset>
          <legend className='legend-Hidden'>음원 등록 폼</legend>
          <div className='album-img-box'>
            <img className='album-img' src={src} style={{ width: '350px', height: '350px' }} />
            <input id='album-input-btn' className='contents__btn' type='file' onChange={(e) => { handleImgSrc('이미지', e); }} />
          </div>
          <section>
            <input type='text' className='music-input' placeholder='곡 제목' onChange={(e) => { handleInputValue('title', e); }} required />
            <select name='genre' className='genre-select' defaultValue='' onChange={(e) => { handleInputValue('genre', e); }} required>
              <option hidden='' disabled='disabled' value=''>--음원 장르를 선택 해주세요--</option>
              <option value='Ballad'>Ballad</option>
              <option value='Rap/Hiphop'>Rap/Hiphop</option>
              <option value='R&B/Soul'>R&B/Soul</option>
              <option value='Rock/Metal'>Rock/Metal</option>
              <option value='Jazz'>Jazz</option>
            </select>
            <input type='date' className='music-input' onChange={(e) => { handleInputValue('releaseAt', e); }} required />
            <input type='file' id='music-input-btn' className='contents__btn' onChange={(e) => { handleImgSrc('오디오', e); }} required />
          </section>
          <div className='music-lyrics-input'>
            <input type='text' className='input-lyrics' placeholder='가사' onChange={(e) => { handleInputValue('lyrics', e); }} />
          </div>
          <section>
            {/* 해시태그 */}
          </section>
          <div className='post-create-btn-box'>
            <button className='contents__btn' type='submit'>음원 등록</button>
          </div>
        </fieldset>
      </form>
      <Notification notice={notice} />
    </div>
  );
}

export default ModiCreate;
