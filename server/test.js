const { fuzzy } = require("fast-fuzzy");
const Hangul = require('hangul-js');

console.log(fuzzy(String(Hangul.disassemble('슬픔')).split(',').join(""),
String(Hangul.disassemble('슬픈')).split(',').join("")));
// console.log(fuzzy(String(Hangul.disassemble('슬픔')).split(',').join(""),String(Hangul.disassemble('슬픈').split(',').join(""))))
console.log(fuzzy("이윤근","이성근"))
console.log(fuzzy("슬픈","슬픔"))
