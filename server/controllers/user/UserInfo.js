const { user } = require("../../models")
const { verify } = require("jsonwebtoken")

module.exports = async (req, res) => {
  
   //req.headers accesstoken
   accessToken = req.headers["accesstoken"]
   
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
  //유저정보 주기
   return res.status(200).json({ data: { userInfo: userInfo }, message: "ok" })
}
    