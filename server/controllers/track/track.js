const { track,post,hashtag } = require("../../models")
const db = require("../../models");
const { isAuthorized } = require('../tokenFunctions');

module.exports = {  
    post: async (req,res) =>{ 

     //req.header -> accesstoken, req.body ->tag(array),title,img,genre,releaseAt,soundtrack,lyric
     const accessTokenData = isAuthorized(req);
     const { tag ,title,img,genre,releaseAt,soundtrack,lyric } = req.body;
     const tagposts = db.sequelize.models.tagposts;

    if(!title || !img || !genre || !releaseAt || !soundtrack  ) {
      res.status(400).json({message: "input values"})
    }
    if (!accessTokenData) {
       res.status(401).json({ message : "unauthorized"});
    }
    
     const findPost = await post.create({
      userId:accessTokenData.id,
      views: 0,
    });

    await track.create({
      title : title,
      img : img,
      genre : genre,
      releaseAt : releaseAt,
      soundtrack : soundtrack,
      userId : accessTokenData.id,
      postId : findPost.dataValues.id,
      lyric: lyric
    });

    for(let i =0;i<tag.length;i++){
       const [findHashTag,created] =  await hashtag.findOrCreate({
           where : { tag : tag[i] },
           default : { tag : tag[i] }
        })
        
        await tagposts.create({
            postId:findPost.dataValues.id,
            hashtagId : findHashTag.dataValues.id
        })
    }
    
     res.status(201).json( {postId: findPost.dataValues.id } );
    },

   patch :  async (req,res) =>{ 
    const accessTokenData = isAuthorized(req);
    const { id, tag ,title,img,genre,releaseAt,soundTrack,lyric,postId } = req.body;
    const tagposts = db.sequelize.models.tagposts;

    if(!id || !postId ||!title || !img || !genre || !releaseAt || !soundTrack ) {
     res.status(400).json({message: "input values"})
    }
    
    if (!accessTokenData) {
      res.status(401).json({ message : "unauthorized"});
    }
    
    await track.update({
      title : title,
      img :img,
      gerne : genre,
      releaseAt : releaseAt,
      soundTrack : soundTrack,
      lyric: lyric
    },{
    where : { id: id }
    })
    
    for(let i =0;i<tag.length;i++){
      const [findHashTag,created] =  await hashtag.findOrCreate({
          where : { tag : tag[i] },
          default : { tag : tag[i] }
       })
       
    await tagposts.create({
           postId: postId,
           hashtagId : findHashTag.dataValues.id
       })
   }
    res.status(200).json( {postId: postId } );
   },
   delete :  async (req,res) =>{ 
    
    res.status(200).json({message:"ok"});
   }
 }
