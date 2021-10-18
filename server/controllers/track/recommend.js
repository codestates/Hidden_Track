const { playlist, track, user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req);
  const recommendchart = [];

  if (accessTokenData) {
    const findPlaylist = await playlist.findAll({
      attributes: ['trackId', 'userId'],
      where: { userId: accessTokenData.id }
    });
    const users = {};
    const recommendUser = [];
    for (let i = 0; i < findPlaylist.length; i++) {
      const temp = await playlist.findAll({
        where: { trackId: findPlaylist[i].trackId }
      });

      const charts = [];
      for (let j = 0; j < temp.length; j++) {
        if (temp[j].userId !== accessTokenData.id) { charts.push(temp[j].userId); }
      }
      recommendUser.push(charts);
    }
    for (let i = 0; i < recommendUser.length; i++) {
      recommendUser[i] = Array.from(new Set(recommendUser[i]));
      for (let j = 0; j < recommendUser[i].length; j++) {
        if (users[recommendUser[i][j]]) {
          users[recommendUser[i][j]]++;
        } else {
          users[recommendUser[i][j]] = 1;
        }
      }
    }
    let index = 0;
    while (index < findPlaylist.length) {
      const max = { id: 0, count: 0 };
      for (const key in users) {
        if (max.count < users[key]) {
          max.id = key;
          max.count = users[key];
        }
      }

      const similarity = await playlist.findAll({
        attributes: ['userId', 'trackId'],
        where: { userId: max.id }
      });
      if (similarity.length - max.count !== 0) {
        for (let i = 0; i < similarity.length; i++) {
          for (let j = 0; j < findPlaylist.length; j++) {
            if (similarity[i].trackId === findPlaylist[j].trackId) {
              break;
            }
            if (j === findPlaylist.length - 1) {
              const findTrack = await track.findOne({
                where: { id: similarity[i].trackId },
                attributes: ['id', 'img', 'title', 'views'],
                include: {
                  model: user,
                  required: true,
                  attributes: ['nickName']
                }
              });
              if(recommendchart.length ===5){
                break;
              }else{
                recommendchart.push(findTrack);
              }
            }
          }
        }
        break;
      } else {
        users[max.id] = 0;
        index++;
      }
    }

    if (recommendchart.length !== 5) {
      const length = recommendchart.length
      const chart = await track.findAll({
        attributes: ['id', 'img', 'title', 'views'],
        include: {
          model: user,
          required: true,
          attributes: ['nickName']
        }
      });
      chart.sort(function (a, b) {
        return b.views - a.views;
      });

      for (let i = 0; i < 5 - length; i++) {
        recommendchart.push(chart[i]);
      }
    }
  } else {
    const chart = await track.findAll({
      attributes: ['id', 'img', 'title', 'views'],
      include: {
        model: user,
        required: true,
        attributes: ['nickName']
      }
    });
    chart.sort(function (a, b) {
      return a.views - b.views;
    });

    for (let i = chart.length - 1; i >= chart.length - 5; i--) {
      recommendchart.push(chart[i]);
    }
  }

  res.status(200).json({ recommend: recommendchart });
};
