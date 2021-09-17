const { isAuthorized } = require('../tokenFunctions');
const db = require("../../models");

module.exports = async (req, res) => {  
   
   //req.headers -> accesstoken  req.body ->postId
   const accessTokenData = isAuthorized(req);
   const { postId } = req.body;
   
   if(!postId){
       res.status(400).json( {message: "input values" } )
   }
   
   if (!accessTokenData) {
    res.status(401).json({ message : "unauthorized"});
   }
   
   const likes = db.sequelize.models.likes;

   const [gradeInfo, created] = await likes.findOrCreate({
    where: { 
        postId: postId,
        userId: accessTokenData.id
     },
    defaults: {
        postId: postId,
        userId: accessTokenData.id
    },
   });

   if(!created){
   await likes.destroy({
       where: {postId: postId,userId:accessTokenData.id }
   })
   const {count, rows } = await likes.findAndCountAll({
       where: { postId : postId}
   })
    res.status(200).json( { data:count, message:"ok" } );
   }else{
    const {count, rows } = await likes.findAndCountAll({
        where: { postId : postId}
    })
    res.status(200).json( { data:count, message: "ok" } );
   }
}
     