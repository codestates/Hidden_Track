const { track, user } = require('../../models');

module.exports = async (req, res) => {
  const chart = await track.findAll({
    attributes: ['id', 'img', 'title', 'views'],
    include: {
      model: user,
      required: true,
      attributes: ['nickName']
    }
  });
  chart.sort(function (a, b) {
    return a.id - b.id;
  });

  const latestchart = [];
  for (let i = chart.length - 1; i >= chart.length - 10; i--) {
    latestchart.push(chart[i]);
  }

  chart.sort(function (a, b) {
    return a.views - b.views;
  });

  const popularchart = [];
  for (let i = chart.length - 1; i >= chart.length - 10; i--) {
    popularchart.push(chart[i]);
  }

  res.status(200).json({ latestchart: latestchart, popularchart: popularchart });
};
