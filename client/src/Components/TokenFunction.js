import axios from 'axios';

// 인자로 받은 액세스 토큰으로 유저정보 요청하는 함수
export async function accessTokenRequest (accessToken) {
  const userInfo = await axios.get(`${process.env.REACT_APP_API_URL}/user/userinfo`,
    { headers: { accesstoken: accessToken } })
    console.log(userInfo);
  //   .then(res => {
  //     console.log('액세스 토큰 요청 응답', res.data);
  //     if (res.status !== 200) {
  //       return res.data.data;
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // return userInfo;
  // if(!userInfo)
}

// 액세스 토큰이 만료되거나, 상태가 초기화 됐을 때 리프레시 토큰으로 액세스 토큰 다시 받아오는 함수
export async function refreshTokenRequest () {
  const token = await axios.get(`${process.env.REACT_APP_API_URL}/user/token`, {
    withCredentials: true
  })
    .then(res => {
      console.log('리프레시 토큰 요청 응답', res.data);
      if (res.status === 200) {
        return res.data.data;
      }
    })
    .catch(err => {
      console.log(err.response);
    });

  return token;
}
