const { track, user } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const { genre } = req.params;
    if (!genre) {
      res.status(400).json({ message: 'input values' });
    }

    const findTrack = await track.findAll({
      where: { genre: genre },
      attributes: ['id', 'img', 'title'],
      include: [{
        model: user,
        required: true,
        attributes: ['nickName']
      }]
    });
    // res.redirect(`/searchtrack/${genre}`)
    res.status(200).json({ track: findTrack });
  }
};
