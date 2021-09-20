const { user, userArtist } = require("../../models")
const { verify } = require("jsonwebtoken")

module.exports = async (req, res) => {  
   
    // //req.headers ->accesstoken  req.body. ->agency,debut,email
    accessToken = req.headers["accesstoken"]
    const { agency,debut,email }  = req.body;

    if(!agency || !debut || !email){
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

    if(userInfo.admin === 'artist'){
      res.status(409).json({message:"already an artist"})  
    }else{
     await user.update({admin:'artist'},{
         where : {id : userInfo.id }
     })
     
     await userArtist.create({
        userId : userInfo.id,
        agency : agency,
        debut : debut,
        email : email, 
     }) 

    res.status(200).json({message:"ok"});
    }
 }
     