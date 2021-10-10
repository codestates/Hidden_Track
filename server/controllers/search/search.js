const { track, hashtag, user } = require('../../models');
const { fuzzy } = require('fast-fuzzy');
const Hangul = require('hangul-js');

module.exports = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.status(400).json({ message: 'input values' });
  }

  const findTrack = await track.findAll({
    attributes: ['id', 'title', 'img'],
    include: {
      model: user,
      required: true,
      attributes: ['nickName']
    }
  });

  const searchNickName = findTrack.filter((el) => {
    if (el.user.nickName.length < query.length) {
      return fuzzy(
        String(Hangul.disassemble(el.user.nickName)).split(',').join(''),
        String(Hangul.disassemble(query)).split(',').join('')
      ) >= 0.9;
    } else {
      return fuzzy(
        String(Hangul.disassemble(query)).split(',').join(''),
        String(Hangul.disassemble(el.user.nickName)).split(',').join('')
      ) >= 0.9;
    }
  });

  searchNickName.sort((a, b) => {
    return fuzzy(
      String(Hangul.disassemble(b.user.nickName)).split(',').join(''),
      String(Hangul.disassemble(query)).split(',').join('')
    ) -
         fuzzy(
           String(Hangul.disassemble(a.user.nickName)).split(',').join(''),
           String(Hangul.disassemble(query)).split(',').join('')
         );
  });

  const searchTitle = findTrack.filter((el) => {
    if (el.title.length < query.length) {
      return fuzzy(
        String(Hangul.disassemble(el.title)).split(',').join(''),
        String(Hangul.disassemble(query)).split(',').join('')) >= 0.8;
    } else {
      return fuzzy(
        String(Hangul.disassemble(query)).split(',').join(''),
        String(Hangul.disassemble(el.title)).split(',').join('')) >= 0.8;
    }
  });

  searchNickName.sort((a, b) => {
    return fuzzy(
      String(Hangul.disassemble(b.title)).split(',').join(''),
      String(Hangul.disassemble(query)).split(',').join('')) -
         fuzzy(
           String(Hangul.disassemble(a.title)).split(',').join(''),
           String(Hangul.disassemble(query)).split(',').join(''));
  });

  const findHashTag = await hashtag.findAll({
    attributes: ['tag']
  });

  const searchHashTag = findHashTag.filter((el) => {
    if (el.tag.length < query.length) {
      return fuzzy(
        String(Hangul.disassemble(el.tag)).split(',').join(''),
        String(Hangul.disassemble(query)).split(',').join('')
      ) >= 0.8;
    } else {
      return fuzzy(
        String(Hangul.disassemble(query)).split(',').join(''),
        String(Hangul.disassemble(el.tag)).split(',').join('')
      ) >= 0.8;
    }
  });

  res.status(200).json({ nickName: searchNickName, title: searchTitle, hashTag: searchHashTag });
};
