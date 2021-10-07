const { track,user } = require("../../models")

module.exports = async (req, res) => {  
    
  const chart = await track.findAll({
    attributes : ["id","img","title","views"],  
    include:{
        model : user,
        required : true,
        attributes: ["nickName"]
     }
  })
  chart.sort(function(a,b){
      return a.id-b.id;
  })

  let latestchart =[];
  for(let i =chart.length-1;i>=chart.length-10;i--){
    latestchart.push(chart[i])
  }

  chart.sort(function(a,b){
      return a.views-b.views;
  })

  console.log(chart)
  let popularchart =[];
  for(let i =chart.length-1;i>=chart.length-10;i--){
    popularchart.push(chart[i])
  }

  let recommendchart = [];
  for(let i =chart.length-1;i>chart.length-4;i--){
      recommendchart.push(chart[i])
  }

  res.status(200).json({latestchart: latestchart,popularchart:popularchart,recommendchart:recommendchart})
}
     