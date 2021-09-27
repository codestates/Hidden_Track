// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router';
// import { useSelector, useDispatch } from 'react-redux';
// import { getTrackDetails } from '../../Redux/actions/actions';
// import InputHashTag from './InputHashTag';
// import axios from 'axios';
// // isModify 값은 수정 버튼을 눌렀을때 localstorage에 저장시킨다. 여기서는 값만 가져오고 페이지를 벗어날때는 삭제시킨다.
// // trackdetail의 id값을 localstorage에 저장해서 새로고침시 값이 날라가지 않게 한다.
// axios.defaults.withCredentials = true;
// const default_album_img = 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%95%A8%EB%B2%94+img/default_album_img.png';

// function ModiCreate ({ handleNotice }) {
//   const userInfo = useSelector(state => state.userInfoReducer);
//   const trackDetail = useSelector(state => state.trackDetailReducer);
//   const isModify = useSelector(state => state.modifyReducer.onClickModify);
//   // const accessToken = useSelector(state => state.accessTokenReducer)
//   const [inputValue, setInputValue] = useState({
//     title: isModify ? trackDetail.title : null,
//     img: isModify ? trackDetail.img : default_album_img,
//     genre: isModify ? trackDetail.genre : '',
//     releaseAt: isModify ? trackDetail.releaseAt : null,
//     soundtrack: isModify ? trackDetail.soundtrack : null,
//     lyrics: isModify ? trackDetail.lyric : '등록된 가사가 없습니다.',
//     tag: isModify ? trackDetail.tag : []
//   });
//   console.log(inputValue);
//   const [src, setSrc] = useState(isModify ? trackDetail.img : default_album_img);
//   const history = useHistory();
//   const dispatch = useDispatch();
//   // input값 state 저장 함수
//   function handleInputValue (key, e, tag) {
//     e.preventDefault();
//     if (key === 'tag') {
//       setInputValue({ ...inputValue, [key]: [...inputValue.tag, tag] });
//     } else if (key === 'deleteTag') {
//       setInputValue({ ...inputValue, tag: tag });
//     } else {
//       setInputValue({ ...inputValue, [key]: e.target.value });
//     }
//   }

//   // 파일 업로드시 확장자 유효성 검사 함수
//   function isValidFile (key, file) {
//     if (key === '이미지') {
//       return file.type.match('image/');
//     } else if (key === '오디오') {
//       return file.type.match('audio/');
//     }
//   }

//   // 이미지, 오디오 파일 업로드 및 이미지 미리보기 함수
//   function handleFile (key, e) {
//     e.preventDefault();
//     const file = e.target.files[0];
//     let method;
//     // 서버에 formdata형식으로 파일을 보내기 위한 로직
//     if (!isValidFile(key, file)) {
//       handleNotice(`${key} 파일만 업로드 가능합니다.`, 5000);
//     } else if (key === '이미지') {
//       // 파일을 읽기 위해 FileReader를 호출함 파일을 아직 읽은것은 아님
//       const reader = new FileReader();

//       // 파일을 url값으로 읽는 이벤트 총 4가지중 하나
//       reader.readAsDataURL(file);

//       // 이 이벤트는 읽기 동작이 성공적으로 완료 되었을 때마다 발생합니다.
//       reader.onload = function () {
//         setSrc(reader.result);
//       };
//       // FormData 형식으로 s3에 이미지를 업로드 하기 위해 FormData를 호출함
//       const ImgData = new FormData();

//       // FormData 객체안에 이미 키가 존재하면 그 키에 새로운 값을 추가하고, 키가 없으면 추가합니다.
//       ImgData.append('closet', file);

//       if (isModify) {
//         method = axios.patch;
//       } else {
//         method = axios.post;
//       }

