const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // req.headers accesstoken
  const accessTokenData = isAuthorized(req);
  if (!accessTokenData) {
    res.status(401).json({ message: 'unauthorized' });
  }
  // 만료되었는지 확인 또는 유효한 토큰인지 확인

  // 유저정보 주기
  return res.status(200).json({ data: accessTokenData });
};
