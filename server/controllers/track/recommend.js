const { playlist, track  } = require("../../models");
const user = require("../user");
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {  

//     const chart = await track.findAll({
//         attributes : ["id","img","title","views"],  
//         include:{
//             model : user,
//             required : true,
//             attributes: ["nickName"]
//          }
//       })
//       chart.sort(function(a,b){
//           return a.id-b.id;
//       })
//     let recommendchart = [];
//   for(let i =0;i<3;i++){
//       recommendchart.push(chart[0])
//   }
  const accessTokenData = isAuthorized(req);
  let recommendchart = [];

  if(accessTokenData){
    let findPlaylist = await playlist.findAll({
        attributes : ["trackId","userId"],
        where : { userId :accessTokenData.id }
    })
    let users = {};
    for(let i =0;i<findPlaylist.length;i++){
        let temp = await playlist.findAll({
            where : { trackId : findPlaylist[i].trackId }
        });
        for(let j =0;j<temp.length;j++){
            if(accessTokenData.id !== temp[j].userId){
                if(users[temp[j].userId]){
                    users[temp[j].userId] = users[temp[j].userId] + 1;
                }else{
                    users[temp[j].userId] = 1;
                }
            }
        }
    }
    
  }else{

  }

  res.status(200).json({recommend:recommendchart})
}
     