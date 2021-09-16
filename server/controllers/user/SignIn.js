const { user } = require("../../models")
const { sign } = require("jsonwebtoken")


module.exports = async (req, res) => {
  
  //req.body -> loginId,password
  const {loginId,password} = req.body;
  
  //값이 덜들어왔을 때
  if(!loginId || !password) {
    res.status(400).json({message:"input loginId or password"})
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
    const accessToken = sign(userInfo, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
    })
    const refreshToken = sign(userInfo, process.env.REFRESH_SECRET, {
      expiresIn: "14d",
    })
    
    //user 테이블에 RT값 저장하기
    await user.update({RT: refreshToken},{
      where: { loginId: loginId, password:password }
    })
       
   //refreshToken은 쿠키로 accesstoken은 body로.
    await res.cookie("refreshToken", refreshToken, {
      HttpOnly: true,
      Secure: false, //배포 환경에서는 true로.
      SameSite: "None", //배포환경에서는 hiddentrack만..
    })
    
    res.status(200).json({ data : accessToken, message:'ok' })
  }
  