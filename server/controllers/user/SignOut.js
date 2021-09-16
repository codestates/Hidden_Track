const { user } = require("../../models")

module.exports = async (req, res) => {
  
  //req.cookies -> refreshtoken
  const refreshToken = req.cookies.refreshToken;
  //refreshtoken 들어왔는지 확인
  if(!refreshToken){
      res.status(400).json({message:"no token"});
  }
  //refreshtoken과 같은 유저 있는지 확인
  const findUserInfo = await user.findOne({
        where: { RT: refreshToken },
  })
  if(!findUserInfo){
      res.status(404).json({message: "not found"});
  }
  //그 유저 refreshtoken 저장한 것 지우기
  await user.update({RT:null},{
    where: { RT : refreshToken }
  })

  res.status(200).json({message:"ok"}) 
}
