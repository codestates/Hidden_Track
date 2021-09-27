const { user, userArtist } = require("../../models")
const { 
  isAuthorized,
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken, 
} = require('../tokenFunctions');

module.exports = async (req, res) => {  
   
    // //req.headers ->accesstoken  req.body. ->agency,debut,email
    const accessTokenData = isAuthorized(req);
    const { agency,debut,email }  = req.body;

    if(!agency || !debut || !email){
        res.status(400).json({message : "input values"});
    }  

    //만료되었는지 확인 또는 유효한 토큰인지 확인     
    if (!accessTokenData) {
      res.status(401).json({ message : "unauthorized"});
    }


    if(accessTokenData.admin === 'artist'){
      res.status(409).json({message:"already an artist"})  
    }else{
     await user.update({admin:'artist'},{
         where : {id : accessTokenData.id }
     })
     
     await userArtist.create({
        userId : accessTokenData.id,
        agency : agency,
        debut : debut,
        email : email, 
     }) 

     const temp = await user.findOne({
      where : {id : accessTokenData.id}
  })
    const updateUserInfo = temp.dataValues;
    delete updateUserInfo.password;
    delete updateUserInfo.RT;

    const accessToken = generateAccessToken(updateUserInfo);
    const refreshToken = generateRefreshToken(updateUserInfo);

    //user 테이블에 RT값 저장하기
    await user.update({RT: refreshToken},{
     where: { id: updateUserInfo.id }
     })
      
    //refreshToken은 쿠키로 accesstoken은 body로.
    sendRefreshToken(res, refreshToken);
    res.status(200).json({data:accessToken });
    }
 }
     