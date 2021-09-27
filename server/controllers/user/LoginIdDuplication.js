const { user } = require("../../models")

module.exports = async (req, res) => {
  
  //req.params -> loginId나 nickname 
     const { loginid } = req.params;
  
    if(!loginid ){
      res.status(400).json( { message: "input loginId " } )
     }

   //loginId 중복검사 
   const findUserInfo = await user.findOne({
    where: { loginId: loginid },
     })
  
  if(findUserInfo){
      res.status(409).json( { message: "already exists" } );
  }else{
      res.status(200).json( { message: "ok" } );
  }
}

    