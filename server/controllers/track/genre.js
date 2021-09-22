const { track , user } = require("../../models")

module.exports =  {  
    redirect: async (req, res) =>{ 
        const { genre } =req.params;
        if(!genre){
            res.status(404).json({message: "not found"});
        }
        
        const findTrack = await track.findAll({
            where :{ genre :genre },
            attributes : ["id","img","title"],
            include :[{
                 model :user,
                 required : true,
                 attributes : ["nickName"]
               }]
        })

        res.status(200).json({track: findTrack})
    }
}
     