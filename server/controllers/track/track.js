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
        const findHashTag =  await hashtag.create({
           tag: tag[i],
        })

        await tagposts.create({
            postId:findPost.dataValues.id,
            hashtagId : findHashTag.dataValues.id
        })
    }
    
     res.status(201).json( {postId: findPost.dataValues.id } );
    }
 }
