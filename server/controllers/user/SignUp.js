const { user, userArtist } = require('../../models');

module.exports = async (req, res) => {
// req.body -> loginId, password,nickname,profile,admin,(agency,debut,email)
  const { loginId, password, nickName, profile, admin, agency, debut, email } = req.body;

  if (!loginId || !password || !nickName || !profile || !admin) {
    res.status(400).json({ message: 'input values' });
  }

  if (admin === 'artist') {
    if (!agency || !debut || !email) {
      res.status(400).json({ message: 'input values' });
    }
  }

  const [userInfo, created] = await user.findOrCreate({
    where: { loginId: loginId },
    defaults: {
      loginId: loginId,
      password: password,
      nickName: nickName,
      profile: profile,
      admin: admin
    }
  });

  if (!created) {
    res.status(409).json({ message: 'already registered user' });
  } else {
    if (userInfo.dataValues.admin === 'artist') {
      await userArtist.create({
        userId: userInfo.dataValues.id,
        agency: agency,
        debut: debut,
        email: email
      });
    }
    res.status(201).json({ message: 'created' });
  }
};
