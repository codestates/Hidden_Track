const { user } = require("../../models")

module.exports = async (req, res) => {
  
  //req.query -> loginId나 nickname 
 const {loginid, nickname} = req.headers;
  
 console.log(loginid,nickname)
 if(!loginid && !nickname ){
  res.status(400).json( { message: "input loginId or nickname" } )
 }

 if(!nickname){
   //loginId 중복검사 
   const findUserInfo = await user.findOne({
    where: { loginId: loginid },
  })
  
  if(findUserInfo){
      res.status(409).json( { message: "already exists" } );
  }else{
      res.status(200).json( { message: "ok" } );
  }
 }else{
   //nickname 중복검사  
    const findUserInfo = await user.findOne({
        where: { nickName: nickname },
      })
    
    if(findUserInfo){
        res.status(409).json( { message: "already exists" } );
    }else{
        res.status(200).json( { message: "ok" } );
    }
 }
}
    