//       method('http://localhost:4000/upload', ImgData)
//         .then(res => {
//           if (res.status === 200) {
//             setInputValue({ ...inputValue, img: res.data.image_url });
//           } else if (res.status === 401) {
//             handleNotice('권한이 없습니다.', 5000);
//           }
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     } else if (key === '오디오') {
//       const audioData = new FormData();

//       audioData.append('closet', file);

//       if (isModify) {
//         method = axios.patch;
//       } else {
//         method = axios.post;
//       }

//       method('http://localhost:4000/upload', audioData)
//         .then(res => {
//           if (res.status === 200) {
//             setInputValue({ ...inputValue, soundtrack: res.data.image_url });
//           } else if (res.status === 401) {
//             handleNotice('권한이 없습니다.', 5000);
//           }
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }
//   }
//   // 음원 등록 요청 함수
//   function requestCreate (e) {
//     e.preventDefault();
//     // s3에 음원 이미지 업로드 해야됨
//     // 성공하면 state에 그 url값을 저장하잖아요
//     // 근데 여기서 state가
//     // 유효성 통과 됐을 경우
//     let method;

//     if (isModify) {
//       method = axios.patch;
//     } else {
//       method = axios.post;
//     }

//     method(`${process.env.REACT_APP_API_URL}/track/track`, inputValue)
//       .then(res => {
//         if (res.status === 200) {
//           handleNotice('음원이 등록에 성공하였습니다.', 5000);
//           axios.get(`${process.env.REACT_APP_API_URL}/post/track:${res.data.postId}`)
//             .then(res => dispatch(getTrackDetails(res.data.track)));
//         } else if (res.status === 400) {
//           handleNotice('입력값이 부족합니다!', 5000);
//         } else if (res.status === 401) {
//           handleNotice('권한이 없습니다.', 5000);
//         }
//       });
//   }

//   // 접근 권한 유효성 검사 함수
//   function isValidUser () {
//     // 음원 등록으로 들어왔을 경우
//     if (!isModify) {
//       return userInfo.admin === 'artist';
//     }
//     // 수정 버튼으로 들어왔을 경우
//     else {
//       return userInfo.admin === 'artist' && userInfo.nickName === trackDetail.user.nickname;
//     }
//   }

//   return (
//     <div>
//       {isValidUser()
//         ? <div id='modi-create'>
//           <div className='album-img-box'>
//             <img className='album-img' src={src} style={{ width: '350px', height: '350px' }} />
//             <input id='album-input-btn' className='contents__btn' type='file' onChange={(e) => { handleFile('이미지', e); }} />
//           </div>
//           <section>
//             <input type='text' className='music-input' placeholder='곡 제목' value={inputValue.title} onChange={(e) => { handleInputValue('title', e); }} required />
//             <select name='genre' className='genre-select' defaultValue={inputValue.genre} onChange={(e) => { handleInputValue('genre', e); }} required>
//               <option hidden='' disabled='disabled' value=''>--음원 장르를 선택 해주세요--</option>
//               <option value='Ballad'>Ballad</option>
//               <option value='Rap/Hiphop'>Rap/Hiphop</option>
//               <option value='R&B/Soul'>R&B/Soul</option>
//               <option value='Rock/Metal'>Rock/Metal</option>
//               <option value='Jazz'>Jazz</option>
//             </select>
//             <input type='date' className='music-input' value={inputValue.releaseAt} onChange={(e) => { handleInputValue('releaseAt', e); }} required />
//             <input type='file' id='music-input-btn' className='contents__btn' onChange={(e) => { handleFile('오디오', e); }} required={!isModify} />
//           </section>
//           <div className='music-lyrics-input'>
//             <textarea style={{ resize: 'none', width: '500px', height: '600px' }} className='input-lyrics' placeholder='가사' value={inputValue.lyrics} onChange={(e) => { handleInputValue('lyrics', e); }} />
//           </div>
//           <InputHashTag tagList={inputValue.tag} handleInputValue={handleInputValue} handleNotice={handleNotice} />
//           <div className='post-create-btn-box'>
//             <button className='contents__btn' onClick={(e) => { requestCreate(e); }}>음원 등록</button>
//           </div>
//         </div>
//         : <h1>잘못된 접근 입니다.</h1>}
//     </div>
//   );
// }

// export default ModiCreate;
