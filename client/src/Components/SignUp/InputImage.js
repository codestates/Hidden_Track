import React, { useState } from 'react';
import axios from 'axios';
import './InputImage.css';

axios.defaults.withCredentials = true;

function InputImage () {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

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
      <input type='file' accept='.jpg, .jpeg, png, gif, bmp' onChange={(e) => handleProfile(e)} />
    </div>
  );
}

export default InputImage;
