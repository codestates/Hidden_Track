const { user } = require("../../models")
const { isAuthorized } = require('../tokenFunctions');

module.exports =  {
  //req.headers accesstoken //req.body : currentPassword,password
  patch : async (req, res) =>{ 
  const accessTokenData = isAuthorized(req);
  const { password } =req.body;
 
  if(!password) {
    res.status(400).json({message:"input values"});
  }
  //accesstoken 있는지 확인
  if (!accessTokenData) {
    res.status(401).json({ message : "unauthorized"});
  }
 //만료되었는지 확인 또는 유효한 토큰인지 확인

   await user.update({password:password},{
       where: {loginId: accessTokenData.loginId }
   })
   res.status(200).json({message:"ok"});
 
 
  }
}