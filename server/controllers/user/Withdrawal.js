const { reply, userArtist, user, grade, playlist, track, hashtag } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const db = require('../../models');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req);
  const likes = db.sequelize.models.likes;
  const tagtracks = db.sequelize.models.tagtracks;

  if (!accessTokenData) {
    res.status(401).json({ message: 'unauthorized' });
  }

  await userArtist.destroy({
    where: { userId: accessTokenData.id }
  });

  await reply.destroy({
    where: { userId: accessTokenData.id }
  });

  await grade.destroy({
    where: { userId: accessTokenData.id }
  });
  await likes.destroy({
    where: { userId: accessTokenData.id }
  });
  await playlist.destroy({
    where: { userId: accessTokenData.id }
  });

  const findTrack = await track.findAll({
    where: { userId: accessTokenData.id },
    include: {
      model: hashtag,
      attributes: ['id', 'tag']
    }
  });

  for (let index = 0; index < findTrack.length; index++) {
    await tagtracks.destroy({
      where: { trackId: findTrack[index].id }
    });

    for (let i = 0; i < findTrack[index].hashtags.length; i++) {
      const { count, rows } = await tagtracks.findAndCountAll({
        where: { hashtagId: findTrack[index].hashtags[i].id }
      });
      if (count === 0) {
        await hashtag.destroy({
          where: { id: findTrack[index].hashtags[i].id }
        });
      }
    }

    await reply.destroy({
      where: { trackId: findTrack[index].id }
    });
  }

  await track.destroy({
    where: { userId: accessTokenData.id }
  });

  await user.destroy({
    where: { id: accessTokenData.id }
  });

  res.status(200).json({ message: 'ok' });
};
