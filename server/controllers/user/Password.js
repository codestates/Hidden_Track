const { user } = require("../../models")
const { verify } = require("jsonwebtoken")

module.exports = async (req, res) => {
  //req.headers accesstoken //req.body : currentPassword,password
  accessToken = req.headers["accesstoken"]
  const { currentPassword, password } =req.body;
 
  if(!currentPassword || !password) {
    res.status(400).json({message:"input values"});
  }

  //accesstoken 있는지 확인
  if(!accessToken){
    res.status(400).json({message:"no token"})
 }
 //만료되었는지 확인 또는 유효한 토큰인지 확인
 let userInfo ;
 try {
  userInfo = verify(accessToken, process.env.ACCESS_SECRET)
} catch {
  res.status(401).json({message: "unauthorized" })
}

//password 맞는지 확인
const findUserInfo = await user.findOne({
    where: { loginId: userInfo.loginId, password:currentPassword },
  })
  
  //아니면 권한x 맞으면 password 바꿔줌
  if(!findUserInfo){
   res.status(401).json({message : "wrong password"})
  }else{
   await user.update({password:password},{
       where: {loginId: userInfo.loginId }
   })
   res.status(200).json({message:"ok"});
  }
 }
     