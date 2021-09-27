const { track , hashtag, user } = require("../../models")

module.exports =  {  
   
    get: async (req, res) =>{ 
     const { tag } =req.params;
     
     if(!tag){
         res.status(400).json({message: "input values"});
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
     