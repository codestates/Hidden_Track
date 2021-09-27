const { user } = require("../../models")

module.exports = async (req, res) => {
    const { nickname } = req.params;
     
    if(!nickname ){
     res.status(400).json( { message: "input nickname" } )
    }
    const findUserInfo = await user.findOne({
        where: { nickName: nickname },
         })

   if(findUserInfo){
    res.status(409).json( { message: "already exists" } );
   }else{
    res.status(200).json( { message: "ok" } ); 
   }
}