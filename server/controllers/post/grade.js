const { isAuthorized } = require('../tokenFunctions');
const db = require("../../models");
const { grade } = require("../../models")

module.exports = async (req, res) => {  
   //req.headers ->accesstoken body : id(post),grade
   const accessTokenData = isAuthorized(req);
   const { id ,userGrade } = req.body;

  if(!id || !userGrade ) {
    res.status(400).json({message: "input values"})
  }

  if (!accessTokenData) {
     res.status(401).json({ message : "unauthorized"});
   }
     
   const [gradeInfo, created] = await grade.findOrCreate({
    where: { 
        postId: id,
        userId: accessTokenData.id
     },
    defaults: {
        postId: id,
        userId: accessTokenData.id,
        userGrade: userGrade
    },
  });
  
  if (!created) {
    res.status(409).json({ message: "already registered grade" });
  } else {
      
    const gradeAll = await grade.findAll({
        where : { 
          postId: id,
          userId: accessTokenData.id
        }
    })
    
    console.log(gradeAll);

    let sum = 0;
    for(let i =0;i<gradeAll.length;i++){
     sum = sum + gradeAll[i].dataValues.userGrade
    }
    const gradeAev = sum/gradeAll.length ; 
  
    res.status(200).json({ data:gradeAev });
  }
 }
     