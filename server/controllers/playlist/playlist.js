const { playlist, track, user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {

  post: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    const { trackId } = req.body;

    if (!trackId) {
      res.status(400).json({ message: 'input values' });
    }

    if (!accessTokenData) {
      res.status(401).json({ message: 'unauthorized' });
    }

    await playlist.create({
      trackId: trackId,
      userId: accessTokenData.id
    });

    res.status(201).json({ message: 'ok' });
  },

  delete: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'no playlistId' });
    }

    if (!accessTokenData) {
      res.status(401).json({ message: 'unauthorized' });
    }

    const findPlaylist = await playlist.findOne({
      where: {
        id: id
      }
    });
    
    if (!findPlaylist) {
      res.status(404).json({ message: 'not found' });
    } else {
      if (findPlaylist.dataValues.userId !== accessTokenData.id) {
        res.status(401).json({ message: 'unauthorized' });
      } else {
        await playlist.destroy({
          where: { id: id }
        });
        res.status(200).json({ message: 'ok' });
      }
    }
  },

  get: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(401).json({ message: 'unauthorized' });
    }

    const findPlaylist = await playlist.findAll({
      where: { userId: accessTokenData.id },
      attributes: ['id'],
      include: {
        model: track,
        required: true,
        attributes: ['id', 'title', 'img', 'genre', 'releaseAt', 'soundTrack'],
        include: {
          model: user,
          require: true,
          attributes: ['nickName']
        }
      }
    });

    res.status(200).json({ playlist: findPlaylist });
  }
};
