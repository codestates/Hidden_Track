const { user } = require("../../models")
const { sign,verify } = require("jsonwebtoken")

module.exports = async (req, res) => {  
   
    //req.headers ->accesstoken  req.body.nickname
    accessToken = req.headers["accesstoken"]
    const { nickName }  = req.body;

    if(!nickName){
        res.status(400).json({message : "input values"});
    }  
    
    if(!accessToken){
        res.status(400).json({message:"no token"})
     }
     //만료되었는지 확인 또는 유효한 토큰인지 확인
     let userInfo;
     try {
      userInfo = verify(accessToken, process.env.ACCESS_SECRET)
    } catch {
      res.status(401).json({message: "unauthorized" })
    }
    
    const findUserInfo = await user.findOne({
        where: { nickName: nickName },
      })
    
    console.log(findUserInfo)

    if(findUserInfo){
     res.status(409).json({message: "alreay exist nickname"})
    }else{
        await user.update({nickName: nickName},{
            where : { id : userInfo.id}
        })

       const temp = await user.findOne({
           where : {id : userInfo.id}
       })
       const updateUserInfo = temp.dataValues;
       delete updateUserInfo.password;
       delete updateUserInfo.RT;

       const accessToken = sign(updateUserInfo, process.env.ACCESS_SECRET, {
        expiresIn: "1h",
      })
      const refreshToken = sign(updateUserInfo, process.env.REFRESH_SECRET, {
        expiresIn: "14d",
      })
 
          //user 테이블에 RT값 저장하기
    await user.update({RT: refreshToken},{
        where: { id: updateUserInfo.id }
      })
         
     //refreshToken은 쿠키로 accesstoken은 body로.
      await res.cookie("refreshToken", refreshToken, {
        HttpOnly: true,
        Secure: false, //배포 환경에서는 true로.
        SameSite: "None", //배포환경에서는 hiddentrack만..
      })

        res.status(200).json({data:accessToken ,message:"ok"});
    }
 }
     