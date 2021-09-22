const { track,hashtag,user,reply } = require("../../models")
const db = require("../../models");
const { isAuthorized } = require('../tokenFunctions');

module.exports = {  
   redirect: async (req,res) => {
     const { trackId } = req.params;
     const likes = db.sequelize.models.likes;
  
     const allViews = await track.findOne({
       where : { id : trackId }
     })

     await track.update({views:allViews.dataValues.views+1 },{
      where : {id : trackId}
     })

     const findTrack = await track.findAll({
       where: { id : trackId },
       attributes : ["id","title","img","genre","releaseAt","soundTrack","lyric"],
       include:[{
         model : user,
         required : true,
         attributes: ["nickName"]
       },
       {
        model : reply,
        required : true,
        attributes : ["content"],
        include: {
          model : user,
          required : true,
          attributes : ["nickname","profile"]
          }
        },
        {
          model: hashtag,
          required : true,
          attributes : ["tag"]
        }]
     })
    
     const {count, rows } = await likes.findAndCountAll({
      where: { trackId : trackId }
     })

     res.status(200).json({track:findTrack, like: count });
   },

    post: async (req,res) =>{ 
     //req.header -> accesstoken, req.body ->tag(array),title,img,genre,releaseAt,soundtrack,lyric
     const accessTokenData = isAuthorized(req);
     const { tag ,title,img,genre,releaseAt,soundTrack,lyric } = req.body;
     const tagtracks = db.sequelize.models.tagtracks;

    if(!title || !img || !genre || !releaseAt || !soundTrack  ) {
      res.status(400).json({message: "input values"})
    }
    if (!accessTokenData) {
       res.status(401).json({ message : "unauthorized"});
    }
    
    const createTrack = await track.create({
      title : title,
      img : img,
      genre : genre,
      releaseAt : releaseAt,
      soundTrack : soundTrack,
      userId : accessTokenData.id,
      lyric: lyric,
      views : 0
    });

    for(let i =0;i<tag.length;i++){
       const [findHashTag,created] =  await hashtag.findOrCreate({
           where : { tag : tag[i] },
           default : { tag : tag[i] }
        })
        
        await tagtracks.create({
            trackId : createTrack.dataValues.id,
            hashtagId : findHashTag.dataValues.id
        })
    }
    
     res.status(201).json( {trackId: createTrack.id } );
    },

   patch :  async (req,res) =>{ 
    const accessTokenData = isAuthorized(req);
    const { id, tag ,title,img,genre,releaseAt,soundTrack,lyric } = req.body;
    const tagtracks = db.sequelize.models.tagtracks;

    if(!id  ||!title || !img || !genre || !releaseAt || !soundTrack ) {
     res.status(400).json({message: "input values"})
    }
    
    if (!accessTokenData) {
      res.status(401).json({ message : "unauthorized"});
    }
    
    await track.update({
      title : title,
      img : img,
      genre : genre,
      releaseAt : releaseAt,
      soundTrack : soundTrack,
      userId : accessTokenData.id,
      lyric: lyric,
    },{
    where : { id: id }
    })
    
    for(let i =0;i<tag.length;i++){
      const [findHashTag,created] =  await hashtag.findOrCreate({
          where : { tag : tag[i] },
          default : { tag : tag[i] }
       })
       
    await tagtracks.findOrCreate({
      where :{
             trackId: id,
             hashtagId : findHashTag.dataValues.id
             },
       default :{
        trackId: id,
        hashtagId : findHashTag.dataValues.id
       }       
       }
      )
   }
    res.status(200).json( {trackId: id } );
   },
   delete :  async (req,res) =>{ 
    
   const { id } = req.body;

   await track.destroy({
    where: { id: id },
  });
  
  //관련된 tagtrack,hashtag,like,playlist,grade,reply 다 지우기 
    res.status(200).json({message:"ok"});
   }
 }
