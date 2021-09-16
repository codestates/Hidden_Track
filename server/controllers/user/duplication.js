const { user } = require("../../models")

module.exports = async (req, res) => {
  
  //req.query -> loginId나 nickname 
 const {loginId, nickName} = req.query;

 if(!loginId && !nickName ){
  res.status(400).json( { message: "input loginId or nickname" } )
 }

 if(!nickName){
   //loginId 중복검사 
   const findUserInfo = await user.findOne({
    where: { loginId: loginId },
  })
  
  if(findUserInfo){
      res.status(409).json( { message: "already exists" } );
  }else{
      res.status(200).json( { message: "ok" } );
  }
 }else{
   //nickname 중복검사  
    const findUserInfo = await user.findOne({
        where: { nickName: nickName },
      })
    
    if(findUserInfo){
        res.status(409).json( { message: "already exists" } );
    }else{
        res.status(200).json( { message: "ok" } );
    }
 }
}
    