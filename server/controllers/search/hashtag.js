const { hashtag } = require('../../models');
const { fuzzyString } = require('../../modules/fuzzy');
const db = require('../../models');


module.exports = async (req, res) => {
  const tagtracks = db.sequelize.models.tagtracks;
  const findHashTag = await hashtag.findAll({
    attributes: ['id', 'tag']
  });

  const findTagTrack = await tagtracks.findAll({
    attributes: ['hashtagId', 'trackId']
  });

  const tagCount = {};
  for (let i = 0; i < findTagTrack.length; i++) {
    if (tagCount[findTagTrack[i].hashtagId]) {
      tagCount[findTagTrack[i].hashtagId]++;
    } else {
      tagCount[findTagTrack[i].hashtagId] = 1;
    }
  }

  const hashTag = [];
  for (let i = 0; i < findHashTag.length; i++) {
    if (findHashTag[i].tag !== '') {
      hashTag.push(findHashTag[i]);
      for (let j = i + 1; j < findHashTag.length; j++) {
        if (findHashTag[i].tag.length <= findHashTag[j].tag.length) {
          if (fuzzyString(findHashTag[i].tag,findHashTag[j].tag)>=0.8) {
            tagCount[findHashTag[i].id] = tagCount[findHashTag[i].id] + tagCount[findHashTag[j].id];
            tagCount[findHashTag[j].id] = 0;
            findHashTag[j].tag = '';
          }
        } else {
          if (fuzzyString(findHashTag[j].tag,findHashTag[i].tag)>=0.8) {
            tagCount[findHashTag[i].id] = tagCount[findHashTag[i].id] + tagCount[findHashTag[j].id];
            tagCount[findHashTag[j].id] = 0;
            findHashTag[j].tag = '';
          }
        }
      }
    }
  }

  //    인기있는 걸로 20개로 짜르기
  const finalHashTag = [];
  for (let i = 0; i < 20; i++) {
    const max = { id: 0, count: 0 };
    for (const key in tagCount) {
      if (max.count <= tagCount[key]) {
        max.id = key;
        max.count = tagCount[key];
      }
    }
    const temp = await hashtag.findOne({
      where: { id: max.id },
      attributes: ['tag']
    });
    if (max.count !== 0) {
      finalHashTag.push(temp.tag);
      tagCount[max.id] = 0;
    }
  }

  res.status(200).json({ hashTag: finalHashTag });
};
