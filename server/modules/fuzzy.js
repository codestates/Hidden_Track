const Hangul = require('hangul-js');
const { fuzzy } = require('fast-fuzzy');

exports.fuzzyString = (string1,string2) =>{
    return fuzzy(
        String(Hangul.disassemble(string1)).split(',').join(''),
        String(Hangul.disassemble(string2)).split(',').join('')
      ) 
}

