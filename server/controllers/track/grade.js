const { isAuthorized } = require('../tokenFunctions');
const { grade } = require("../../models")

module.exports = async (req, res) => {  
   //req.headers ->accesstoken body : id(post),grade
   const accessTokenData = isAuthorized(req);
   const { trackId ,userGrade } = req.body;
  console.log('===================================',req.body)
  if(!trackId || !userGrade ) {
    res.status(400).json({message: "input values"})
  }

  if (!accessTokenData) {
     res.status(401).json({ message : "unauthorized"});
   }
     
   const [gradeInfo, created] = await grade.findOrCreate({
    where: { 
        trackId: trackId,
        userId: accessTokenData.id
     },
    defaults: {
        trackId: trackId,
        userId: accessTokenData.id,
        userGrade: userGrade
    },
  });
  
  if (!created) {
    res.status(409).json({ message: "already registered grade" });
  } else {
    const gradeAll = await grade.findAll({
        where : { 
          trackId: trackId
        }
    })
    
    let sum = 0;
    for(let i =0;i<gradeAll.length;i++){
     sum = sum + gradeAll[i].dataValues.userGrade
    }
    const gradeAev = sum/gradeAll.length ; 
  
    res.status(200).json({ data:gradeAev });
  }
 }
     