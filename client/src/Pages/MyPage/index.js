// 라이브러리
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// 리덕스 import
import { getUserInfo, getAccessToken } from '../../Redux/actions/actions';

// 컴포넌트 import
import Condition from '../SignUp/Condition';
import WithDrawalModal from './WithDrawalModal';
import Footer from '../../Components/Footer';

// 함수 import
import { accessTokenRequest } from '../../Components/TokenFunction';
import './index.scss';

axios.defaults.withCredentials = true;

function MyPage ({ handleNotice }) {
  const userInfo = useSelector(state => state.userInfoReducer);
  const state3 = useSelector(state => state.accessTokenReducer); // accessToken 관련
  const dispatch = useDispatch();

  const { accessToken } = state3;
  // console.log(accessToken);
  const [isWithDrawalModalOpen, setIsWithDrawalModalOpen] = useState(false);
  const [user, setUser] = useState(userInfo);
  const [isAdminCheck, setIsAdminCheck] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [ChangePassword, setChangePassword] = useState('');
  const [checkedPassword, setCheckedPassword] = useState('');
  const [message, setMessage] = useState({
    duplicatedId: '',
    validPW: '',
    validCurrentPW: '',
    matchPW: '',
    validMatchPW: '',
    duplicatedNick: '',
    checkNickLength: ''
  });

  // 프로필 이미지 미리보기 함수
  function ProfileImagePreview (e) {
    e.preventDefault();

    const file = e.target.files[0];
    console.log(file);

    const reader = new FileReader(); // -> 파일 읽기 완료
    reader.onload = function () {
      handleInputValue('profile', reader.result);
    };
    reader.readAsDataURL(file);
  }

  // 프로필 이미지 변경 눌렀을 때 프로필 이미지 변경 서버 요청 onSubmit 이벤트 함수
  function requestChangeProfileImage (e) {
    e.preventDefault();

    // 변경할 이미지 파일 (onSubmit 썼기때문에 input file 값에 접근하려면 e.target.img.files[0] 해야함)
    const file = e.target.img.files[0];

    const formData = new FormData(); // <- form 태그랑은 다른거임.
    formData.append('profile', file);

    // 프로필 이미지 변경 요청 서버에 보냄
    axios.patch(`${process.env.REACT_APP_API_URL}/user/profile`,
      formData,
      { headers: { accesstoken: accessToken } }

    ).then(res => { // <- res의 data에 accessToken 과, 쿠키에 refreshToken 담겨있을 것이다.
      console.log('프로필 이미지 변경 요청 응답', res.data);
      if (res.status === 200) {
        // setState
        handleInputValue('profile', res.data.profile);

        // 리덕스에 있는 유저 인포 업뎃 (dispatch)
        const changedUser = { ...userInfo, profile: res.data.profile };
        dispatch(getUserInfo(changedUser));

        handleNotice('이미지가 변경되었습니다', 2000);
      }
    }
    ).catch(err => {
      if (err.response) {
        if (err.response.status === 401) { // <- 유저 권한이 없는 경우
          console.log('401 에러다');
          handleNotice('권한이 없습니다.', 2000);
        }
      } else {
        console.log('다른 에러다', err);
        handleNotice('잘못된 접근입니다', 2000);
      }
    }
    );
  }

  // 프로필 이미지 삭제해서 기본 이미지로 프로필 이미지 변경 서버 요청 onClick 이벤트 함수
  function requestDeleteProfileImage () {
    // 프로필 이미지 삭제 요청 서버에 보냄
    axios.delete(`${process.env.REACT_APP_API_URL}/user/profile`,
      { headers: { accesstoken: accessToken } }

    ).then(res => { // <- res의 data에 accessToken 과, 쿠키에 refreshToken 담겨있을 것이다.
      console.log('프로필 이미지 삭제 요청 응답', res.data);
      if (res.status === 200) {
        // setState
        handleInputValue('profile', res.data.profile);

        // 리덕스에 있는 유저 인포 업뎃 (dispatch)
        const changedUser = { ...userInfo, profile: res.data.profile };
        dispatch(getUserInfo(changedUser));

        handleNotice('이미지가 삭제되었습니다', 2000);
      }
    }
    ).catch(err => {
      if (err.response) {
        if (err.response.status === 400) { // <- 이미 기본 이미지일 경우
          // console.log('400 에러다');
          console.log(err.response);
          handleNotice('삭제할 이미지가 없습니다', 2000);
        } else if (err.response.status === 401) { // <- 유저 권한이 없는 경우
          console.log('401 에러다');
          handleNotice('권한이 없습니다.', 2000);
        }
      }
    }
    );
  }

  // 비밀번호 변경 눌렀을 때 비밀번호 변경 서버 요청 onSubmit 이벤트 함수
  function requestPW (e) {
    e.preventDefault();

    // 비밀번호 번경 요청 서버에 보냄
    axios.patch(`${process.env.REACT_APP_API_URL}/user/password`, // <- 나 비밀번호 변경 해도 되니~?
      { currentPassword, password: ChangePassword }, // <- 현재 비밀번호와 바꿀 비밀번호를 body 에 담아서 서버로 전달
      { headers: { accesstoken: accessToken } }// <- password api 에서 얘를 요청 보내라고 했음

    ).then(res => {
      console.log('비밀번호 변경 요청 응답', res.data);
      if (res.status === 200) { // <- 응~ 변경해도 돼~
        handleNotice('비밀번호가 변경되었습니다', 2000);
      }
    }
    ).catch(err => {
      if (err.response) {
        if (err.response.status === 400) { // <- 비밀번호가 안들어왓을 때
          console.log('400 에러다');
          handleNotice('입력값이 부족합니다!', 2000);
        } else if (err.response.status === 401) { // <- 비밀번호가 틀리거나, accessToken이 이상하거나 만료되었거나, 안들어왓을 때
          console.log('401 에러다');
          handleNotice('권한이 없습니다.', 2000);
        }
      }
    }
    );
  }

  // 닉네임 중복확인 하는 onClick 이벤트 함수
  function CheckDuplicateNickname (key, e) {
    e.preventDefault();

    if (message.checkNickLength) {

    } else {
      axios.get(`${process.env.REACT_APP_API_URL}/user/nicknameduplication/${user.nickName}`
      ).then(res => {
        console.log('닉네임 중복확인 요청 응답', res);
        console.log('닉네임 중복확인 요청 응답', res.data); // {message: ok}
        if (res.status === 200) {
          showCheckMessage(key, '사용 가능한 닉네임 입니다.');
        }
      }
      ).catch(err => {
        if (err.response) {
          if (err.response.status === 400) {
            showCheckMessage(key, '잘못된 요청입니다.');
          } else if (err.response.status === 409) {
            showCheckMessage(key, '이미 존재하는 닉네임 입니다.');
          }
        }
      }
      );
    }
  }

  // handleInputValue 를 매번 할 필요 없이, dispatch 해서 리덕스가 업데이트 된 이후
  // 변경된 값들을 화면에 뿌려주는 방법 <=  리팩토링

  // input 창들의 값 setState 해주는 함수
  function handleInputValue (key, value, admin) {
    if (!admin) {
      setUser({ ...user, [key]: value });
    } else {
      setUser({ ...user, [admin]: { ...user.userArtist, [key]: value } });
    }
  }

  // 닉네임 변경 눌렀을 때 닉네임 변경 서버 요청 onSubmit 이벤트 함수
  function requestNickName (e) {
    e.preventDefault();

    if (message.checkNickLength) {

    } else {
    // 닉네임 변경 요청 서버에 보냄
      axios.patch(`${process.env.REACT_APP_API_URL}/user/nickname`,
        { nickName: user.nickName }, // <- body (바뀔 nickName)
        { headers: { accesstoken: accessToken } } // <- nickname api 에서 얘를 요청 보내라고 했음

      ).then(res => { // <- res의 data에 accessToken 과, refreshToken 담겨있을 것이다.
        console.log('닉네임 변경 요청 응답', res.data);
        if (res.status === 200) {
        // setState
          handleInputValue('nickName', user.nickName);

          // 리덕스에 있는 유저 인포 업뎃 (dispatch)
          const changedUser = { ...userInfo, nickName: user.nickName };
          dispatch(getUserInfo(changedUser));

          handleNotice('닉네임이 수정되었습니다', 2000);
          showCheckMessage('duplicatedNick', '');
        }
      }
      ).catch(err => {
        if (err.response) {
          if (err.response.status === 400) { // 닉네임이 안들어 왔을 때
            console.log('400 에러다');
            handleNotice('입력값이 부족합니다!', 2000);
          } else if (err.response.status === 401) { // accessToken이 이상하거나 만료되거나 안들어왓을 때
            console.log('401 에러다');
            handleNotice('권한이 없습니다.', 2000);
          }
        }
      }
      );
    }
  }

  // 중복확인 및 유효성검사 메세지 나타나게 하는 함수
  function showCheckMessage (key, value) {
    setMessage({ ...message, [key]: value });
  }

  // 비밀번호 유효성 검사 하여 검사 결과 메세지 나타나게 하는 onChange 이벤트 함수
  function PasswordValidation (key, inputValue) {
    const check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(inputValue);

    if (check || !inputValue) { // <- 위 결과가 true 이면 false
      console.log('유효성 검사 성공');
      showCheckMessage(key, '');
    } else {
      showCheckMessage(key, '비밀번호는 8자 이상 16자 이하, 알파벳과 숫자 및 특수문자를 하나 이상 포함해야 합니다.');
    }
  }

  // 수정할 비밀번호가 맞는지 확인 메세지 나타나게 하는 함수
  function PasswordMatchCheck (key, e) {
    // 비밀번호 확인 input 창의 값 = checkedPassword
    // 수정할 비밀번호 input 창의 값 = ChangePassword
    if (!checkedPassword) {
      showCheckMessage(key, '');
    } else {
      if (ChangePassword !== checkedPassword) {
        console.log('일치하지 않음');
        showCheckMessage(key, '비밀번호가 일치하지 않습니다.');
      } else {
        console.log('일치함');
        showCheckMessage(key, '');
      }
    }
  }

  // 수정할 닉네임 글자수가 10자 초과할때 메세지 나타나게 하는 함수
  function checkNickLength (key, inputValue, e) {
    const check = inputValue.length < 10;
    console.log(check);
    if (check || !inputValue) {
      showCheckMessage(key, '');
    } else {
      showCheckMessage(key, '닉네임은 10자 미만으로 입력해주세요');
    }
  }

  // 계정 전환 checkbox state setState 해주는 onChange 이벤트 함수
  function handleCheckAdmin () {
    setIsAdminCheck(!isAdminCheck);
  }

  // 회원탈퇴 모달창 나타나게 하는 onClick 이벤트 함수
  function showWithDrawalModal (e) {
    e.preventDefault();
    setIsWithDrawalModalOpen(true);
  }

  // 계정 전환 서버 요청 onClick 이벤트 함수 onSubmit 이벤트 함수(Condition 컴포넌트 내에 존재)
  function requestAdminChange (e) {
    e.preventDefault();

    // 계정 전환 요청 서버에 보냄
    axios.patch(`${process.env.REACT_APP_API_URL}/user/artist`,
      {
        agency: user.userArtist.agency,
        debut: user.userArtist.debut,
        email: user.userArtist.email
      },
      { headers: { accesstoken: accessToken } }

    ).then(async (res) => { // <- res의 data에 accessToken 과, 쿠키에 refreshToken 담겨있을 것이다.
      console.log('계정 전환 요청 응답', res);
      if (res.status === 200) {
        // setState
        handleInputValue('agency', user.userArtist.agency, 'useArtist');
        handleInputValue('debut', user.userArtist.debut, 'useArtist');
        handleInputValue('email', user.userArtist.email, 'useArtist');

        // 리덕스 update
        const result = await accessTokenRequest(res.data.data);
        dispatch(getUserInfo(result));
        dispatch(getAccessToken(res.data.data));
        handleNotice('계정 전환이 되었습니다', 2000);
      }
    }
    ).catch(err => {
      if (err.response) {
        if (err.response.status === 400) { // <- 전환할 계정의 정보가 덜 들어오거나 토큰이 없을때
          console.log('400 에러다');
          handleNotice('입력값이 부족합니다!', 2000);
        } else if (err.response.status === 401) { // <- 토큰이 제대로 된게 아니거나 만료된것
          console.log('401 에러다');
          handleNotice('권한이 없습니다.', 2000);
        } else if (err.response.status === 409) { // <- 이미 artist 계정일때
          handleNotice('이미 artist 계정입니다.', 2000);
        }
      }
    }
    );
  }

  return (
    <>
      <div className='my-page-container'>

        <div>
          <p className='nickName-title'>
            <span className='user-nickName'>{userInfo.nickName}</span> 님의 회원정보
          </p>
        </div>

        <div className='div__form__password_profile-image'>

          {/* 프로필 변경 폼  */}
          <div className='form__profile-image_delete-btn'>
            <form className='form__profile-image' onSubmit={(e) => requestChangeProfileImage(e)}>
              {/* 이미지 수정을 했을 경우  src={user.profile} */}
              {/* 기본 이미지로 했을 경우  src={userInfo.profile} */}
              {/* <div className="profile-image" style={{backgroundImage : `url(${user.profile || userInfo.profile})`}}/> */}
              <img src={user.profile || userInfo.profile} alt='프로필 이미지' />
              <label htmlFor='imgFile' className='add-profile-image-btn'>+</label>
              <input
                type='file' name='img' id='imgFile'
                style={{ display: 'none' }}
                onChange={(e) => { ProfileImagePreview(e); }}
              />
              <button className='change-btn contents__btn' type='submit' id='submit'>이미지 변경</button>
            </form>
            <button className='delete-btn contents__btn' onClick={requestDeleteProfileImage}>이미지 삭제</button>
          </div>

          {/* 비밀번호 변경 폼 */}
          <form onSubmit={requestPW} className='form__password'>

            <div className='form__div__password'>

              {/* 현재 비밀번호 input */}
              <input
                type='password' name='currentPassword' id='currentPassword' value={currentPassword}
                placeholder='현재 비밀번호를 입력해주세요'
                required
                onChange={(e) => setCurrentPassword(e.target.value)}
                onKeyUp={(e) => PasswordValidation('validCurrentPW', e.target.value)}
              />
              {/* 현재 비밀번호 유효성 검사메세지는 message.validCurrentPW 가 truthy 할때만 나타나도록 해야 한다. */}
              {message.validCurrentPW && <p className='PasswordValidation'>{message.validCurrentPW}</p>}
              {/* <p className="PasswordValidation">{message.validCurrentPW}</p> */}
            </div>

            <div className='form__div__password'>
              {/* 바뀔 비밀번호 input */}
              <input
                type='password' name='ChangePassword' id='ChangePassword' value={ChangePassword}
                onChange={(e) => setChangePassword(e.target.value)}
                placeholder='수정할 비밀번호를 입력해주세요'
                required
                onKeyUp={(e) => PasswordValidation('validPW', e.target.value)}
              />
              {/* 유효성 검사메세지는 message.validPW 가 truthy 할때만 나타나도록 해야 한다. */}
              {message.validPW && <p className='PasswordValidation'>{message.validPW}</p>}
            </div>

            <div className='form__div__password'>
              {/* 비밀번호 확인 input */}

              <div className='form__div__password-flex-box'>
                <input
                  type='password' name='password' id='CheckPassword' value={checkedPassword}
                  required
                  placeholder='수정할 비밀번호를 한번더 입력해주세요'
                  onChange={(e) => setCheckedPassword(e.target.value)}
                  onKeyUp={(e) => {
                    PasswordMatchCheck('validMatchPW', e);
                  }}
                />
                <button type='submit' className='change-btn-password contents__btn'>변경</button>
              </div>

              {/* 확인 비밀번호 유효성 검사메세지는 message.validMatchPW 가 truthy 할때만 나타나도록 해야 한다. */}
              {message.validMatchPW && <p className='PasswordValidation'>{message.validMatchPW}</p>}
              {/* 비밀번호 일치 검사메세지는 message.matchPW 가 truthy 할때만 나타나도록 해야 한다. */}
              {message.matchPW && <p className='PasswordMatchCheck'>{message.matchPW}</p>}

            </div>
          </form>

        </div>

        {/* 닉네임 변경 폼 */}
        <form onSubmit={requestNickName} className='form__nickname'>

          <div className='form__div__nickname'>
            <div className='form__div__nickname-btn-flex-box'>
              <input
                type='text' name='nickName' id='nickName' value={user.nickName}
                required
                onChange={(e) => {
                  handleInputValue('nickName', e.target.value);
                  checkNickLength('checkNickLength', e.target.value);
                }}
              />

              <button
                className='check-duplicate-btn-nickname contents__btn'
                onClick={(e) => {
                  checkNickLength('checkNickLength', user.nickName);
                  CheckDuplicateNickname('duplicatedNick', e);
                }}
              >중복확인
              </button>

              {/* 중복확인 메세지는 message.duplicatedNick 가 truthy 할때만 나타나도록 해야 한다. */}
              <button type='submit' className='change-btn-nickname contents__btn'>변경</button>
            </div>

            {message.checkNickLength && <p className='check-nickname-length'>{message.checkNickLength}</p>}
            {message.duplicatedNick && <p className='CheckDuplicateNickname'>{message.duplicatedNick}</p>}

          </div>
        </form>

        {/* userInfo.admin === 'artist' input 안 보이게 하고, p 는 아티스트 라고 보여주기 */}
        <div className='admin-change'>
          <div className='admin__change-box'>
            <input type='checkbox' name='' id='' onChange={() => { handleCheckAdmin(); }} />
            <p>아티스트 계정으로 전환하기</p>
          </div>
        </div>
        {isAdminCheck && <Condition handleInputValue={handleInputValue} requestAdminChange={requestAdminChange} isAdminCheck={isAdminCheck} />}
        <button className='with-drawal-btn contents__btn' onClick={(e) => showWithDrawalModal(e)}>회원 탈퇴</button>
        {isWithDrawalModalOpen && <WithDrawalModal visible={isWithDrawalModalOpen} setIsWithDrawalModalOpen={setIsWithDrawalModalOpen} handleNotice={handleNotice} />}
      </div>
      <Footer />
    </>
  );
}

export default MyPage;
