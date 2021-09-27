const { user } = require("../../models");
const { isAuthorized,
    generateAccessToken,
    generateRefreshToken,
    sendRefreshToken,
  } = require('../tokenFunctions');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = {  
    post: async (req,res) =>{ 
       const image = req.file.location
          if (image === undefined) {
           return res.status(400).send({message:"no image"})
         }
          return res.status(201).send({ profile: image })
    },

    patch :  async (req,res) =>{ 
      console.log(req.file);
        const image = req.file.location
        const accessTokenData = isAuthorized(req);
        //accesstoken 있는지 확인
        
        if (!accessTokenData) {
          res.status(401).json({ message : "unauthorized"});
        }
        
        const url =  accessTokenData.profile.split('com/')
        if(!url[1]==='3161632744306776.jpg'){
            s3.deleteObject({
                Bucket: 'hidden-track-bucket', // 사용자 버켓 이름
                Key: `${url[1]}` // 버켓 내 경로
              }, (err, data) => {
                if (err) { throw err; }
                console.log('s3 deleteObject ', data)
              })    
        }
        
        await user.update({profile:image},{
            where : {id : accessTokenData.id}
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
      res.status(200).json({data:accessToken, profile: image});
     
    },
 
    delete :  async (req,res) =>{
        const accessTokenData = isAuthorized(req);
        //accesstoken 있는지 확인
        if (!accessTokenData) {
          res.status(401).json({ message : "unauthorized"});
        }
        console.log(accessTokenData)
        const url =  accessTokenData.profile.split('com/')
        if(url[1]==='3161632744306776.jpg'){
            res.status(400).json({message: "this is basic profile"})
        }else{
        s3.deleteObject({
            Bucket: 'hidden-track-bucket', // 사용자 버켓 이름
            Key: `${url[1]}` // 버켓 내 경로
          }, (err, data) => {
            if (err) { throw err; }
            console.log('s3 deleteObject ', data)
          })
        
        const basicProfile = "https://hidden-track-bucket.s3.ap-northeast-2.amazonaws.com/3161632744306776.jpg"  
        await user.update({profile:basicProfile},{
            where : {id : accessTokenData.id}
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
      res.status(200).json({data:accessToken, profile : basicProfile});
       }
    }
 }
