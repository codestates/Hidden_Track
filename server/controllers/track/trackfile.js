module.exports =  {  
   
    post: async (req, res) =>{ 
        const track = req.file.location
        if (track === undefined) {
         return res.status(400).send({message:"no image"})
       }
        return res.status(201).send({ trackUrl: track })
    }
}
     