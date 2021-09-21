import React from 'react';
// import axios from 'axios';
import './InputImage.scss';

function InputImage ({ inputValue, handleInputValue, initialImage }) {
  // 프로필 이미지 파일 미리보기 구현
  function handleProfile (e) {
    e.preventDefault();

    const file = e.target.files[0];
    handleInputValue('imageFile', file);
    const reader = new FileReader();

    reader.onload = function () {
      handleInputValue('previewFile', reader.result);
    };
    reader.readAsDataURL(file);

    // const formData = new FormData();
    // formData.append('profile', file);

    // axios.post(`${process.env.REACT_APP_API_URL}/uploadimg`, formData)
    //   .then(res => {
    //     console.log(res.data);
    //     if (res.status === 200) {
    //       setImageUrl(res.data.imgurl);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  // 이미지 삭제 버튼 클릭시 실행되는 함수
  function deleteImage (e) {
    e.preventDefault();
    handleInputValue('imageFile', null);
    handleInputValue('previewFile', null);
  }

  return (
    <div className='profile-container'>
      <div className='profile-box'>
        <img className='profile-image' src={inputValue.previewFile || initialImage} alt='' />
      </div>
      <label htmlFor='profile'>파일첨부</label>
      <input id='profile' style={{ display: 'none' }} type='file' accept='.jpg, .jpeg, png, gif, bmp' onChange={(e) => handleProfile(e)} />
      <button onClick={(e) => deleteImage(e)}>이미지 삭제</button>
      <p>프로필 이미지(선택사항)</p>
    </div>
  );
}

export default InputImage;
