const { user } = require("../../models");
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} = require('../tokenFunctions');

module.exports = async (req, res) => {
  
  //req.body -> loginId,password
  const {loginId,password} = req.body;
  
  //값이 덜들어왔을 때
  if(!loginId || !password) {
    res.status(400).json({message:"input values"})
  } 

  // 아이디와 패스워드가 맞는것 찾기
  const findUserInfo = await user.findOne({
    where: { loginId: loginId, password: password },
  })
  
  //없으면 인증오류
  if(!findUserInfo){
   res.status(401).json({ message: "not authorized" })
  }
  
  //쿠키 만들때 password와 refreshtoken 없애기
  let userInfo = findUserInfo.dataValues;
    delete userInfo.password;
    delete userInfo.RT

    //refreshToken,accessToken 만들고 유저DB에 RT값 추가
    const accessToken = generateAccessToken(userInfo);
    const refreshToken = generateRefreshToken(userInfo);
    
    // user 테이블에 RT값 저장하기
    await user.update({RT: refreshToken},{
      where: { loginId: loginId, password: password }
    })
       
   //refreshToken은 쿠키로 accesstoken은 body로.
    sendRefreshToken(res, refreshToken);
    res.status(200).json({ data : accessToken })
  }
  