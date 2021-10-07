const {  hashtag } = require("../../models");
const { fuzzy } = require("fast-fuzzy");
const db = require("../../models");
const Hangul = require('hangul-js');

module.exports = async (req,res) => {  
   
   const tagtracks = db.sequelize.models.tagtracks;
   let findHashTag = await hashtag.findAll({
       attributes : ["id","tag"]
   })
    
  const findTagTrack = await tagtracks.findAll({
      attributes : ["hashtagId","trackId"]
  })

  let tagCount ={};
   for(let i =0;i<findTagTrack.length;i++){
     if(tagCount[findTagTrack[i].hashtagId]){
         tagCount[findTagTrack[i].hashtagId]++;
     }else{
         tagCount[findTagTrack[i].hashtagId] = 1;
     }
   }

   let hashTag = [];
   for(let i=0; i<findHashTag.length;i++){
    if(findHashTag[i].tag !== ""){
      hashTag.push(findHashTag[i]);
      for(let j=i+1;j<findHashTag.length;j++){
         if(findHashTag[i].tag.length <= findHashTag[j].tag.length){
            if( fuzzy (
                String(Hangul.disassemble(findHashTag[i].tag)).split(',').join(""),
                String(Hangul.disassemble(findHashTag[j].tag)).split(',').join("")
            ) >= 0.8 ){
             tagCount[findHashTag[i].id] = tagCount[findHashTag[i].id] + tagCount[findHashTag[j].id]
             tagCount[findHashTag[j].id] = 0; 
             findHashTag[j].tag ="";
           }
         }else{
            if( fuzzy (
                String(Hangul.disassemble(findHashTag[j].tag)).split(',').join(""),
                String(Hangul.disassemble(findHashTag[i].tag)).split(',').join("")
            ) >= 0.8 ){
                tagCount[findHashTag[i].id] = tagCount[findHashTag[i].id] + tagCount[findHashTag[j].id]
                tagCount[findHashTag[j].id] = 0;
                findHashTag[j].tag ="";
              }
          }
       }
      }
   }
   
//    인기있는 걸로 20개로 짜르기
 let finalHashTag = []; 
 for(let i =0;i<20;i++){
      let max={"id": 0,"count": 0 };
    for(let key in tagCount){
       if(max.count <= tagCount[key]){
           max.id = key;
           max.count = tagCount[key]
       }
    }
    const temp = await hashtag.findOne({
        where : {id: max.id},
        attributes : ["tag"]
    })
    if(max.count !== 0 ){
   finalHashTag.push(temp.tag);
   tagCount[max.id] = 0;
    }
  }   
   
   res.status(200).json({hashTag:finalHashTag})
}
     