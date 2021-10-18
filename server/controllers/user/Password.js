const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // req.headers accesstoken //req.body : currentPassword,password
  const accessTokenData = isAuthorized(req);
  const { currentPassword, password } = req.body;

  if (!password || !currentPassword) {
    res.status(400).json({ message: 'input values' });
  }
  // accesstoken 있는지 확인
  if (!accessTokenData) {
    res.status(401).json({ message: 'unauthorized' });
  }
  const findUserInfo = await user.findOne({
    where: { loginId: accessTokenData.loginId, password: currentPassword }
  });

  if (!findUserInfo) {
    res.status(401).json({ message: 'wrong password' });
  } else {
    await user.update({ password: password }, {
      where: { id: accessTokenData.id }
    });
    res.status(200).json({ message: 'ok' });
  }
};
