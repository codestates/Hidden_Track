const { reply } = require("../../models")
const { isAuthorized } = require('../tokenFunctions');

module.exports =  {  

   post: async (req, res) =>{
       const accessTokenData = isAuthorized(req);
       const { trackId, content } = req.body;
       
       if(!trackId || !content ) {
        res.status(400).json({message: "input values"})
       }

       if (!accessTokenData) {
        res.status(401).json({ message : "unauthorized"});
       }  

       await reply.create({
           userId : accessTokenData.id,
           trackId :trackId,
           content : content
       })

       res.status(201).json({message:"ok"});
   },

   patch: async (req, res) =>{
       const accessTokenData = isAuthorized(req);
       const { id, content } = req.body;
    
       if(!id || !content ) {
        res.status(400).json({message: "input values"})
       }

       if (!accessTokenData) {
        res.status(401).json({ message : "unauthorized"});
       }  
       
       const findReply = await reply.findOne({
           where : { id : id }
       })   
       
       if(!findReply){
           res.status(404).json({message:"not found"})
       }else{
       await reply.update({content : content},{
           where : { id: id }
       })
      res.status(200).json({message:"ok"});
    }
   },
   delete: async (req, res) =>{
    const accessTokenData = isAuthorized(req);
    const { id } = req.params;

    if(!id) {
     res.status(400).json({message: "input values"})
    }

    if (!accessTokenData) {
     res.status(401).json({ message : "unauthorized"});
    }  
    
    const findReply = await reply.findOne({
        where : { id : id }
    })  
    if(!findReply){
        res.status(404).json({ message : "not found" });
    }else{
    if(findReply.dataValues.userId !== accessTokenData.id){
        res.status(401).json({ message : "unauthorized"});
       }else{
        await reply.destroy({
            where: { id: id },
          });
        res.status(200).json({message:"ok"});
       }
     }
   }
}
     