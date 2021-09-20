const { hashtag, post  } = require("../../models")
const db = require("../../models");

module.exports = async (req, res) => {  
   //req.query -> hashtag
   
   //hashtag 조회해서 아이디값 받아서
   //다대다 테이블조회해서 postId 배열 받아온후 
   //track에 대한 정보 다 받아와서 배열로 보내주기

    res.status(200).json({message:"ok"});
 }
     