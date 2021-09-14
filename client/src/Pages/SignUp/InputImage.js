import React from 'react';
import axios from 'axios';
import './InputImage.scss';

axios.defaults.withCredentials = true;

function InputImage ({ imageFile, setImageFile, imageUrl, setImageUrl }) {
  // 프로필 이미지 파일 미리보기 구현 및 url 서버로부터 받아오는 함수
  function handleProfile (e) {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      setImageFile(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('profile', file);

    axios.post(`${process.env.REACT_APP_API_URL}/uploadimg`, formData)
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          setImageUrl(res.data.imgurl);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className='profile-container'>
      <div className='profile-box'>
        <img className='profile-image' src={imageFile} alt='' />
      </div>
      <label for='profile'>파일첨부</label>
      <input id='profile' style={{ display: 'none' }} type='file' accept='.jpg, .jpeg, png, gif, bmp' onChange={(e) => handleProfile(e)} />
    </div>
  );
}

export default InputImage;
