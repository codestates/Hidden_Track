const { isAuthorized } = require('../tokenFunctions');
const db = require("../../models");

module.exports = async (req, res) => {  
   
   //req.headers -> accesstoken  req.body ->postId
   const accessTokenData = isAuthorized(req);
   const { trackId } = req.body;
   
   if(!trackId){
       res.status(400).json( {message: "input values" } )
   }
   
   if (!accessTokenData) {
    res.status(401).json({ message : "unauthorized"});
   }
   
   const likes = db.sequelize.models.likes;

   const [gradeInfo, created] = await likes.findOrCreate({
    where: { 
        trackId: trackId,
        userId: accessTokenData.id
     },
    defaults: {
        trackId: trackId,
        userId: accessTokenData.id
    },
   });

   if(!created){
   await likes.destroy({
       where: {trackId: trackId, userId:accessTokenData.id }
   })
   const {count, rows } = await likes.findAndCountAll({
       where: { trackId : trackId}
   })
    res.status(200).json( { likecount:count } );
   }else{
    const {count, rows } = await likes.findAndCountAll({
        where: { trackId : trackId}
    })
    res.status(200).json( { likecount:count } );
   }
}
     