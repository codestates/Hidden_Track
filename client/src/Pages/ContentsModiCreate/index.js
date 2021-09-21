import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getTrackDetails, getUserInfo } from '../../Redux/actions/actions';
import InputHashTag from './InputHashTag';
import axios from 'axios';
import './index.scss'
// import { noExtendLeft } from 'sequelize/types/lib/operators';
// isModify 값은 수정 버튼을 눌렀을때 localstorage에 저장시킨다. 여기서는 값만 가져오고 페이지를 벗어날때는 삭제시킨다.
// trackdetail의 id값을 localstorage에 저장해서 새로고침시 값이 날라가지 않게 한다.
axios.defaults.withCredentials = true;
const default_album_img = 'https://take-closet-bucket.s3.ap-northeast-2.amazonaws.com/%EC%95%A8%EB%B2%94+img/default_album_img.png';

function TestMo ({ handleNotice }) {
  const userInfo = useSelector(state => state.userInfoReducer);
  const trackDetail = useSelector(state => state.trackDetailReducer);
  const isModify = useSelector(state => state.modifyReducer.onClickModify);
  const dispatch = useDispatch()
  // const accessToken = useSelector(state => state.accessTokenReducer)
  const [inputValue, setInputValue] = useState({
    id: isModify ? trackDetail.id : '',
    title: isModify ? trackDetail.title : '',
    img: isModify ? trackDetail.img : default_album_img,
    genre: isModify ? trackDetail.genre : '',
    releaseAt: isModify ? trackDetail.releaseAt : '',
    soundtrack: isModify ? trackDetail.soundtrack : '',
    lyrics: isModify ? trackDetail.lyric : '등록된 가사가 없습니다.',
    tag: isModify ? trackDetail.hashtag.tag : []
  });
  const [src, setSrc] = useState(isModify ? trackDetail.img : default_album_img);
  const [files, setFiles] = useState({ image: '', audio: '' });
  // console.log('인풋', inputValue)
  // console.log('파일', files.audio.name)
  // const history = useHistory();
  // ?##############################################################################################
  // input값 state 저장 함수
  function handleInputValue (key, e, tag) {
    e.preventDefault();
    if (key === 'tag') {
      setInputValue({ ...inputValue, [key]: [...inputValue.tag, e.target.value] });
    } else if (key === 'deleteTag') {
      setInputValue({ ...inputValue, tag: tag });
    } else {
      setInputValue({ ...inputValue, [key]: e.target.value });
    }
  }

  // input 필수 값이 입력 되었는지 체크하는 함수
  function CheckEssential () {
    // 필수값 곡제목, 장르, 날짜, 음원
    if (!inputValue.title === '') {
      handleNotice('필수값을 입력 해주세요(곡 제목)', 2500);
      return false;
    } else if (inputValue.genre === '') {
      handleNotice('필수값을 입력 해주세요(장르)', 2500);
      return false;
    } else if (inputValue.releaseAt === '') {
      handleNotice('필수값을 입력 해주세요(발매일)', 2500);
      return false;
    } else if (files.audio === '') {
      handleNotice('필수값을 입력 해주세요(음원 파일)', 2500);
      return false;
    } else {
      // 전부 입력됨
      return true;
    }
  }

  // 파일 업로드시 확장자 유효성 검사 함수
  function isValidFile (key, file) {
    if (key === 'image') {
      return file.type.match('image/');
    } else if (key === 'audio') {
      return file.type.match('audio/');
    }
  }

  // 접근 권한 유효성 검사 함수
  function isValidUser () {
    // 음원 등록으로 들어왔을 경우
    if (!isModify) {
      return userInfo.admin === 'artist';
    }
    // 수정 버튼으로 들어왔을 경우
    else {
      return userInfo.admin === 'artist' && userInfo.nickName === trackDetail.user.nickname;
    }
  }
  // ?##############################################################################################
  // 이미지 미리보기 함수
  function handleFileRead (key, e) {
    e.preventDefault();
    const file = e.target.files[0];

    // 파일을 올리지 않을시 에러 대비
    if (!file) return;

    // 서버에 formdata형식으로 파일을 보내기 위한 로직
    if (!isValidFile(key, file)) {
      return handleNotice(`${key} 파일만 업로드 가능합니다.`, 5000);
    } else if (key === 'image') {
      setFiles({ ...files, [key]: file });
      // 파일을 읽기 위해 FileReader를 호출함 파일을 아직 읽은것은 아님
      const reader = new FileReader();

      // 파일을 url값으로 읽는 이벤트 총 4가지중 하나
      reader.readAsDataURL(file);

      // 이 이벤트는 읽기 동작이 성공적으로 완료 되었을 때마다 발생합니다.
      reader.onload = function () {
        setSrc(reader.result);
      };
    } else if (key === 'audio') {
      setFiles({ ...files, [key]: file });
    }
  }

  // s3에 업로드 하는 함수
  function uploadFile (key, method) {
    // FormData 형식으로 s3에 이미지를 업로드 하기 위해 FormData를 호출함
    const formData = new FormData();
    let path;
    // FormData 객체안에 이미 키가 존재하면 그 키에 새로운 값을 추가하고, 키가 없으면 추가합니다.
    if (key === 'image') {
      if (src === default_album_img) {
        return;
      } else {
        path = 'trackimage';
        // formData.append('img', files.image);
        formData.append('closet', files.image);
      }
    } else if (key === 'audio') {
      path = 'trackfile';
      // formData.append('soundtrack', files.audio);
      formData.append('closet', files.audio);
    }
    // method(`http://localhost:4000/track/${path}`, formData)
    return method('http://localhost:4000/upload', formData)
      .then(res => {
        if (res.status === 200) {
          setInputValue({ ...inputValue, [key === 'image' ? 'img' : 'soundtrack']: res.data.image_url });
          return 'success';
        } else if (res.status === 401) {
          handleNotice('권한이 없습니다.', 5000);
        }
      })
      .catch(err => {
        console.log(err);
        handleNotice('파일 업로드에 실패하였습니다.', 5000);
      });
  }

  // 음원 등록 요청 함수
  async function requestCreate (e) {
    e.preventDefault();
    // s3에 음원 이미지 업로드 해야됨
    // 성공하면 state에 그 url값을 저장하잖아요
    // 근데 여기서 state가
    // 유효성 통과 됐을 경우
    if (CheckEssential()) {
      let method;

      if (isModify) {
        method = axios.patch;
      } else {
        method = axios.post;
      }

      handleNotice('업로드중.. 잠시 기다려주세요', 5000);
      const audioUpload = await uploadFile('audio', method);
      console.log('오디오 완');
      const imageUpload = await uploadFile('image', method);
      console.log('이미지 완');
      if (audioUpload && imageUpload) {
        console.log('실행?');
        await method(`${process.env.REACT_APP_API_URL}/track/track`, inputValue)
          .then(res => {
            if (res.status === 200) {
              handleNotice('음원 등록이 성공하였습니다.', 5000);
              const parameters = res.data.id // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 수정 필요
              axios.get(`${process.env.REACT_APP_API_URL}/post/track:${res.data.id}`)
                .then(res => {
                    if(res.status === 200){
                      dispatch(getTrackDetails(res.data.track))
                    }else if (res.status === 400){
                      handleNotice('페이지를 찾을 수 없습니다.', 5000);
                    }
                })
                .catch(err => console.log(err));
            } else if (res.status === 400) {
              handleNotice('입력값이 부족합니다!', 5000);
            } else if (res.status === 401) {
              handleNotice('권한이 없습니다.', 5000);
            }
          })
          .catch(err => console.log(err));
      } else {
        console.log('못함?');
      }
    }
  }

  // ?##############################################################################################

  return (
    <div id='modi-create'>
      {isValidUser()
        ? 
          <>
          <div className='default-input-box'>
          <div className='album-img-box'>
            <img className='album-img' src={src} />
            <label htmlFor='album-input-btn' className='contents__btn'>앨범 이미지 첨부</label>
            <span>{!files.image.name?'No file chosen': `${files.image.name}`}</span>
            <input id='album-input-btn' type='file' style={{display: 'none'}} onChange={(e) => { handleFileRead('image', e); }} />
          </div>
          <section className='default-input-section'>
            <input type='text' className='music-input' placeholder='곡 제목' value={inputValue.title} onChange={(e) => { handleInputValue('title', e); }} required />
            <select name='genre' className='music-input' defaultValue={inputValue.genre} onChange={(e) => { handleInputValue('genre', e); }} required>
              <option hidden='' disabled='disabled' value=''>--음원 장르를 선택 해주세요--</option>
              <option value='Ballad'>Ballad</option>
              <option value='Rap/Hiphop'>Rap/Hiphop</option>
              <option value='R&B/Soul'>R&B/Soul</option>
              <option value='Rock/Metal'>Rock/Metal</option>
              <option value='Jazz'>Jazz</option>
            </select>
            <div>
            <span style={{fontSize: '20px'}}>발매일 : </span>
            <input type='date' className='music-release' value={inputValue.releaseAt} onChange={(e) => { handleInputValue('releaseAt', e); }} required />
            </div>
            <div>
            <label htmlFor='music-input-btn' className='contents__btn'>음원파일첨부</label>
            <div>{!files.audio.name?'No file chosen': `${files.audio.name}`}</div>
            <input type='file' id='music-input-btn' style={{display:'none'}}onChange={(e) => { handleFileRead('audio', e); }} required={!isModify} />
            </div>
            
          </section>
          </div>
          <section className='music-lyrics-hashtag-box'>
          <div className='music-lyrics-input'>
            <span>가사</span>
            <textarea  className='input-lyrics' placeholder='가사' value={inputValue.lyrics} onChange={(e) => { handleInputValue('lyrics', e); }} />
          </div>
          <InputHashTag tagList={inputValue.tag} handleInputValue={handleInputValue} handleNotice={handleNotice} />
          </section>
          <div className='post-create-btn-box'>
            <button className='contents__btn' onClick={(e) => { requestCreate(e); }}>음원 등록</button>
          </div>
          </>
        : <h1>잘못된 접근 입니다.</h1>}
    </div>
  );
}

export default TestMo;