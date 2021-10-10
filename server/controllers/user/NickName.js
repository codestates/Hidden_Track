const { user } = require('../../models');
const {
  isAuthorized,
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken
} = require('../tokenFunctions');

module.exports = async (req, res) => {
  // req.headers ->accesstoken  req.body.nickname
  const accessTokenData = isAuthorized(req);
  const { nickName } = req.body;

  if (!nickName) {
    res.status(400).json({ message: 'input values' });
  }

  if (!accessTokenData) {
    res.status(401).json({ message: 'unauthorized' });
  }

  const findUserInfo = await user.findOne({
    where: { nickName: nickName }
  });

  if (findUserInfo) {
    res.status(409).json({ message: 'alreay exist nickname' });
  } else {
    await user.update({ nickName: nickName }, {
      where: { id: accessTokenData.id }
    });

    const temp = await user.findOne({
      where: { id: accessTokenData.id }
    });
    const updateUserInfo = temp.dataValues;
    delete updateUserInfo.password;
    delete updateUserInfo.RT;

    const accessToken = generateAccessToken(updateUserInfo);
    const refreshToken = generateRefreshToken(updateUserInfo);

    // user 테이블에 RT값 저장하기
    await user.update({ RT: refreshToken }, {
      where: { id: updateUserInfo.id }
    });

    // refreshToken은 쿠키로 accesstoken은 body로.
    sendRefreshToken(res, refreshToken);
    res.status(200).json({ data: accessToken });
  }
};
