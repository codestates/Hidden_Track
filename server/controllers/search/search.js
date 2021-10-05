const { track , hashtag, user } = require("../../models");
const { fuzzy } = require("fast-fuzzy");

module.exports = async (req,res) => {  
   
   const { query } = req.query;

   if(!query){
      res.status(400).json({message:"input values"});
   }

   const findTrack = await track.findAll({
      attributes : ["id","title","img"],
       include:{
         model : user,
         required : true,
         attributes: ["nickName"]
       }
   })

   const searchNickName  = findTrack.filter((el)=>{
      if(el.user.nickName.length<query.length){
      return fuzzy(el.user.nickName,query) >= 0.8
      }else{
      return fuzzy(query,el.user.nickName) >= 0.8
      }
   })
   
   searchNickName.sort((a,b)=>{
      return fuzzy(b.user.nickName,query)-fuzzy(a.user.nickName,query)
   })
   
   const searchTitle =findTrack.filter((el)=>{
      if(el.title.length <query.length){
      return fuzzy(el.title,query)>=0.8
      }else{
         return fuzzy(query,el.title)>=0.8
      }
   })

   searchNickName.sort((a,b)=>{
      return fuzzy(b.title,query)-fuzzy(a.title,query)
   })

   const findHashTag = await hashtag.findAll({
      attributes:["tag"]
   })

   const searchHashTag = findHashTag.filter((el)=>{
      if(el.tag.length < query.length){
      return fuzzy(el.tag,query)>=2/3;
      }else{
         return fuzzy(query,el.tag) >=2/3;
      }
   })
    
   res.status(200).json({nickName: searchNickName,title:searchTitle,hashTag:searchHashTag})
}
     