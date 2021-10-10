const axios = require('axios');
const { user } = require('../../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken
} = require('../tokenFunctions');

module.exports = async (req, res) => {
  axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${req.body.authorizationCode}`,
    { headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' } }
  ).then(response1 => {
    axios.get(`https://kapi.kakao.com/v2/user/me?access_token=${response1.data.access_token}`,
      { headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' } }
    ).then(async response2 => {
      const [getUserInfo, created] = await user.findCreateFind({
        where: { loginId: response2.data.kakao_account.email },
        defaults: {
          loginId: response2.data.kakao_account.email,
          password: null,
          profile: response2.data.properties.profile_image,
          nickName: response2.data.properties.nickname,
          RT: null,
          admin: 'listener'
        }
      });

      const userInfo = getUserInfo.dataValues;
      delete userInfo.password;
      delete userInfo.RT;

      const accessToken = generateAccessToken(userInfo);
      const refreshToken = generateRefreshToken(userInfo);

      // user 테이블에 RT값 저장하기
      await user.update({ RT: refreshToken }, {
        where: { id: userInfo.id }
      });
      // refreshToken은 쿠키로 accesstoken은 body로.
      sendRefreshToken(res, refreshToken);
      res.status(200).json({ data: accessToken, message: 'ok' });
    }).catch(err)(
      res.status(401).json({ message: 'unauthorized' })
    );
  }).catch(err)(
    res.status(400).json({ message: 'bad requset' })
  );
};
