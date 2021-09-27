import React from 'react';

function InputImage ({ inputValue, handleInputValue, initialImage, setImageFile }) {
  // 프로필 이미지 파일 미리보기 구현
  function handleProfile (e) {
    e.preventDefault();

    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();

    reader.onload = function () {
      handleInputValue('previewFile', reader.result);
    };
    reader.readAsDataURL(file);
  }

  // 이미지 삭제 버튼 클릭시 실행되는 함수
  function deleteImage (e) {
    e.preventDefault();
    // handleInputValue('imageFile', null);
    setImageFile(null);
    handleInputValue('previewFile', null);
  }

  return (
    <div className='profile-container'>
      <div className='profile-wrap'>
        <div className='profile-box'>
          <img className='profile-image' src={inputValue.previewFile || initialImage} alt='' />
        </div>
        <p>프로필 이미지(선택사항)</p>
      </div>
      <div className='profile-btn-box'>
        <label className='profile-input-btn' htmlFor='profile'>파일첨부</label>
        <input id='profile' style={{ display: 'none' }} type='file' accept='.jpg, .jpeg, png, gif, bmp' onChange={(e) => handleProfile(e)} />
        <button className='profile-delete-btn' onClick={(e) => deleteImage(e)}>이미지 삭제</button>
      </div>
    </div>
  );
}

export default InputImage;
