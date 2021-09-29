const { playlist, track ,user } = require("../../models")
const { isAuthorized } = require('../tokenFunctions');


module.exports =  {  
   
    post: async (req, res) => {
        const accessTokenData = isAuthorized(req);
        const { trackId } = req.body;
        
        if(!trackId ) {
            res.status(400).json({message: "input values"})
          }

        if (!accessTokenData) {
            res.status(401).json({ message : "unauthorized"});
         }

        await playlist.create({
            trackId : trackId,
            userId : accessTokenData.id
        })
    
        res.status(201).json({message:"ok"});
    },
    
    delete: async (req, res) =>{
        const accessTokenData = isAuthorized(req);
        const { id } = req.body;
  
        if(!id ) {
            res.status(400).json({message: "no playlistId"})
          }

        if (!accessTokenData) {
            res.status(401).json({ message : "unauthorized"});
         }

        const findPlaylist = await playlist.findOne({
            where : {
                id : id              
            }
        })
        
        if(!findPlaylist){
            res.status(404).json({ message : "not found" });
        }else{
           if(findPlaylist.dataValues.userId !== accessTokenData.id){
            res.status(401).json({ message : "unauthorized"});
           }else{
            await playlist.destroy({
                where: { id: id },
              });
            res.status(200).json({message:"ok"});
           }
        }
    },

    get: async (req, res) =>{
        const accessTokenData = isAuthorized(req);
        if (!accessTokenData) {
            res.status(401).json({ message : "unauthorized"});
         }

        const findPlaylist = await playlist.findAll({
            where : { userId : accessTokenData.id}
        })

        let allPlaylist = [];

        for(let i =0; i<findPlaylist.length;i++){
            const findTrack = await track.findOne({
                where : { id : findPlaylist[i].dataValues.trackId },
                include: {
                    model : user,
                    required : true,
                    attributes : ["nickName"]
                }
            })

            allPlaylist.push(findTrack.dataValues)
        }
        console.log(allPlaylist)
        res.status(200).json({playlist: allPlaylist , playlist: findPlaylist });
    }
 }
     