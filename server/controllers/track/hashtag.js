const { track , hashtag, user } = require("../../models")

module.exports =  {  
   
    redirect: async (req, res) =>{ 
     const { tag } =req.params;
     
     if(!tag){
         res.status(404).json({message: "not found"});
     }

     const findHashtag = await hashtag.findAll({
         where :{ tag :tag },
         include: [{
            model : track,
            required : true,
            attributes: ["id","img","title"],
            include :[{
              model :user,
              required : true,
              attributes : ["nickName"]
            }]
         }]
     })
     
     res.status(200).json({track: findHashtag[0].tracks})
    }
}
     