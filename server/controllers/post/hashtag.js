const { hashtag, post  } = require("../../models")
const db = require("../../models");

module.exports = async (req, res) => {  
   //req.query -> content
   console.log(req.query)

    res.status(200).json({message:"ok"});
 }
     