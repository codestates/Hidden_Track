const { user } = require("../../models")
const { sign,verify } = require("jsonwebtoken")

module.exports = async (req, res) => {
 //req.cookie : refreshtoken    
 
 //refreshtoken 값저장후  만약에 안들어왔다라면 에러핸들링
 const refreshToken = req.cookies.refreshToken;
 if(!refreshToken){
   res.status(400).json({message:"no token"});
 }
  
 //원래 유저와 같은 refreshtoken 값이 맞는지 확인
 const findUserInfo = await user.findOne({
    where: { RT: refreshToken },
  })

  if(!findUserInfo){
      res.status(404).status({message:"not found"})
  }
 //refreshtoken 디코딩해서 만료됐는지 확인
  try{
   verify(refreshToken, process.env.REFRESH_SECRET);
  }catch{
  //만료됐으면 user에 있는 RT 지우기
   await user.update({RT:null},{
       where: { RT : refreshToken }
   })
   res.status(401).json({message:"unauthorized"})
  }
 
 //refreshtoken값 유저에서 찾기(refreshtoken 디코딩한걸 바로 
 //accesstoken만들수 있지만 혹시나 유저정보가 변경됐거나할수 있기때문에 db에서 가져온거 씀)
  const userInfo =findUserInfo.dataValues;
  delete userInfo.password;
  delete userInfo.RT;

 //accesstoken만든후 보내주기!
 const accessToken = sign(userInfo, process.env.ACCESS_SECRET, {
    expiresIn: "1h",
  })
  res.status(200).json({data:accessToken, message:"ok"})
}
    